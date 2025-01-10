export interface Ingredient {
    name: string;
    measurements: {
        volumetric: string;
        weight: string;
    };
    notes: string;
}

export interface Ingredients {
    ingredients: Ingredient[];
    volumetric: boolean;
}