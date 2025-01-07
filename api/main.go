package main

import (
	"api/pkg/recipes"
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"

	"github.com/gosimple/slug"
)

var (
	RecipeRe       = regexp.MustCompile(`^/recipes/*$`)
	RecipeReWithID = regexp.MustCompile(`^/recipes/([a-z0-9]+(?:-[a-z0-9]+)+)$`)
)

func main() {

	store := recipes.NewMemStore()
	recipesHandler := NewRecipesHandler(store)

	mux := http.NewServeMux()
	mux.Handle("/", &homeHandler{})
	mux.Handle("/recipes", recipesHandler)
	mux.Handle("/recipes/", recipesHandler)

	fmt.Println("Listening on port 8080")
	http.ListenAndServe(":8080", mux)
}

type recipeStore interface {
	Add(name string, recipe recipes.Recipe) error
	Get(name string) (recipes.Recipe, error)
	Update(name string, recipe recipes.Recipe) error
	List() (map[string]recipes.Recipe, error)
	Remove(name string) error
}

type homeHandler struct{}

type recipesHandler struct {
	store recipeStore
}

func (h *homeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is my home page"))
}

func (h *recipesHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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
		w.Write([]byte("You've deleted a recipe"))
		return

	case r.Method == http.MethodPut && RecipeReWithID.MatchString(r.URL.Path):
		h.UpdateRecipe(w, r)
		return
	}
}

func NewRecipesHandler(s recipeStore) *recipesHandler {
	return &recipesHandler{
		store: s,
	}
}

func (h *recipesHandler) CreateRecipe(w http.ResponseWriter, r *http.Request) {
	// Instantiate a new recipe
	var recipe recipes.Recipe

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
func (h *recipesHandler) ListRecipes(w http.ResponseWriter, r *http.Request) {
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
func (h *recipesHandler) GetRecipe(w http.ResponseWriter, r *http.Request) {
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
func (h *recipesHandler) UpdateRecipe(w http.ResponseWriter, r *http.Request) {
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
func (h *recipesHandler) DeleteRecipe(w http.ResponseWriter, r *http.Request) {
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
