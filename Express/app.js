const express = require("express")

let server = express()

server.listen('4000')

server.use(express.static("public"))

server.set("view engine", "ejs")

server.get('/', (req, res)=>{
    res.render("index")
})

server.get('/contact-us', (req, res)=>{
    res.render("contact")
})

server.get('/stories', (req,res)=>{
    res.render("stories")
})