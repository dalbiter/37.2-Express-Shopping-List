const express = require("express")
const morgan = require("morgan")
const ExpressError = require("./errors")
const itemsRoutes = require("./routes/itemRoutes")

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use("/items", itemsRoutes)

/** 404 handler */

app.use((req, res, next) => {
    return new ExpressError("Not Found", 404)
});

/**General error handler */

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
        status: err.status
    })
})

module.exports = app;