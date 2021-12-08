import React from 'react';

const Recipe = (props) => {
    // destructuring an object
    const { name, ingredients, cookingTime, deleteRecipe } = props;

    return (
        <div class="recipie-tab" >
            <p>Name: {name}</p>
            <p>Ingredients: {ingredients}</p>
            <p>Cooking Time: {cookingTime} hours</p>
            <button onClick={deleteRecipe}>
                Delete Recipe
            </button>
        </div>
    );
};

export default Recipe;