package port

import "api/internal/core/domain"

type RecipeStore interface {
	Add(name string, recipe domain.Recipe) error
	Get(name string) (domain.Recipe, error)
	Update(name string, recipe domain.Recipe) error
	List() (map[string]domain.Recipe, error)
	Remove(name string) error
}
