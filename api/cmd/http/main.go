package main

import (
	"api/internal/adapter/db"
	handlerhttp "api/internal/adapter/handler/http"
	"api/internal/adapter/repository"
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {

	mydb, err := db.New(
		"mongodb://user:pass@mongodb:27017",
		10,
		10*time.Second,
	)

	if err != nil {
		log.Print(err)
		panic(err)
	}

	store := repository.New(mydb)
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
