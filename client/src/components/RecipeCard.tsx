import IngredientList from "./IngredientList";
import { Recipe } from "../types/Recipe";
import { ChevronDown, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import "./RecipeCard.css";
import { useState } from "react";
interface RecipeProp {
  recipe: Recipe;
  volumetric: boolean;
  handleDelete: (id: string) => void;
}

const RecipeCard = ({ recipe, volumetric, handleDelete }: RecipeProp) => {
  const { name, ingredients, instructions, preamble } = recipe;
  const [editMode, setEditMode] = useState(false);

  const handleMenuClick = () => {
    const menu = document.querySelector(".tooltip" + recipe.id);
    if (menu) {
      menu.classList.toggle("visible");
    }
  };

  const toggleInstructions = () => {
    const instructions = document.querySelectorAll(".collapsible" + recipe.id);
    const chevron = document.querySelector(".chevron" + recipe.id);
    if (instructions) {
      instructions.forEach((instruction) => {
        instruction.classList.toggle("visible");
      });
    }
    if (chevron) {
      chevron.classList.toggle("flipped");
    }
  };

  return (
    <>
      <h2
        className="toggle"
        onClick={() => {
          toggleInstructions();
        }}
      >
        {name}{" "}
        <ChevronDown
          width="21.5"
          height="21.5"
          className={"toggle chevron chevron" + recipe.id}
        />
      </h2>
      <div className="options-container">
        <EllipsisVertical
          className="options"
          onClick={() => {
            handleMenuClick();
          }}
        />
        <div className={"options-menu tooltip" + recipe.id}>
          <ul>
            <li
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              <Pencil className="menu-icon" width="12" height="12" /> Edit
            </li>
            <li
              onClick={() => {
                handleDelete(recipe.id);
              }}
            >
              <Trash2 className="menu-icon" width="12" height="12" /> Delete
            </li>
          </ul>
        </div>
      </div>
      <p>{preamble}</p>
      <div className={`toggle-container collapsible collapsible${recipe.id}`}>
        <div className="ingredients-container">
          <h3 className="header">Ingredients</h3>
          <div className="separator"></div>
          <IngredientList ingredients={ingredients} volumetric={volumetric} />
        </div>
        <div className="instructions-container">
          <h3 className="header">Instructions </h3>
          <div className="separator"></div>
          <ol>
            {instructions.map((instruction, index) => {
              return (
              <li key={index}>{instruction}</li>
              )})}
          </ol>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
