package repository

import (
	"api/internal/core/domain"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (m MongoStore) Add(ctx context.Context, recipe domain.Recipe) error {
	_, err := m.db.Collection("recipes").InsertOne(context.TODO(), recipe)

	return err
}

func (m MongoStore) List(ctx context.Context) ([]domain.Recipe, error) {
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

func (m MongoStore) Get(ctx context.Context, ID primitive.ObjectID) (domain.Recipe, error) {
	res := m.db.Collection("recipes").FindOne(context.TODO(), bson.M{"_id": ID})

	var recipe domain.Recipe
	err := res.Decode(&recipe)
	if err != nil {
		return domain.Recipe{}, err
	}
	return recipe, nil
}

func (m MongoStore) Update(ctx context.Context, ID primitive.ObjectID, recipe domain.Recipe) error {
	_, err := m.db.Collection("recipes").UpdateOne(context.TODO(), bson.M{"_id": ID}, bson.M{"$set": recipe})

	return err
}

func (m MongoStore) Remove(ctx context.Context, ID primitive.ObjectID) error {
	_, err := m.db.Collection("recipes").DeleteOne(context.TODO(), bson.M{"_id": ID})

	return err
}
