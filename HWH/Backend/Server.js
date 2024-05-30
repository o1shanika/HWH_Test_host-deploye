require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Stripe = require('stripe');
const stripe = Stripe(process.env.SECRET_KEY);
const app = express();

app.use(express.json());

// Define the main PORT
const PORT = process.env.PORT || 8070;

// Define Stripe PORT
const STRIPE_PORT = process.env.PORT || 8080;

// Define the Stripe payment route
app.post('/pay', async(req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount: 1099,
          currency: "USD",
          payment_method_types: ["card"],
      });
      const clientSecret = paymentIntent.client_secret;
      res.json({ message: "Payment Initiated", clientSecret });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// Use the required dependencies
app.use(cors(
    {
        origin: [],
        methods: ["POST","GET"],
        credentials: true
                 }
                 
        
    
));



app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL,{
    useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb Connection success!");
})

// Operator database connection
const operatorDB_URL = process.env.OPERATOR_MONGODB_URL;
const operatorDB = mongoose.createConnection(operatorDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
operatorDB.on('connected', () => {
    console.log("Connected to operator database successfully!");
});
operatorDB.on('error', (err) => {
    console.error("Error connecting to operator database:", err);
});

// Vehicle database connection
const vehicleDB_URL = process.env.VEHICLE_MONGODB_URL;
const vehicleDB = mongoose.createConnection(vehicleDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
vehicleDB.on('connected', () => {
    console.log("Connected to vehicle database successfully!");
});
vehicleDB.on('error', (err) => {
    console.error("Error connecting to vehicle database:", err);
});

// Ticket database connection
const ticketDB_URL = process.env.TICKET_MONGODB_URL;
const ticketDB = mongoose.createConnection(ticketDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
ticketDB.on('connected', () => {
    console.log("Connected to Ticket database successfully!");
});
ticketDB.on('error', (err) => {
    console.error("Error connecting to vehicle database:", err);
});

// Payment card database connection
const cardDB_URL = process.env.CARD_MONGODB_URL;
const cardDB = mongoose.createConnection(cardDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
cardDB.on('connected', () => {
    console.log("Connected to payment database successfully!");
});
cardDB.on('error', (err) => {
    console.error("Error connecting to payment database:", err);
});

// Require routes
const userRouter = require("./routes/users.js");
const operatorRouter = require("./routes/operators.js");
const vehicleRouter = require("./routes/vehicles.js");
const ticketRouter = require("./routes/tickets.js");
//const cardRouter = require("./routes/cards.js");

// Use routes
app.use("/user",userRouter);
app.use("/operator", operatorRouter);
app.use("/vehicle",vehicleRouter);
app.use("/ticket",ticketRouter);
//app.use("/card",cardRouter);

// Listen to the main PORT
app.listen(PORT,() =>{
    console.log(`Server is up and running on port:${PORT}`);
});
