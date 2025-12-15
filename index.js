const express = require("express")
const userRoutes = require("./routes/user")

const app = express()

// middleware
app.use(express.json())

// routes
app.use("/api", userRoutes)

// start server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
