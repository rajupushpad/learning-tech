--------------------------------------NPM---------------------------------------
Express: Express will be used for the middleware to create various CRUD endpoints.
Mongoose: Mongoose for managing data in MongoDB using various queries.
Nodemon: Nodemon to restart our server every time we save our file.
Dotenv: It is used to load values from .env file.
--------------------------------------NPM End------------------------------------

--------------------------------------App.js-------------------------------------
app.use: It allows us to accept the data in JSON format.

mongoDB Compass: It is Graphical user interface ( GUI ) for mongoDB.Compass is a free 
interactive tool for querying, optimizing, and analyzing your MongoDB data. Get key insights, 
drag and drop to build pipelines, and more.

Helmet npm: It is used to secure your express apps by setting various HTTP headers.

bodyParser: body-parser is the Node.js body parser middleware. It is responsible for parsing the incoming
request bodies in a middleware before you handle it.

example - 
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use: This function is used to mount the specified middleware function at the path which is being specified.
It is mostly used to setup middleware for your application.

example - 
app.use(path, callback)

app.get: This function is used to to route the HTTP GET request to the path which being specified with the 
specified callback function.

example - 
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

--------------------------------------App.js end-------------------------------------
