const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let learnCount = 1386

app.get('/api/count', (req, res) => {
  res.json({ success: true, count: learnCount })
})

app.post('/api/count', (req, res) => {
  const add = req.body.add || Math.floor(Math.random() * 8) + 2
  learnCount += add
  res.json({ success: true, count: learnCount, added: add })
})

app.get('/', (req, res) => {
  res.send(`IoT安全科普后端 API<br>当前学习人数: ${learnCount}`)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
