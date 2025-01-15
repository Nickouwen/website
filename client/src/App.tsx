import { useState, useEffect, useRef } from 'react'
import './App.css'
import { addRecipe, deleteRecipe, getRecipes, updateRecipe } from './api/Recipes.ts'
import RecipeCard from './components/RecipeCard.tsx'
import { Beaker, Weight } from 'lucide-react'
import AddRecipeModal from './components/AddRecipeModal.tsx'
import { Recipe } from './types/Recipe.tsx'

function App() {
  const [loading, setLoading] = useState(true)
  const [searchRecipe, setSearchRecipe] = useState("")
  const [searchIngredients, setSearchIngredients] = useState("")
  const [searchBar, setSearchBar] = useState("recipes")
  const [open, setOpen] = useState(false)
  const [volumetric, setVolumetric] = useState(true)
  const [recipes, setRecipes] = useState([{
    id: "",
    name: "",
    ingredients: [{
      name: "",
      measurements: {
        volumetric: "",
        weight: ""
      },
      notes: ""
    }],
    instructions: [],
    preamble: "",
    author: ""
  }])

  const handleSearch = ((e: React.ChangeEvent<HTMLInputElement>, searchTerm: string) => {
    e.preventDefault()
    const term = e.target.value
    switch (searchTerm) {
      case "recipes":
        setSearchRecipe(term.toLowerCase())
        break
      case "ingredients":
        setSearchIngredients(term.toLowerCase())
        break
    }
  })

  window.addEventListener("mousedown", () => {
    const menu = document.querySelectorAll('.options-menu')
    if (menu) {
      menu.forEach((menu) => {
        menu.classList.remove('visible')
      })
    }
  })

  const recipesByAuthor = recipes.reduce((acc, recipe) => {
    const author = recipe.author || 'Unknown Author'; // Handle recipes without an author
    acc[author] = acc[author] || [];
    acc[author].push(recipe);
    return acc;
  }, {});

  const preventScrolling = () => {
    document.body.classList.toggle('no-scroll')
  }

  const scrollToDiv = (id: string) => {
    const div = document.getElementById(id)
    if (div) {
      div.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          </div>
          <div className="index">
              <h1>Index</h1>
              <span>Search by</span>
              <select onChange={(e) => setSearchBar(e.target.value)}>
                <option value="recipes">Recipes</option>
                <option value="ingredients">Ingredients</option>
                <option value="category">Category</option>
              </select>
              {searchBar === "recipes" && <input type="text" placeholder="Search by recipe" onChange={(e) => handleSearch(e, "recipes")} id="recipe-search" />}
              {searchBar === "ingredients" && <input type="text" placeholder="Search by ingredient" onChange={(e) => handleSearch(e, "ingredients")} id="ingredient-search" />}
              {searchBar === "category" && <input type="text" placeholder="Search by category" onChange={(e) => handleSearch(e, "category")} id="category-search" />}
              <div className="recipe-index">
                {recipes.map((recipe) => (
                  <div className="recipe-index-item" key={recipe.id} onClick={() => scrollToDiv(recipe.id)}>
                    <span>{recipe.name}</span>
                  </div>
                ))}
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
          {Object.entries(recipesByAuthor).map(([author, recipes]) => (
            <div key={author} className="author-section" id={author}>
              <h2>{author}</h2>
              <div className="recipes">
                {recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchRecipe)).filter((recipe) => recipe.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(searchIngredients))).map((recipe) => (
                  <div className="recipe-card" key={recipe.id} id={recipe.id} >
                    <RecipeCard
                      recipe={recipe}
                      volumetric={volumetric}
                      handleDelete={handleDelete}
                      handleUpdate={handleUpdate}
                      preventScrolling={preventScrolling}
                      open={open}
                      setOpen={setOpen}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {open? <AddRecipeModal open={open} setOpen={setOpen} preventScrolling={preventScrolling} handleAdd={handleAdd} recipe={{id: "", name: "", preamble: "", ingredients: [], instructions: [], author: ""}} /> : null}
      </>
  )
}

export default App
