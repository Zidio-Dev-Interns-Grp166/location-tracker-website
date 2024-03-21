import express from 'express';
import dbConnection from './src/config/dbConnection.js'
import routes from './src/routes/routes.js';
const app = express();
const port = process.env.PORT || 3002;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static("dist"));
 
app.get('/', (req, res) => {
    res.send('Welcome to the Location Tracker Backend Logic');
});
app.use('/api', routes);
app.use((err, req, res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message,
    });
});


// If database is connected successfully, then run the server
dbConnection
    .getConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Failed to connect to the database: ${err.message}`);
    });


//👇🏻 An array containing all the users
const users = [];

//👇🏻 Generates a random string as the ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/signUp", (req, res) => {
    //👇🏻 Get the user's credentials
    const { username, email, password } = req.body;

    //👇🏻 Checks if there is an existing user with the same email or password
    let result = users.filter((user) => user.email === email );

    //👇🏻 if none
    if (result.length === 0) {
        //👇🏻 creates the structure for the user
        const newUser = { id: generateID(), username, email, password };
        //👇🏻 Adds the user to the array of users
        users.push(newUser);
        //👇🏻 Returns a message
        return res.json({
            message: "Account created successfully!",
        });
    }
    //👇🏻 Runs if a user exists
    res.json({
        error_message: "User already exists",
    });
});


app.post("/api/login", (req, res) => {
    //👇🏻 Accepts the user's credentials
    const { email, password } = req.body;
    //👇🏻 Checks for user(s) with the same email and password
    let result = users.filter(
        (user) => user.email === email && user.password === password 
    );

    //👇🏻 If no user exists, it returns an error message
    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    //👇🏻 Returns the username of the user after a successful login
    res.json({
        message: "Login successfully",
        data: {
            username: result[0].username,
        },
    });
});