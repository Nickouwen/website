package handlerhttp

import (
	"api/internal/core/domain"
	"api/internal/core/port"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RecipeHandler struct {
	svc port.RecipeService
}

func NewRecipesHandler(svc port.RecipeService) *RecipeHandler {
	return &RecipeHandler{
		svc,
	}
}

func (h *RecipeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == http.MethodGet:
		h.ListRecipes(w, r)
		return

	case r.Method == http.MethodGet:
		h.GetRecipe(w, r)
		return

	case r.Method == http.MethodPost:
		h.CreateRecipe(w, r)
		return

	case r.Method == http.MethodDelete:
		h.DeleteRecipe(w, r)
		return

	case r.Method == http.MethodPut:
		h.UpdateRecipe(w, r)
		return
	}
}

func (h *RecipeHandler) CreateRecipe(w http.ResponseWriter, r *http.Request) {
	// Instantiate a new recipe
	var recipe domain.Recipe

	// Decode the JSON
	if err := json.NewDecoder(r.Body).Decode(&recipe); err != nil {
		log.Printf("error decoding JSON: %v", err)
		InternalServerErrorHandler(w, r)
		return
	}
	// Add the recipe to the svc
	resourceID := primitive.NewObjectID()
	recipe.ID = resourceID
	err := h.svc.Add(r.Context(), recipe)
	if err != nil {
		log.Printf("error adding recipe: %v", err)
		InternalServerErrorHandler(w, r)
		return
	}

	// Write a response, send status of 201 (Created)
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Recipe created"))
}
func (h *RecipeHandler) ListRecipes(w http.ResponseWriter, r *http.Request) {
	// Get the list of all recipes in the svc
	recipes, err := h.svc.List(r.Context())
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Convert the results to JSON
	jsonBytes, err := json.Marshal(recipes)
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Write the results as JSON
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}
func (h *RecipeHandler) GetRecipe(w http.ResponseWriter, r *http.Request) {
	// Get the recipe

	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 3 {
		http.Error(w, "Invalid URL", http.StatusBadRequest)
		return
	}
	idStr := pathParts[len(pathParts)-1] // Get the ID part (last segment)

	ID, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Retrieve recipe from svc
	recipe, err := h.svc.Get(r.Context(), ID)
	if err != nil {
		NotFoundHandler(w, r)
		return
	}

	// Convert to JSON
	jsonBytes, err := json.Marshal(recipe)
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Write the results as JSON
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}
func (h *RecipeHandler) UpdateRecipe(w http.ResponseWriter, r *http.Request) {
	// Get the recipe

	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 3 {
		http.Error(w, "Invalid URL", http.StatusBadRequest)
		return
	}
	idStr := pathParts[len(pathParts)-1] // Get the ID part (last segment)

	ID, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Retrieve recipe from svc
	recipe, err := h.svc.Get(r.Context(), ID)
	if err != nil {
		log.Printf("error getting recipe: %v", err)
		NotFoundHandler(w, r)
		return
	}

	// Decode the JSON
	if err := json.NewDecoder(r.Body).Decode(&recipe); err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Update the recipe in the svc
	err = h.svc.Update(r.Context(), ID, recipe)
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Write a response, send status of 200 (OK)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Recipe with id " + r.URL.Path + " has been updated"))
}
func (h *RecipeHandler) DeleteRecipe(w http.ResponseWriter, r *http.Request) {
	// Get the recipe

	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 3 {
		http.Error(w, "Invalid URL", http.StatusBadRequest)
		return
	}
	idStr := pathParts[len(pathParts)-1] // Get the ID part (last segment)

	ID, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		log.Printf("error decoding ObjectID: %v", err)
		InternalServerErrorHandler(w, r)
		return
	}

	// Remove the recipe from the svc
	h.svc.Remove(r.Context(), ID)

	// Write a response, send status of 200 (OK)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Recipe with id " + r.URL.Path + " has been deleted"))
}

func InternalServerErrorHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusInternalServerError)
	w.Write([]byte("500 Internal Server Error"))
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte("404 Not Found"))
}
