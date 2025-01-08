package domain

type Recipe struct {
	Name         string       `json:"name"`
	Preamble     string       `json:"preamble"`
	Ingredients  []Ingredient `json:"ingredients"`
	Instructions []string     `json:"instructions"`
	Author       string       `json:"author"`
}
