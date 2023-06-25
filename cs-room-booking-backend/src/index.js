const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const { getOverviewBooking } = require('./services/realtime-overview')
const bookingRouter = require('./routes/booking.route');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET','POST'],
    allowedHeaders: '*',
}));
app.use(bookingRouter);


app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Welcome to cs-room-booking API"
    })
})

const { Server } = require('socket.io');
const socketIO = new Server(server, {
    cors: {
        origin: '*',
        methodes: ['GET', 'POST'],
        credentials: true,
    },
});

socketIO.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
});

setInterval(async () => {
    socketIO.emit('overviewBook', await getOverviewBooking());
}, 1000)

server.listen(process.env.PORT, () => {
    console.log('CS-Room-Booking is listening on port ', process.env.PORT)
})

