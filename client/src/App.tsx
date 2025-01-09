import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { addRecipe, getRecipes } from './api/Recipes.ts'
import testRecipe from './api/test-data/basque-cheesecake.ts'

function App() {
  const [count, setCount] = useState(0)
  const [recipes, setRecipes] = useState([{
    id: "",
    name: "",
    ingredients: [],
    instructions: [],
    preamble: "",
    author: ""
  }])

  useEffect(() => {
    getRecipes().then((recipes) => {
      if (recipes) {
        setRecipes(recipes)
      } else {
        setRecipes([])
      }
    })
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Nic's React App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <h2>{recipe.name}</h2>
              <p>{recipe.preamble}</p>
            </div>
          ))}
        </div>
        <button onClick={() => addRecipe(JSON.parse(testRecipe))}>Add Test Recipe</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
