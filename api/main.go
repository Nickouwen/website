package main

import (
	"api/internal/adapter/db"
	handlerhttp "api/internal/adapter/handler/http"
	"api/internal/adapter/repository"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	log.Print("Program started")
	uri := os.Getenv("MONGO_CONN_STR")

	if uri == "" {
		log.Fatal("MONGO_CONN_STR is not set")
	}

	log.Print("Uri: ", uri)

	mydb, err := db.New(
		uri,
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default to 8080 if not set
	}
	fmt.Println("Listening on port ", port)
	http.ListenAndServe(":"+port, muxCors)
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
