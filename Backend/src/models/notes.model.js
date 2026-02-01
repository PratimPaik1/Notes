const mongoose=require("mongoose")

const noteSchema=new mongoose.Schema({
    title: String,
    description: String,
})

const notemodel=mongoose.model("notes",noteSchema)

module.exports=notemodel