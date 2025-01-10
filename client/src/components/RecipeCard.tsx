import IngredientList from './IngredientList';
import { Recipe } from '../types/Recipe'
import { ChevronDown, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import './RecipeCard.css'
import { useState } from 'react';
interface RecipeProp {
    recipe: Recipe
    volumetric: boolean
    handleDelete: (id: string) => void
}

const RecipeCard = ({ recipe, volumetric, handleDelete }: RecipeProp) => {
    const { name, ingredients, instructions, preamble } = recipe
    const [editMode, setEditMode] = useState(false)

    const handleMenuClick = () => {
        const menu = document.querySelector('.tooltip' + recipe.id)
        if (menu) {
            menu.classList.toggle('visible')
        }
    }

    const toggleIngredients = () => {
        const ingredients = document.querySelector('.collapsible-ingredients' + recipe.id)
        if (ingredients) {
            ingredients.classList.toggle('visible')
        }
    }

    const toggleInstructions = () => {
        const instructions = document.querySelector('.collapsible-instructions' + recipe.id)
        if (instructions) {
            instructions.classList.toggle('visible')
        }
    }
    
    return (
        <>
            <h3>{name}</h3>
            <div className="options-container">
                <EllipsisVertical className="options" onClick={() => {handleMenuClick()}} />
                <div className={"options-menu tooltip" + recipe.id}>
                    <ul>
                        <li onClick={() => {setEditMode(!editMode)}}><Pencil className="menu-icon" width="12" height="12"/> Edit</li>
                        <li onClick={() => {handleDelete(recipe.id)}}><Trash2 className="menu-icon" width="12" height="12"/> Delete</li>
                    </ul>
                </div>
            </div>
            <p>{preamble}</p>
            <div className="toggle-container">
                <h4 onClick={() => {toggleIngredients()}} className="toggle">Ingredients <ChevronDown width="16" height="16" /></h4>
            </div>
            <ul className={"ingredient-list collapsible-ingredients" + recipe.id}>
                <IngredientList ingredients={ingredients} volumetric={volumetric} />
            </ul>
            <div className="separator"></div>
            <div className="toggle-container">
                <h4 onClick={() => {toggleInstructions()}} className="toggle">Instructions <ChevronDown width="16" height="16" /></h4>
            </div>
            <ol className={"instruction-list collapsible-instructions" + recipe.id}>
                {instructions.map((instruction, index) => {
                    return <li key={index}>{instruction}</li>
                })}
            </ol>
        </>
    )
}

export default RecipeCard