import { useState, useEffect } from 'react'
import './App.css'
import { addRecipe, deleteRecipe, getRecipes, updateRecipe } from './api/Recipes.ts'
import testRecipe from './api/test-data/basque-cheesecake.ts'
import RecipeCard from './components/RecipeCard.tsx'
import { Beaker, Weight } from 'lucide-react'
import { Recipe } from './types/Recipe.tsx'

function App() {
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      measurements: {
        volumetric: "",
        weight: ""
      },
      notes: ""
    }
  ])
  const [volumetric, setVolumetric] = useState(true)
  const [recipes, setRecipes] = useState([{
    id: "",
    name: "",
    ingredients: [],
    instructions: [],
    preamble: "",
    author: ""
  }])

  window.addEventListener("mousedown", () => {
    const menu = document.querySelector('.options-menu')
    if (menu) {
      menu.classList.remove('visible')
    }
  })

  const handleAdd = (recipe: JSON) => {
    addRecipe(recipe).then(res => res.json()).then(data => setRecipes([...recipes, data]))
  }

  const handleUpdate = (id: string, recipe: JSON) => {
    updateRecipe(id, recipe).then(res => res.json()).then(data => {
      for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id === id) {
          recipes[i] = data
        }
      }
      setRecipes([...recipes])
    })
  }

  const handleDelete = (id: string) => {
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].id === id) {
        recipes.splice(i, 1)
      }
    }
    deleteRecipe(id)
    setRecipes([...recipes])
  }

  const addIngredient = () => {
    setIngredients([...ingredients, {
      name: "",
      measurements: {
        volumetric: "",
        weight: ""
      },
      notes: ""
    }])
    console.log(ingredients)
  }

  const collapseIngredient = (index: number) => {
    const ingredient = document.querySelector(`#ingredient-form-${index}`)
    if (ingredient) {
      ingredient.classList.toggle('visible')
    }
  }

  useEffect(() => {
    getRecipes().then((recipes) => {
      if (recipes) {
        setRecipes(recipes)
      } else {
        setRecipes([])
      }
    });
  }, [])

  return (
    <>
      <header>
        <h1>Nic's React App</h1>
        <div className="button-container" id="volumetric-button" onClick={() => setVolumetric(!volumetric)}>
          {volumetric? <span><Beaker width="16" height="16" />Volumetric</span> : <span><Weight width="16" height="16" /> Weight</span>}
        </div>
        <div className="button-container"onClick={() => handleAdd(JSON.parse(testRecipe))}>
          <span>Add Test Recipe</span>
        </div>
        <div className="button-container">
          <span>Add New Recipe</span>
        </div>
      </header>
      <div>
        {recipes.map((recipe) => {
          return (
            <div className="recipe-card" key={recipe.id}>
              <RecipeCard recipe={recipe} volumetric={volumetric} handleDelete={handleDelete} />
            </div>
          )
        })}
      </div>
      <div className="modal-bg">
        <div className="modal">
          <h4>Add New Recipe</h4>
          <form>
            <label htmlFor="name">Recipe Name</label> 
            <br/>
            <input type="text" id="name" />
            <br/>
            <label htmlFor="preamble">Overview</label>
            <br/>
            <textarea id="preamble" />
            <br/>
            <label htmlFor="ingredients">Ingredients:</label>
            <br/>
            <div id="ingredient-container">
              {ingredients.map((_, index) => {
                return (
                  <div key={index} id={`ingredient-${index}`}>
                    <label htmlFor={`ingredient-${index}-name`}>Ingredient Name</label>
                    <br/>
                    <input type="text" id={`ingredient-${index}-name`} />
                    <br/>
                    <span onClick={() => collapseIngredient(index)}>Collapse</span>
                    <div className="collapsible visible" id={`ingredient-form-${index}`}>
                      <label htmlFor={`ingredient-${index}-category`}>Categories</label>
                      <br/>
                      <input type="checkbox" id={`ingredient-${index}-category-sweet`} />
                      <label htmlFor={`ingredient-${index}-category-sweet`}>Sweet</label>
                      <input type="checkbox" id={`ingredient-${index}-category-savoury`} />
                      <label htmlFor={`ingredient-${index}-category-salty`}>Savoury</label>
                      <input type="checkbox" id={`ingredient-${index}-category-spicy`} />
                      <label htmlFor={`ingredient-${index}-category-spicy`}>Spicy</label>
                      <input type="checkbox" id={`ingredient-${index}-category-baked`} />
                      <label htmlFor={`ingredient-${index}-category-pastry`}>Baked Goods</label>
                      <input type="checkbox" id={`ingredient-${index}-category-pasta`} />
                      <label htmlFor={`ingredient-${index}-category-pasta`}>Pasta</label>
                      <input type="checkbox" id={`ingredient-${index}-category-vegetarian`} />
                      <label htmlFor={`ingredient-${index}-category-vegetarian`}>Vegetarian</label>
                      <br/>
                      <label htmlFor={`ingredient-${index}-volumetric`}>Volumetric</label>
                      <br/>
                      <input type="text" id={`ingredient-${index}-volumetric`} />
                      <br/>
                      <label htmlFor={`ingredient-${index}-weight`}>Weight</label>
                      <br/>
                      <input type="text" id={`ingredient-${index}-weight`} />
                      <br/>
                      <label htmlFor={`ingredient-${index}-notes`}>Notes</label>
                      <br/>
                      <textarea id={`ingredient-${index}-notes`} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="button-container" onClick={() => addIngredient()}>
              <span>Add Ingredient</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
