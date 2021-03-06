const express = require('express');
const app = express();
const cors = require("cors");
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
const authRoutes = require("./routes/auth");

// Middlewares
app.use(express.json());
app.use(cors());
// Import route Middlewares
app.use("/api/listings", listingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
    console.log('App listening on port 3000.');
})