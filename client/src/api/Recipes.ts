const addRecipe = async (recipe: JSON) => {
    const response = await fetch('http://localhost:80/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    }).then(res => res.json())
    return response
}

const getRecipes = async () => {
    const response = await fetch('http://localhost:80/recipes').then(res => res.json())
    return response
}

const getRecipe = async (id: string) => {
    const response = await fetch(`http://localhost:80/recipes/${id}`).then(res => res.json())
    return response
}

const updateRecipe = async (id: string, recipe: JSON) => {
    const response = await fetch(`http://localhost:80/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    }).then(res => res.json())
    return response
}

const deleteRecipe = async (id: string) => {
    const response = await fetch(`http://localhost:80/recipes/${id}`, {
        method: 'DELETE'
    }).then(res => res.json())
    return response
}

export { addRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe }