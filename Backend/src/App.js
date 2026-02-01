const express = require("express")
const notemodel = require('./models/notes.model.js')


const cors = require("cors")
const app = express()



app.use(cors()) 
app.use(express.json())



app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body

    const note = await notemodel.create({
        title, description
    })

    res.status(201).json({
        message: "note created",
        note

    })
})
app.get("/api/notes",async (req,res)=>{
    const notes=await notemodel.find()

    res.status(201).json({
        message:"all notes",
        notes
    })
})

app.delete("/api/notes/:idx" , async (req,res)=>{
    const id=req.params.idx
    console.log(id)

    await notemodel.findByIdAndDelete(id)
    res.status(204).json({
        message:"note deleted"
    })
})

app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await notemodel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully."
    })

})


module.exports = app 