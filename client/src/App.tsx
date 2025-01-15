import { useState, useEffect } from 'react'
import './App.css'
import { addRecipe, deleteRecipe, getRecipes, updateRecipe } from './api/Recipes.ts'
import RecipeCard from './components/RecipeCard.tsx'
import { Beaker, Weight } from 'lucide-react'
import AddRecipeModal from './components/AddRecipeModal.tsx'
import { Recipe } from './types/Recipe.tsx'

function App() {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [volumetric, setVolumetric] = useState(true)
  const [recipes, setRecipes] = useState([{
    id: "",
    name: "",
    ingredients: [],
    instructions: [],
    preamble: "",
    author: ""
  }])

  const preventScrolling = () => {
    document.body.classList.toggle('no-scroll')
  }
    
  window.addEventListener("mousedown", () => {
    const menu = document.querySelectorAll('.options-menu')
    if (menu) {
      menu.forEach((menu) => {
        menu.classList.remove('visible')
      })
    }
  })

  const handleAdd = (recipe: Recipe) => {
    const newRecipe = JSON.parse(JSON.stringify(recipe))
    addRecipe(newRecipe).then(res => res.json()).then(data => setRecipes([...recipes, data]))
  }

  const handleUpdate = (id: string, recipe: JSON) => {
    console.log("Updating recipe", recipe)
    updateRecipe(id, recipe)
    setRecipes([...recipes])
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

  useEffect(() => {
    getRecipes().then((recipes) => {
      if (recipes) {
        setRecipes(recipes)
      } else {
        setRecipes([])
      }
      setLoading(false)
    });
  }, [])

  if (loading) {
    return (
      <div className="loading">Loading recipes...</div>
    )
  }

  return (
      <>
        <header>
          <div className="title">
            <h1>My Family Recipes</h1>
            <div className="switch">
              
            </div>
            </div>
          <div className="button-container" id="volumetric-button" onClick={() => setVolumetric(!volumetric)}>
            {volumetric? <span><Beaker width="16" height="16" />Volumetric</span> : <span><Weight width="16" height="16" /> Weight</span>}
          </div>
          <div className="button-container">
            <span onClick={() => {setOpen(true); preventScrolling()}}>Add New Recipe</span>
          </div>
        </header>
        <div>
          {recipes.map((recipe) => {
            return (
              <div className="recipe-card" key={recipe.id}>
                <RecipeCard recipe={recipe} volumetric={volumetric} handleDelete={handleDelete} handleUpdate={handleUpdate} open={open} setOpen={setOpen} preventScrolling={preventScrolling} />
              </div>
            )
          })}
        </div>
        {open? <AddRecipeModal open={open} setOpen={setOpen} preventScrolling={preventScrolling} handleAdd={handleAdd} recipe={{id: "", name: "", preamble: "", ingredients: [], instructions: [], author: ""}} /> : null}
      </>
  )
}

export default App
