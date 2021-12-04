const express = require("express");
const fs = require("fs");
const path = require("path")
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")) // for services static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the template engine as pug
app.set("views" , path.join(__dirname,"views")) //set the views directory

// ENDPOINTS
app.get("/", (req,res) => {
    const con = "This content has been the best"
    const params = {"title": "Valorant is the best game", "content": con}
    res.status(200).render("index.pug",params)
})
app.post("/", (req,res) =>{
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more

    let outputToWrite = `the name of the client is ${name}, ${age} yeras old, ${gender}, residing at ${address}.More about him/her: ${more}`
    fs.writeFileSync("output.txt", outputToWrite)
    const params = {"message": "Your form has been submiittedd successfully"}
    res.status(200).render("index.pug",params)
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});