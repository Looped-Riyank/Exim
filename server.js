const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")

mongoose.connect('mongodb+srv://admin-riyank:looped@cluster0.vxkct.mongodb.net/AlluviumDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}))

const static_path = path.join(__dirname, "public")
app.use(express.static(static_path))


const responseSchema = {
    subject: String,
    any_help: String,
    attachment: String,
    phone: Number,
    critical: String
}

const Response = mongoose.model("Response",responseSchema)

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.get("/received",(req,res)=>{
    res.sendFile(__dirname + "/received.html")
})

app.post("/", (req,res)=>{
    let newResponse = new Response({
        subject:req.body.subject,
        any_help:req.body.help,
        attachment:req.body.myfile,
        phone:req.body.phone,
        critical:req.body.critical
    })

    newResponse.save()
    res.redirect("/received")
})

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port, function() {
  console.log("Server started succesfully");
});