import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import "./AddRecipeModal.css";

const AddRecipeModal = ({
  setOpen,
  preventScrolling
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  preventScrolling: () => void;
}) => {
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      measurements: {
        volumetric: "",
        weight: "",
      },
      notes: "",
    },
  ]);
  const [instructions, setInstructions] = useState([""]);

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
    if (ingredient) {
      ingredient.classList.toggle("visible");
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
        <h4>Add New Recipe</h4>
        <form>
          <label htmlFor="name">Recipe Name</label>
          <br />
          <input type="text" id="name" />
          <br />
          <label htmlFor="preamble">Overview</label>
          <br />
          <textarea id="preamble" />
          <br />
          <label htmlFor="ingredients">Ingredients:</label>
          <br />
          <div id="ingredient-container">
            {ingredients.map((_, index) => {
              return (
                <div key={index} id={`ingredient-${index}`}>
                  <span className="ingredient-header">
                    <label htmlFor={`ingredient-${index}-name`}>
                      Ingredient Name
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
                  />
                  <br />
                  <span
                    className="toggle"
                    onClick={() => collapseIngredient(index)}
                  >
                    Collapse
                  </span>
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
                    />
                  </div>
                </div>
              );
            })}
            <div className="button-container" onClick={() => addIngredient()}>
              <span>Add Ingredient</span>
            </div>
          </div>
          <label htmlFor="instructions">Instructions:</label>
          <br />
          <div id="instructions-container">
            {instructions.map((instruction, index) => {
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
            <div className="button-container" onClick={() => addInstruction()}>
              <span>Add Instruction</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipeModal;
