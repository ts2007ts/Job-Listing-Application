const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const { mongoConnection } = require('./Database/mongoConnection');
const PORT = process.env.PORT || 5000;

//Connect to data base
mongoConnection;

app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    console.log("Server listening on PORT", PORT);
});