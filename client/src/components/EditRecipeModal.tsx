import './AddRecipeModal.css'
import { Recipe } from '../types/Recipe'
import { Ingredient } from '../types/Ingredient'
import { useState } from 'react'

interface EditRecipeModalProps {
    recipe: Recipe
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    handleUpdate: (id: string, recipe: JSON) => void
}

const EditRecipeModal = ({ handleUpdate, isOpen, setIsOpen, recipe }: EditRecipeModalProps) => {
    const [name, setName] = useState(recipe.name)
    const [author, setAuthor] = useState(recipe.author)
    const [preamble, setPreamble] = useState(recipe.preamble)
    const [newRecipe, setNewRecipe] = useState(recipe)
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [instructions, setInstructions] = useState(recipe.instructions)

    // This seems like an awfully verbose way to do this, but I can't think of how else to do it
    const updateIngredientName = (index: number, name: string) => {
        const updated = ingredients
        updated[index].name = name
        setIngredients(updated)
    }

    const updateIngredientMeasurement = (index: number, measurement: string, value: string) => {
        const updated = ingredients
        if (measurement === 'volumetric') {
            updated[index].measurements.volumetric = value
        } else if (measurement === 'weight') {
            updated[index].measurements.weight = value
        }
        setIngredients(updated)
    }

    const updateIngredientNotes = (index: number, notes: string) => {
        const updated = ingredients
        updated[index].notes = notes
        setIngredients(updated)
    }

    const updateInstruction = (index: number, instruction: string) => {
        const updated = instructions
        updated[index] = instruction
        setInstructions(updated)
    }
    return (
        <>
        <div className="modal-background"></div>
        <div className="modal">
            <h1>Modal</h1>
            <h2>Edit Recipe...</h2>
            <div className="input-container">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <input type="text" value={preamble} onChange={(e) => setPreamble(e.target.value)} />
                
            </div>
            <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
        </>
    )
}

export default EditRecipeModal