const express = require('express');
const app = express();

const mongoose = require("mongoose");
mongoDb = require('./database/mongodb');
// connect to db
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db_new, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
        console.log('Database sucessfully connected.')
    },
    error => {
        console.log('Database error: ' + error)
    }
);
// Import Routes
const listingRoutes = require("./routes/listings");
const userRoutes = require("./routes/user");

// Middlewares
app.use(express.json());
// Import route Middlewares
app.use("/api/listings", listingRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, () => {
    console.log('App listening on port 3000.');
})