
// import Express -  as wrapper for api
const express = require("express");

// Ctrl + C to exit terminal 

// create app
const app = express();

// import PostgreSQL
// Pool is used to setup one connection and maintain it, then make multiple connections
const Pool = require("pg").Pool;

const cors = require("cors"); // import cors

// CORS = Cross Origin Resource Sharing
app.use(cors()); 

// grab data from www and test api in Postman \
// crucial for testing in Postman
app.use(express.urlencoded({ extended: true }));

// convert request from body to json
app.use(express.json());

// create Router
const recipeRouter = express.Router();

// set the route for Router
app.use('/recipe', recipeRouter);

// URL for ElephantSQL to connect with database
// postgres://vflsauty:7VYlugH3B8bACTPRjj6AIzCG70SYTjhy@fanny.db.elephantsql.com/vflsauty
// postgres://YourUsername:YourPassword@YourHostname/YourDatabaseName
// co-instance
// configuration of objects
// Establish connection
const pool = new Pool({
    user: 'vflsauty',
    password: '7VYlugH3B8bACTPRjj6AIzCG70SYTjhy',
    host: 'fanny.db.elephantsql.com',
    database: 'vflsauty'
});


// GET ALL RECIPES
// /recipes
// send back all recipes
// this is called callback function
recipeRouter.get('/recipes', (request, response) => {
    
    // first parameter for pool.quary is for the query
    // second parameter is for the callbacks
    pool.query('SELECT * FROM recipes', (error, results) => {
        if (error) {
            // 500 is internal server error
            response.status(500).send(error);
        } else {
            // results.rows to see rows in database only // send back the rows of data to exclude other unnecessary data
            response.status(200).send(results.rows);
            // 200 means successful query
        }
    })
})

// GET A SINGLE RECIPE BY ID
recipeRouter.get('/recipes/:id', (request, response) => {

    // params will get in as String, so implement parseInt
    // in testing at Postman, id is got from = http://localhost:5000/recipe/recipes/4 where the id is 4
    let id = parseInt(request.params.id);

    pool.query('SELECT * FROM recipes WHERE id=$1', [id], (error, results) => {
        if(error) {
            response.status(500).send(error);
        } else {
            response.status(200).send(results.rows);
        }
    });
})

// POST: Create a new recipe
recipeRouter.post('/recipes', (request, response) => {
    let name = request.body.name;
    let cookingtime = parseFloat(request.body.cookingtime);
    let ingredients = request.body.ingredients;

    // RETURNING * because to get the id and return the newly created data
    pool.query('INSERT INTO recipes (name, cookingtime, ingredients) values ($1, $2, $3) RETURNING *', [name, cookingtime, ingredients], (error, results) => {
        if(error) {
            response.status(500).send(error);
        } else {
            // 201 is industry standard that means the resource is successfully created
            response.status(201).send(results.rows);
        }
    })
})

// DELETE: Delete a recipe by it's id
recipeRouter.delete('/recipes/:id', (request, response) => {
    let id = parseInt(request.params.id);

    pool.query('DELETE FROM recipes WHERE id=$1', [id], (error, results) => {
        if(error) {
            response.status(500).send(error);
        } else {
            response.status(200).send("Recipe Deleted");
        }
    })
})

// listen for connections
app.listen(5000, () => {
    console.log("I am listening on 5000");
})