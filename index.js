const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const onlineUsers = new Map()
const EXPIRE_TIME = 30 * 1000

setInterval(() => {
  const now = Date.now()
  for (const [uid, lastTime] of onlineUsers) {
    if (now - lastTime > EXPIRE_TIME) {
      onlineUsers.delete(uid)
    }
  }
}, 5000)

app.post('/api/online/enter', (req, res) => {
  const { uid } = req.body
  if (!uid) return res.send({ success: false, msg: '缺少uid' })
  onlineUsers.set(uid, Date.now())
  res.send({ success: true, online: onlineUsers.size })
})

app.post('/api/online/heart', (req, res) => {
  const { uid } = req.body
  if (onlineUsers.has(uid)) {
    onlineUsers.set(uid, Date.now())
  }
  res.send({ success: true, online: onlineUsers.size })
})

app.get('/api/online', (req, res) => {
  res.send({ success: true, online: onlineUsers.size })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('服务启动', port)
})
