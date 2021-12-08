import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddForm from './AddForm';
import './App.css';
import Recipe from './Recipe';

// whenever install new packages, make sure to restart the server (npm start) to load the new packages/dependencies

function App() {
  const [yourname, setYourName] = useState("Wafi");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]); // a list of objects
  const [loading, setLoading] = useState(true); // the loading component is mandatory to resolve the undefined issues/errors whenever trying to fetch api
  // when still fetching the api, by deafult it's always 'true' for loading state
  // once data is fetched, only then it will display data on screen, and loading/spinner will switch off, to check whether there's data or not before display on screen
  // if loading state is not implemented, Error Undefined will occur when trying to fetch data

  useEffect(() => {
    axios.get('http://localhost:5000/recipe/recipes')
    .then(response => {

      //set the state for recipes
      setRecipes(response.data); // response.data because the variable for json object (in array) is user-defined as 'data'
      
      // set loading as false, because the app is already loaded to display data
      setLoading(false);
      // console.log(response); // view data in Console tab of webpage (F12)
    })
  }, []) /* useEffect (() => {
      first parameter
  } , second parameter) */

  // if the variable in second parameter undergo changes, the callback function in first parameter will be executed/run
  // second parameter is the dependency
  // if the second parameter is empty, means that the useEffect will only run the first time the component mounts

  const handleAdd = (name, cookingtime, ingredients) => {
    axios.post('http://localhost:5000/recipe/recipes', {
      name,
      cookingtime: parseFloat(cookingtime),
      ingredients
    })
    .then(response => {
      if(response.status === 201) {

        // this is called as js list spread
        setRecipes([ ...recipes, response.data[0] ]) // take existing recipes and append with the newly created recipes in a list
      } else {
        console.log(response)
      }
    })
  }

  const handleDelete = (id) => {
    // Delete from backend
    // and Delete from local state (the parent component variable 'recipes' in useState)
    axios.delete('http://localhost:5000/recipe/recipes/' + id)
    .then(response => {
      if(response.status === 200) {
        // delete from local state
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      } else {
        console.log(response);
      }
    })
  }

  return (
    <div class="body" >
      <h1 class="title" >{yourname}'s Recipe App</h1>
      <h3>The one stop shop for all your recipes!</h3>

      <p> You've searched for { searchQuery } </p>
      <input placeholder="Search Recipes" class="recipie-input" onChange={e => setSearchQuery(e.target.value.toLowerCase())} />

      <AddForm handleAdd={handleAdd} />

      {
        // ternary operater in react, also called as Conditional Rendering
        loading ? // if loading, show <div> Loading
        <div>Loading...</div>
        : // else display data, recipe.filter with do search, then change it to lowercase
        recipes
        .filter(recipe => recipe?.name.toLowerCase().includes(searchQuery))
        .map(recipe => {
          return (
            // recipe?  --> means only when the recipe object/data is exist, then destructure it, if not then don't do anything
            // every component that is rendered as a map, should have a key which tells react how to render the component
            // reference via dan abramov react keys
            // https://twitter.com/dan_abramov/status/1415279090446204929?lang=en
            <Recipe
              key={recipe?.id}
              name={recipe?.name}
              ingredients={recipe?.ingredients}
              cookingTime={recipe?.cookingtime}

              // do Delete with Callback function
              // pass down an anonymous callback
              // once the Delete button is clicked, it will trigger the handleDelete function and pass the recipe id
              // can access the id here because App.js is the parent component, cannot access in child component like Recipe.js
              deleteRecipe={() => handleDelete(recipe?.id)}
            />
          );
        })
      }
    </div>
  );
}

export default App;

// Design the backend -> Write the routes -> Write the frontend -> Link up the two