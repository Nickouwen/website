const addRecipe = async (recipe: JSON) => {
    console.log("Adding recipe", recipe)
    const response = await fetch('https://recipes-api-1052140280976.us-west1.run.app/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })
    return response
}

const getRecipes = async () => {
    console.log("Getting recipes")
    const response = await fetch('https://recipes-api-1052140280976.us-west1.run.app/recipes').then(res => res.json())
    return response
}

const getRecipe = async (id: string) => {
    console.log("Getting recipe", id)
    const response = await fetch(`https://recipes-api-1052140280976.us-west1.run.app/recipes/${id}`).then(res => res.json())
    return response
}

const updateRecipe = async (id: string, recipe: JSON) => {
    console.log("Updating recipe", recipe)
    const response = await fetch(`https://recipes-api-1052140280976.us-west1.run.app/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })
    return response
}

const deleteRecipe = async (id: string) => {
    console.log("Deleting recipe", id)
    const response = await fetch(`https://recipes-api-1052140280976.us-west1.run.app/recipes/${id}`, {
        method: 'DELETE'
    })
    return response
}

export { addRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe }