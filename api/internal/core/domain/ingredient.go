package domain

type Ingredient struct {
	Name         string       `json:"name"`
	Measurements Measurements `json:"measurements"`
	Notes        string       `json:"notes"`
}
