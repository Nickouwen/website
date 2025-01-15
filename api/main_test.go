package main

import (
	"api/internal/adapter/db"
	handlerhttp "api/internal/adapter/handler/http"
	"api/internal/adapter/repository"
	"bytes"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
	"time"
)

func readTestData(t *testing.T, name string) []byte {
	t.Helper()

	data, err := os.ReadFile(filepath.Join("../testdata/" + name))
	if err != nil {
		t.Fatal(err)
	}
	return data
}

func TestRecipesCRUD(t *testing.T) {
	// Setup

	mydb, err := db.New(
		"mongodb://localhost:27017",
		10,
		10*time.Second,
	)
	if err != nil {
		panic(err)
	}
	store := repository.New(mydb)
	recipesHandler := handlerhttp.NewRecipesHandler(store)

	// Test Data
	cookies := readTestData(t, "chocolate_chip_cookies.json")
	cookiesWithButter := readTestData(t, "chocolate_chip_cookies_with_butter.json")

	cookiesReader := bytes.NewReader(cookies)
	cookiesWithButterReader := bytes.NewReader(cookiesWithButter)

	// Create new recipe
	req := httptest.NewRequest(http.MethodPost, "/recipes", cookiesReader)
	w := httptest.NewRecorder()
	recipesHandler.ServeHTTP(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("Expected status code %d, got %d", http.StatusCreated, w.Code)
	}

	// List recipes
	req = httptest.NewRequest(http.MethodGet, "/recipes", nil)
	w = httptest.NewRecorder()
	recipesHandler.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}

	// Get recipe
	req = httptest.NewRequest(http.MethodGet, "/recipes/chocolate-chip-cookies", nil)
	w = httptest.NewRecorder()
	recipesHandler.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}

	// Update recipe
	req = httptest.NewRequest(http.MethodPut, "/recipes/chocolate-chip-cookies", cookiesWithButterReader)
	w = httptest.NewRecorder()
	recipesHandler.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}

	// Delete recipe
	req = httptest.NewRequest(http.MethodDelete, "/recipes/chocolate-chip-cookies", nil)
	w = httptest.NewRecorder()
	recipesHandler.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}
}
