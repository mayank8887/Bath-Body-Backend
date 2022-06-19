const app= require("./app");

const dotenv=require("dotenv");
const connectDatabase=require("./Config/database")
const port = process.env.PORT || 4000


//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Uncaught Exception`)
    process.exit(1)
})

//config;

dotenv.config({path:"Config/config.env"})

//connecting to database

connectDatabase()

const server =app.listen(port,()=>{
    
    console.log(`Server is working on https://localhost ${port}`)
})


//Unhandled Promise Rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`)

    server.close(()=>{
        process.exit(1)
    })
})