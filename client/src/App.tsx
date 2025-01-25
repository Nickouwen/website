import { useState, useEffect } from 'react'
import './App.css'
import { addRecipe, deleteRecipe, getRecipes, updateRecipe } from './api/Recipes.ts'
import RecipeCard from './components/RecipeCard.tsx'
import { Beaker, Menu, Weight } from 'lucide-react'
import AddRecipeModal from './components/AddRecipeModal.tsx'
import { Recipe } from './types/Recipe.tsx'
import { Ingredient } from './types/Ingredient.tsx'
import Login from './components/Login.tsx'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "basic")
  const [updated, setUpdated] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [searchRecipe, setSearchRecipe] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchIngredients, setSearchIngredients] = useState("")
  const [searchBar, setSearchBar] = useState("recipes")
  const [open, setOpen] = useState(false)
  const [volumetric, setVolumetric] = useState(true)
  const [user, setUser] = useState("")
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

  const toggleTheme = (theme: string) => {
    const root = document.documentElement
    switch (theme) {
      case "basic": {
        root.style.setProperty('--primary', '#FFFFFF')
        root.style.setProperty('--complementary', '#000000')
        root.style.setProperty('--border', '#555555')
        root.style.setProperty('--index', '#FFFFFF')
        root.style.setProperty('--index-complementary', '#000000')
        root.style.setProperty('--button', '#FFFFFF')
        root.style.setProperty('--recipe-card', '#FFFFFF')
        root.style.setProperty('--input', '#FFFFFF')
        root.style.setProperty('--text', '#000000')
        root.style.setProperty('--placeholder', '#777777')
        localStorage.setItem("theme", "basic")
        setTheme("basic")
        break
      }
      case "mom": {
        root.style.setProperty('--primary', '#A7B49E')
        root.style.setProperty('--complementary', '#E2E0C8')
        root.style.setProperty('--border', '#485242')
        root.style.setProperty('--index', '#779977')
        root.style.setProperty('--index-complementary', '#E2E0C8')
        root.style.setProperty('--button', '#779977')
        root.style.setProperty('--recipe-card', '#E2E0C8')
        root.style.setProperty('--input', '#E2E0C8')
        root.style.setProperty('--text', '#000000')
        root.style.setProperty('--placeholder', '#444444')
        localStorage.setItem("theme", "mom")
        setTheme("mom")
        break
      }
      case "dark": {
        root.style.setProperty('--primary', '#313342')
        root.style.setProperty('--complementary', '#E0E1DD')
        root.style.setProperty('--border', '#606060')
        root.style.setProperty('--index', '#212533')
        root.style.setProperty('--index-complementary', '#E0E1DD')
        root.style.setProperty('--button', '#313340')
        root.style.setProperty('--recipe-card', '#212533')
        root.style.setProperty('--input', '#313342')
        root.style.setProperty('--text', '#E0E1DD')
        root.style.setProperty('--placeholder', '#CCCCCC')
        localStorage.setItem("theme", "dark")
        setTheme("dark")
        break
      }
    }
  }

  window.addEventListener("mousedown", (e) => {
    const x = window.matchMedia("(max-width: 600px)")
    const index = document.querySelector('.index')
    const indexBg = document.querySelector('.mobile-index-bg')
    const menu = document.querySelectorAll('.options-menu')
    if (x.matches) {
      if (!index?.contains(e.target as Node)) {
        index?.classList.remove('visible')
        indexBg?.classList.remove('visible')
      }
    }
    if (menu) {
      menu.forEach((menu) => {
        menu.classList.remove('visible')
      })
    }
  })

  const toggleIndex = () => {
    const index = document.querySelector('.index')
    const indexBg = document.querySelector('.mobile-index-bg')
    indexBg?.classList.toggle('visible')
    index?.classList.toggle('visible')
  }

  const recipesByAuthor = recipes.reduce((acc: { [key: string]: Recipe[] }, recipe) => {
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
    if (newRecipe.ingredients.length === 0) {
      newRecipe.ingredients.push({
        name: "",
        measurements: {
          volumetric: "",
          weight: ""
        },
        notes: ""
      })
    }
    newRecipe.ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.name === "") {
        ingredient.name = "N/A"
      }
    })
    addRecipe(newRecipe).then(res => res.json()).then(data => setRecipes([...recipes, data]))
  }

  const handleUpdate = (id: string, recipe: JSON) => {
    console.log("Updating recipe", recipe)
    updateRecipe(id, recipe)
    setUpdated(true)
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
    const user = localStorage.getItem("author")
    const theme = localStorage.getItem("theme")
    if (theme) {
      toggleTheme(theme)
    }
    if (user) {
      setLoggedIn(true)
      setUser(user)
      getRecipes().then((recipes) => {
        if (recipes) {
          setRecipes(recipes)
        } else {
          setRecipes([])
        }
        setLoading(false)
      });
    }
    setUpdated(false)
  }, [loggedIn, updated])

  if (!loggedIn) {
    return (
      <Login setLoggedIn={setLoggedIn} />
    )
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
      <>
        <header>
          <div className="title">
            <h1>Family Recipes</h1>
          </div>
          {(user != "Unknown") && <div className="button-container logout" onClick={() => {setLoggedIn(false); localStorage.removeItem("author")}}>
            <span>Logout</span>
          </div>}
          {(user == "Unknown") && <div className="button-container logout" onClick={() => {setLoggedIn(false); localStorage.removeItem("author")}}>
            <span>Log in</span>
          </div>}
          <div className="button-container" id="volumetric-button" onClick={() => setVolumetric(!volumetric)}>
            {volumetric? <span><Beaker width="16" height="16" />Volumetric</span> : <span><Weight width="16" height="16" /> Weight</span>}
          </div>
          {(user != "Unknown") && <div className="button-container">
            <span onClick={() => {setOpen(true); preventScrolling()}}>Add New Recipe</span>
          </div>}
          <div className="theme-select">
            <select onChange={(e) => toggleTheme(e.target.value)} defaultValue={theme}>
              <option value="basic">Basic</option>
              <option value="mom">Mom</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </header>
        <div className="mobile-index-bg"></div>
        <div className="index">
              <h1>Index</h1>
              <span>Search by</span>
              <select onChange={(e) => setSearchBar(e.target.value)}>
                <option value="recipes">Recipes</option>
                <option value="ingredients">Ingredients</option>
              </select>
              {searchBar === "recipes" && <input type="text" placeholder="Search by recipe" onChange={(e) => handleSearch(e, "recipes")} id="recipe-search" />}
              {searchBar === "ingredients" && <input type="text" placeholder="Search by ingredient" onChange={(e) => handleSearch(e, "ingredients")} id="ingredient-search" />}
              <div className="recipe-index">
                {Object.entries(recipesByAuthor).map(([author, recipes]) => (
                  <div key={author} className="author-section" id={author}>
                    <h3>{author}</h3>
                    {recipes.map((recipe: Recipe) => (
                      <div className="recipe-index-item" key={recipe.id} onClick={() => scrollToDiv(recipe.id)}>
                        <span>{recipe.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
        <div className="burger" onClick={() => toggleIndex()}><Menu /></div>
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
                      user={user}
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
        {open? <AddRecipeModal open={open} setOpen={setOpen} preventScrolling={preventScrolling} handleAdd={handleAdd} recipe={{id: "", name: "", preamble: "", ingredients: [], instructions: [], author: ""}} author={user} /> : null}
      </>
  )
}

export default App
