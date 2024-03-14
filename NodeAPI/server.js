const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
const { Server } = require('socket.io')
const http = require('http')

require('dotenv').config()
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  autoConnect: true,
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı.')
  socket.on('addCategory', (newCategory) => {
    console.log('Yeni kategori eklendi:', newCategory)
    io.emit('categoryAdded', newCategory)
  })

  socket.on('disconnect', () => {
    console.log('Bir kullanıcı bağlantıyı kesti.')
  })
})

app.use(express.json())
app.use(cors())
mongoose
  .connect(process.env.DATABASE_SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err) => {
    console.log('Connection failed!', err)
  })

const authRouter = require('./routes/auth')
const roleRouter = require('./routes/roles')
const uploadRouter = require('./routes/uploads')
const productsRouter = require('./routes/products')
const userRoleRouter = require('./routes/userRoles')
const categoriesRouter = require('./routes/categories')
const permissionRouter = require('./routes/permissions')

app.use('/api/auth', authRouter)
app.use('/api/roles', roleRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/products', productsRouter)
app.use('/api/userRoles', userRoleRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/permissions', permissionRouter)

app.get('/', (req, res) => {
  res.send('HELLO WORLD')
})

io.listen(5002)
const PORT = process.env.PORT || 5001 // .env dosyasında PORT yoksa 5001 portunu kullanır
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
