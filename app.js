require("dotenv").config();
const express = require("express");
const routeAuth = require("./routes/user.routes");
const routeDashboard = require("./routes/dashboard.route");
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8003;

app.use(cors( {origin: '*'} ));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/user",routeAuth);

app.use("/",routeDashboard);

app.use(express.static("public"))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/`)
});