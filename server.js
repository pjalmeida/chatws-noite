const express = require("express")
const app = express()

app.use(express.static("public"))

const http = require("http").Server(app)
const PORT =process.env.PORT || 8000


                  //função de callback
http.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))

app.get("/",  (_, res) => res.sendFile(`${__dirname}/index.html`))

const serverSocket = require("socket.io")(http)

serverSocket.on("connect", socket => {
  console.log(`Cliente ${socket.id} conectou`)

  socket.on("chat msg", msg => {
    msg = `Msg recebida de ${socket.username}: ${msg}`
    serverSocket.emit("chat msg", msg)
    console.log(msg)
  })

  socket.on("login", username => {
    socket.username = username
    serverSocket.emit("chat msg", `Usuário ${username} entrou`)
  })
})
