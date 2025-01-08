package repository

import (
	"api/internal/core/domain"
	"errors"
)

var (
	NotFoundErr = errors.New("not found")
)

type MemStore struct {
	list map[string]domain.Recipe
}

func NewMemStore() *MemStore {
	list := make(map[string]domain.Recipe)
	return &MemStore{
		list,
	}
}

func (m MemStore) Add(name string, recipe domain.Recipe) error {
	m.list[name] = recipe
	return nil
}

func (m MemStore) Get(name string) (domain.Recipe, error) {

	if val, ok := m.list[name]; ok {
		return val, nil
	}

	return domain.Recipe{}, NotFoundErr
}

func (m MemStore) List() (map[string]domain.Recipe, error) {
	return m.list, nil
}

func (m MemStore) Update(name string, recipe domain.Recipe) error {

	if _, ok := m.list[name]; ok {
		m.list[name] = recipe
		return nil
	}

	return NotFoundErr
}

func (m MemStore) Remove(name string) error {
	delete(m.list, name)
	return nil
}
