require("dotenv").config()

const app = require("./src/App");



const connectDb=require('./src/Config/database')

connectDb()

app.listen(3000,()=>{
    console.log("server is running at 3000");
    
})