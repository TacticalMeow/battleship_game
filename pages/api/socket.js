import { Server } from 'Socket.IO'

const boardSet="";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    //handling connection
    // requests and everything within that connection happens in the io.on block
    io.on('connection', socket => {
      const clientID = socket.id;
      
      socket.on('board-size-change', msg => {
        socket.broadcast.emit('board-size-update', msg)
        boardSet=msg;
      })

      socket.on('board-size-req', msg => {
        socket.broadcast.emit('board-size-update', boardSet)
      })
      
      console.log("server connected");
    })


  }
  res.end()
}

export default SocketHandler
