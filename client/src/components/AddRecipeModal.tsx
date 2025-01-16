import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import "./AddRecipeModal.css";
import { Recipe } from "../types/Recipe";

const AddRecipeModal = ({
  setOpen,
  preventScrolling,
  handleAdd,
  handleUpdate,
  author,
  recipe,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  preventScrolling: () => void;
  handleAdd?: (recipe: Recipe) => void;
  handleUpdate?: (id: string, recipe: JSON) => void;
  recipe?: Recipe;
  author: string;
}) => {
  const [name, setName] = useState(recipe ? recipe.name : "");
  const [preamble, setPreamble] = useState(recipe ? recipe.preamble : "");
  const [ingredients, setIngredients] = useState(
    recipe
      ? recipe.ingredients
      : [
          {
            name: "",
            measurements: {
              volumetric: "",
              weight: "",
            },
            notes: "",
          },
        ]
  );
  const [instructions, setInstructions] = useState(
    recipe ? recipe.instructions : [""]
  );

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        name: "",
        measurements: {
          volumetric: "",
          weight: "",
        },
        notes: "",
      },
    ]);
    console.log(ingredients);
  };

  const updateIngredient = (value: string, index: number, field: string) => {
    const newIngredients = [...ingredients];
    if (field === "name") {
      newIngredients[index].name = value;
    } else if (field === "volumetric") {
      newIngredients[index].measurements.volumetric = value;
    } else if (field === "weight") {
      newIngredients[index].measurements.weight = value;
    } else if (field === "notes") {
      newIngredients[index].notes = value;
    }
    console.log(newIngredients);
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const updateInstruction = (value: string, index: number) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const moveInstruction = (index: number, direction: number) => {
    const newInstructions = [...instructions];
    const temp = newInstructions[index];
    newInstructions[index] = newInstructions[index + direction];
    newInstructions[index + direction] = temp;
    setInstructions(newInstructions);
  };

  const removeInstruction = (index: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const collapseIngredient = (index: number) => {
    const ingredient = document.querySelector(`#ingredient-form-${index}`);
    const chevron = document.querySelector(`.chevron-${index}`);
    if (ingredient) {
      ingredient.classList.toggle("visible");
    }
    if (chevron) {
      chevron.classList.toggle("flipped");
    }
  };

  return (
    <>
      <div
        className="modal-bg"
        onClick={() => {
          setOpen(false);
          preventScrolling();
        }}
      ></div>
      <div className="modal">
        <h1>Add New Recipe</h1>
        <div className="separator"></div>
        <form>
          <label htmlFor="name">Recipe Name</label>
          <br />
          <input
            type="text"
            id="name"
            placeholder="ex. Chocolate Chip Cookies"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <br />
          <label htmlFor="preamble">Overview</label>
          <br />
          <textarea
            id="preamble"
            rows={5}
            placeholder="This is a description of the recipe, if any is required"
            onChange={(e) => setPreamble(e.target.value)}
            value={preamble}
          />
          <br />
          <label htmlFor="ingredients">Ingredients:</label>
          <br />
          <div id="ingredient-container">
            {ingredients.map((_, index) => {
              return (
                <div
                  key={index}
                  className="ingredient"
                  id={`ingredient-${index}`}
                >
                  <span className="ingredient-header">
                    <label htmlFor={`ingredient-${index}-name`}>
                      <span
                        className="toggle"
                        onClick={() => collapseIngredient(index)}
                      >
                        Ingredient Name
                        <ChevronUp
                          className={"chevron chevron-" + index}
                          width="16"
                          height="16"
                        />
                      </span>
                    </label>
                    <X
                      className="close"
                      width="16"
                      height="16"
                      onClick={() => removeIngredient(index)}
                    />
                  </span>
                  <input
                    type="text"
                    id={`ingredient-${index}-name`}
                    onChange={(e) =>
                      updateIngredient(e.target.value, index, "name")
                    }
                    placeholder="ex. Cream Cheese"
                    value={ingredients[index].name}
                    required
                  />
                  <div
                    className="collapsible visible"
                    id={`ingredient-form-${index}`}
                  >
                    <div className="measurements">
                      <div className="volumetric">
                        <label htmlFor={`ingredient-${index}-volumetric`}>
                          Volumetric
                        </label>
                        <br />
                        <input
                          type="text"
                          id={`ingredient-${index}-volumetric`}
                          onChange={(e) =>
                            updateIngredient(
                              e.target.value,
                              index,
                              "volumetric"
                            )
                          }
                          placeholder="ex. 1 cup"
                          value={ingredients[index].measurements.volumetric}
                          required
                        />
                      </div>
                      <br />
                      <div className="weight">
                        <label htmlFor={`ingredient-${index}-weight`}>
                          Weight
                        </label>
                        <br />
                        <input
                          type="text"
                          id={`ingredient-${index}-weight`}
                          onChange={(e) =>
                            updateIngredient(e.target.value, index, "weight")
                          }
                          placeholder="ex. 250g"
                          value={ingredients[index].measurements.weight}
                        />
                      </div>
                    </div>
                    <br />
                    <label htmlFor={`ingredient-${index}-notes`}>Notes</label>
                    <br />
                    <textarea
                      id={`ingredient-${index}-notes`}
                      onChange={(e) =>
                        updateIngredient(e.target.value, index, "notes")
                      }
                      placeholder="ex. Substitute with..."
                      rows={3}
                      value={ingredients[index].notes}
                    />
                  </div>
                </div>
              );
            })}
            <div
              className="button-container small"
              onClick={() => addIngredient()}
            >
              <span>New Ingredient</span>
            </div>
          </div>
          <label htmlFor="instructions">Instructions:</label>
          <br />
          <div id="instructions-container">
            {instructions.map((instruction: string, index: number) => {
              return (
                <div key={index}>
                  <span className="instruction-header">
                    <label htmlFor={`instruction-${index}`}>
                      Step {index + 1}
                    </label>
                    <X
                      className="close"
                      width="16"
                      height="16"
                      onClick={() => removeInstruction(index)}
                    />
                  </span>
                  <input
                    type="text"
                    id={`instruction-${index}`}
                    value={instruction}
                    onChange={(e) => updateInstruction(e.target.value, index)}
                    onKeyDown={(e) => e.key === "Enter" && addInstruction()}
                    placeholder="ex. Preheat oven to 350°F"
                  />
                  {instructions.length === 1 ? null : index ===
                    instructions.length - 1 ? (
                    <ChevronUp
                      className="toggle"
                      onClick={() => {
                        moveInstruction(index, -1);
                      }}
                      width="16"
                      height="16"
                    />
                  ) : index === 0 ? (
                    <ChevronDown
                      className="toggle"
                      onClick={() => {
                        moveInstruction(index, 1);
                      }}
                      width="16"
                      height="16"
                    />
                  ) : (
                    <span>
                      <ChevronUp
                        className="toggle"
                        onClick={() => {
                          moveInstruction(index, -1);
                        }}
                        width="16"
                        height="16"
                      />
                      <ChevronDown
                        className="toggle"
                        onClick={() => {
                          moveInstruction(index, 1);
                        }}
                        width="16"
                        height="16"
                      />
                    </span>
                  )}
                </div>
              );
            })}
            <div
              className="button-container small"
              onClick={() => addInstruction()}
            >
              <span>New Instruction</span>
            </div>
          </div>
          {handleAdd ? (
            <div
              className="button-container main-button"
              onClick={() => {
                handleAdd({
                  id: "",
                  name: name,
                  ingredients: ingredients,
                  instructions: instructions,
                  preamble: preamble,
                  author: author,
                });
                setOpen(false);
                preventScrolling();
              }}
            >
              <span>Add Recipe</span>
            </div>
          ) : handleUpdate && recipe ? (
            <div
              className="button-container main-button"
              onClick={() => {
                handleUpdate(recipe.id, JSON.parse(JSON.stringify({
                  id: recipe.id,
                  name: name,
                  ingredients: ingredients,
                  instructions: instructions,
                  preamble: preamble,
                  author: author,
                })));
                setOpen(false);
                preventScrolling();
              }}
            >
              <span>Edit Recipe</span>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default AddRecipeModal;
