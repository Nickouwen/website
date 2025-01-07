package main

import (
	"api/pkg/recipes"
	"bytes"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
)

func readTestData(t *testing.T, name string) []byte {
	t.Helper()

	data, err := os.ReadFile(filepath.Join("./testdata/" + name))
	if err != nil {
		t.Fatal(err)
	}
	return data
}

func TestRecipesCRUD(t *testing.T) {
	// Setup
	store := recipes.NewMemStore()
	recipesHandler := NewRecipesHandler(store)

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
