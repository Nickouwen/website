import './IngredientList.css'
import { Ingredients } from '../types/Ingredient'

interface IngredientListProps {
    ingredients: Ingredients['ingredients']
    volumetric: boolean
}

const IngredientList = ({ ingredients, volumetric }: IngredientListProps) => {
    return (
        <div>
            {ingredients.map((ingredient, index) => {
                return (
                    <li key={index}>
                        <span>{volumetric? ingredient.measurements.volumetric : ingredient.measurements.weight} {ingredient.name}</span>
                        <br />
                        <span className="notes">{ingredient.notes}</span>
                    </li>
                )
            })}
        </div>
    )
}

export default IngredientList