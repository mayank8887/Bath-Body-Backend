const app= require("./app");

const dotenv=require("dotenv");
const connectDatabase=require("./Config/database")


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

const server =app.listen(process.env.PORT,()=>{
    
    console.log(`Server is working on https://localhost ${process.env.PORT}`)
})


//Unhandled Promise Rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`)

    server.close(()=>{
        process.exit(1)
    })
})