package port

import (
	"api/internal/core/domain"
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RecipeRepository interface {
	Add(ctx context.Context, recipe domain.Recipe) error

	Get(ctx context.Context, ID primitive.ObjectID) (domain.Recipe, error)

	Update(ctx context.Context, ID primitive.ObjectID, recipe domain.Recipe) error

	List(ctx context.Context) ([]domain.Recipe, error)

	Remove(ctx context.Context, ID primitive.ObjectID) error
}

type RecipeService interface {
	Add(ctx context.Context, recipe domain.Recipe) error

	Get(ctx context.Context, ID primitive.ObjectID) (domain.Recipe, error)

	Update(ctx context.Context, ID primitive.ObjectID, recipe domain.Recipe) error

	List(ctx context.Context) ([]domain.Recipe, error)

	Remove(ctx context.Context, ID primitive.ObjectID) error
}
