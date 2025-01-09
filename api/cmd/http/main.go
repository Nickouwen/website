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
	muxCors := enableCors(mux)
	mux.Handle("/", &homeHandler{})
	mux.Handle("/recipes", recipesHandler)
	mux.Handle("/recipes/", recipesHandler)

	fmt.Println("Listening on port 80")
	http.ListenAndServe(":80", muxCors)
}

func enableCors(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		h.ServeHTTP(w, r)
	})
}

type homeHandler struct{}

func (h *homeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is my home page"))
}
