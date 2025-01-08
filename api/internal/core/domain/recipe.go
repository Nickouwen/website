package domain

import "go.mongodb.org/mongo-driver/bson/primitive"

type Recipe struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name         string             `json:"name"`
	Preamble     string             `json:"preamble"`
	Ingredients  []Ingredient       `json:"ingredients"`
	Instructions []string           `json:"instructions"`
	Author       string             `json:"author"`
}
