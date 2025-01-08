package main

import (
	handlerhttp "api/internal/adapter/handler/http"
	"api/internal/adapter/repository"
	"fmt"
	"net/http"
)

func main() {

	store := repository.NewMemStore()
	recipesHandler := handlerhttp.NewRecipesHandler(store)

	mux := http.NewServeMux()
	mux.Handle("/", &homeHandler{})
	mux.Handle("/recipes", recipesHandler)
	mux.Handle("/recipes/", recipesHandler)

	fmt.Println("Listening on port 80")
	http.ListenAndServe(":80", mux)
}

type homeHandler struct{}

func (h *homeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is my home page"))
}
