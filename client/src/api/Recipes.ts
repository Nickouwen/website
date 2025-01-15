const addRecipe = async (recipe: JSON) => {
    const response = await fetch('https://recipe-api-1052140280976.us-west1.run.app/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })
    console.log(response)
    return response
}

const getRecipes = async () => {
    const response = await fetch('https://recipe-api-1052140280976.us-west1.run.app/recipes').then(res => res.json())
    console.log(response)
    return response
}

const getRecipe = async (id: string) => {
    const response = await fetch(`https://recipe-api-1052140280976.us-west1.run.app/recipes/${id}`).then(res => res.json())
    console.log(response)
    return response
}

const updateRecipe = async (id: string, recipe: JSON) => {
    const response = await fetch(`https://recipe-api-1052140280976.us-west1.run.app/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })
    console.log(response)
    return response
}

const deleteRecipe = async (id: string) => {
    const response = await fetch(`https://recipe-api-1052140280976.us-west1.run.app/recipes/${id}`, {
        method: 'DELETE'
    })
    console.log(response)
    return response
}

export { addRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe }