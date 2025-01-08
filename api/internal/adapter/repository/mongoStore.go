package repository

import "go.mongodb.org/mongo-driver/mongo"

type MongoStore struct {
	db *mongo.Database
}

func New(mongodb *mongo.Database) *MongoStore {
	return &MongoStore{
		db: mongodb,
	}
}
