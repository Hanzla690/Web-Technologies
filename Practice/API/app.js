const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/users")

mongoose.connect("mongodb://localhost:27017/demo").then(()=>{
    console.log("DB Connected")
})

let server = express()

server.use(express.json())
server.use(express.static("public"))
server.use("/api/users", userRouter)
server.set("view engine", "ejs")


server.get("/", (req, res)=>{
    res.render("index")
})

server.listen("4000", ()=>{
    console.log("Server started at port 4000")
})