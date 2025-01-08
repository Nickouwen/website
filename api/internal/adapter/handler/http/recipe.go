package handlerhttp

import (
	"api/internal/core/domain"
	"api/internal/core/port"
	"encoding/json"
	"net/http"
	"regexp"

	"github.com/gosimple/slug"
)

var (
	RecipeRe       = regexp.MustCompile(`^/recipes/*$`)
	RecipeReWithID = regexp.MustCompile(`^/recipes/([a-z0-9]+(?:-[a-z0-9]+)+)$`)
)

type recipeHandler struct {
	store port.RecipeStore
}

func NewRecipesHandler(s port.RecipeStore) *recipeHandler {
	return &recipeHandler{
		store: s,
	}
}

func (h *recipeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == http.MethodGet && RecipeRe.MatchString(r.URL.Path):
		h.ListRecipes(w, r)
		return

	case r.Method == http.MethodGet && RecipeReWithID.MatchString(r.URL.Path):
		h.GetRecipe(w, r)
		return

	case r.Method == http.MethodPost && RecipeRe.MatchString(r.URL.Path):
		h.CreateRecipe(w, r)
		return

	case r.Method == http.MethodDelete && RecipeReWithID.MatchString(r.URL.Path):
		h.DeleteRecipe(w, r)
		return

	case r.Method == http.MethodPut && RecipeReWithID.MatchString(r.URL.Path):
		h.UpdateRecipe(w, r)
		return
	}
}

func (h *recipeHandler) CreateRecipe(w http.ResponseWriter, r *http.Request) {
	// Instantiate a new recipe
	var recipe domain.Recipe

	// Decode the JSON
	if err := json.NewDecoder(r.Body).Decode(&recipe); err != nil {
		InternalServerErrorHandler(w, r)
		return
	}
	// Add the recipe to the store
	resourceID := slug.Make(recipe.Name)
	err := h.store.Add(resourceID, recipe)
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Write a response, send status of 201 (Created)
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Recipe created with ID " + resourceID))
}
func (h *recipeHandler) ListRecipes(w http.ResponseWriter, r *http.Request) {
	// Get the list of all recipes in the store
	recipes, err := h.store.List()
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
func (h *recipeHandler) GetRecipe(w http.ResponseWriter, r *http.Request) {
	// Get the recipe
	matches := RecipeReWithID.FindStringSubmatch(r.URL.Path)

	// If the recipe doesn't exist, return Not Found
	if len(matches) < 2 {
		NotFoundHandler(w, r)
		return
	}

	// Retrieve recipe from store
	recipe, err := h.store.Get(matches[1])
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
func (h *recipeHandler) UpdateRecipe(w http.ResponseWriter, r *http.Request) {
	matches := RecipeReWithID.FindStringSubmatch(r.URL.Path)

	// If the recipe doesn't exist, return Not Found
	if len(matches) < 2 {
		NotFoundHandler(w, r)
		return
	}

	// Retrieve recipe from store
	recipe, err := h.store.Get(matches[1])
	if err != nil {
		NotFoundHandler(w, r)
		return
	}

	// Decode the JSON
	if err := json.NewDecoder(r.Body).Decode(&recipe); err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Update the recipe in the store
	err = h.store.Update(matches[1], recipe)
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Write a response, send status of 200 (OK)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Recipe with id " + matches[1] + " has been updated"))
}
func (h *recipeHandler) DeleteRecipe(w http.ResponseWriter, r *http.Request) {
	// Get the recipe
	matches := RecipeReWithID.FindStringSubmatch(r.URL.Path)

	// If the recipe doesn't exist, return Not Found
	if len(matches) < 2 {
		NotFoundHandler(w, r)
		return
	}

	// Remove the recipe from the store
	err := h.store.Remove(matches[1])
	if err != nil {
		InternalServerErrorHandler(w, r)
		return
	}

	// Write a response, send status of 200 (OK)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Recipe with id " + matches[1] + " has been deleted"))
}

func InternalServerErrorHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusInternalServerError)
	w.Write([]byte("500 Internal Server Error"))
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte("404 Not Found"))
}
