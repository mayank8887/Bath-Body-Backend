const app= require("./app");

const dotenv=require("dotenv");
const connectDatabase=require("./Config/database")

//config;

dotenv.config({path:"Config/config.env"})

//connecting to database

connectDatabase()

app.listen(process.env.port,()=>{
    
    console.log(`Server is working on https://localhost ${process.env.port}`)
})