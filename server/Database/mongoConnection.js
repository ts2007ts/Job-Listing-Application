const mongoose = require('mongoose')

//Connect to data base
const connect = mongoose.connect(process.env.DB_LOCAL_URL_STR)
    .then((conn) => {
        console.log('DB Connection Successful');
    }).catch((error) => {
        console.log(error);
    })


module.exports = connect