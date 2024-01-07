const app = require("./app")

app.lister(3000, () => {
    console.log("Server is running on port 3000")
})