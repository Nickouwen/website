package repository

import (
	"api/internal/core/domain"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoStore struct {
	db *mongo.Database
}

func New(mongodb *mongo.Database) *MongoStore {
	return &MongoStore{
		db: mongodb,
	}
}

func (m MongoStore) Add(name string, recipe domain.Recipe) error {
	_, err := m.db.Collection("recipes").InsertOne(context.TODO(), recipe)

	return err
}

func (m MongoStore) List() ([]domain.Recipe, error) {
	res, err := m.db.Collection("recipes").Find(context.TODO(), bson.M{})

	if err != nil {
		return nil, err
	}

	var recipes []domain.Recipe
	if err = res.All(context.TODO(), &recipes); err != nil {
		return nil, err
	}
	// Might need to use a map, similar to inmemstore ?
	return recipes, nil
}

func (m MongoStore) Get(name string) (domain.Recipe, error) {
	res, err := m.db.Collection("recipes").Find(context.TODO(), bson.M{"name": name})

	if err != nil {
		return domain.Recipe{}, err
	}

	var recipe domain.Recipe
	if err = res.All(context.TODO(), &recipe); err != nil {
		return domain.Recipe{}, err
	}
	return recipe, nil
}

func (m MongoStore) Update(name string, recipe domain.Recipe) error {
	_, err := m.db.Collection("recipes").UpdateOne(context.TODO(), bson.M{"name": name}, bson.M{"$set": recipe})

	return err
}

func (m MongoStore) Remove(name string) error {
	_, err := m.db.Collection("recipes").DeleteOne(context.TODO(), bson.M{"name": name})

	return err
}
