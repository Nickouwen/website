import { Ingredient } from "./Ingredient";

export interface Recipe {
    id: string;
    name: string;
    ingredients: Ingredient[];
    instructions: string[];
    preamble: string;
    author: string
}