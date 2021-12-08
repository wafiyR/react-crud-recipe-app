import React, { useState } from 'react';
import PropTypes from 'prop-types';

// name, cookingtime, ingredients

const AddForm = props => {
    const [name, setName] = useState("");
    const [cookingtime, setCookingtime] = useState(0);
    const [ingredients, setIngredients] = useState("");

    const { handleAdd } = props;

    // onChange -  everytime one of the input field/value changes, it will set the state automatically and can access the changes state in handleAdd

    return (
        <div>
            <h3>Add New Recipe</h3>
            <form> 
                <div style={{ display: "flex", marginBottom: "1rem" }} > 
                    <p style={{ marginRight: "1rem" }}>Recipe Name</p>
                    <input className="recipie-input" type="text" name="name" placeholder="Recipe Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div style={{ display: "flex", marginBottom: "1rem" }} >
                    <p style={{ marginRight: "1rem" }}>Recipe Cooking Time</p>
                    <input className="recipie-input" type="text" name="name" placeholder="Recipe Cooking Time" onChange={(e) => setCookingtime(e.target.value)} />
                </div>
                <div style={{ display: "flex", marginBottom: "1rem" }} >
                    <p style={{ marginRight: "1rem" }}>Recipe Ingredients</p>
                    <input className="recipie-input" type="text" name="name" placeholder="Recipe Ingredients" onChange={(e) => setIngredients(e.target.value)} />
                </div>
                <button type="submit" onClick={() => handleAdd(name, cookingtime, ingredients)}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddForm;