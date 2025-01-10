import './IngredientList.css'
import { Ingredients } from '../types/Ingredient'

const IngredientList = ({ ingredients, volumetric }: Ingredients) => {
    return (
        <div>
            {ingredients.map((ingredient, index) => {
                return (
                    <li key={index}>
                        <span className="ingredient">{volumetric? ingredient.measurements.volumetric : ingredient.measurements.weight} {ingredient.name}</span>
                        <br />
                        <span className="notes">{ingredient.notes}</span>
                    </li>
                )
            })}
        </div>
    )
}

export default IngredientList