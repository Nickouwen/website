import './AddRecipeModal.css'
import { Recipe } from '../types/Recipe'
import { Ingredient } from '../types/Ingredient'
import { useState } from 'react'

interface AddRecipeModalProps {
    handleAdd: (recipe: JSON) => void
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const AddRecipeModal = ({ handleAdd, isOpen, setIsOpen }: AddRecipeModalProps) => {
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [preamble, setPreamble] = useState("")
    const recipe: Recipe = {
        id: "",
        name: "",
        ingredients: [],
        instructions: [],
        preamble: "",
        author: ""
    }

    return (
        <>
        <div className="modal-background"></div>
        <div className="modal">
            <h1>Modal</h1>
            <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
        </>
    )
}

export default AddRecipeModal