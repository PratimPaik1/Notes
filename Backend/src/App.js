const express = require("express")
const notemodel = require('./models/notes.model.js')
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())


app.use(express.static(path.join(__dirname, "..", "public")))

// APIs
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body
  const note = await notemodel.create({ title, description })

  res.status(201).json({
    message: "note created",
    note
  })
})

app.get("/api/notes", async (req, res) => {
  const notes = await notemodel.find()
  res.status(200).json({ message: "all notes", notes })
})

app.delete("/api/notes/:id", async (req, res) => {
  await notemodel.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

app.patch("/api/notes/:id", async (req, res) => {
  const { title,description } = req.body
  await notemodel.findByIdAndUpdate(req.params.id, { title,description })

  res.status(200).json({ message: "Note updated successfully." })
})


app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

module.exports = app
