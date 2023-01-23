const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// import object
const MyItems = require('./models/items');

// calling express function
const app = express();

// parses JSON back into object
app.use(express.json());

// directs to public folder when making request
app.use(express.static('public'));

// allows nested objects
app.use(express.urlencoded({extended:true}));

// connection string to mongoDB
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.1eeko3p.mongodb.net/Inventory?retryWrites=true&w=majority`


mongoose.set('strictQuery', false);

// connect to mongoDB database
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('connection to mongoDB')
})

// route to create item/destructuring object
app.post('/create_item', async (req,res) => {
    const {priceNumber: price, inventoryNumber: inventory, deliveryDate: nextDelivery, deliveryAmtNumber: deliveryAmt, nameString: name} = req.body;
    let returnedValue = await MyItems.create({
        price,
        inventory,
        nextDelivery,
        deliveryAmt,
        name
    })
    console.log(returnedValue);
    if (returnedValue) {
        console.log('upload complete')
    }
    res.send(returnedValue);
});

// get data and display on frontend
app.get('/get_item', async (req,res) =>{
    let response = await MyItems.find({});
    console.log(response);
    res.json(response);
});


app.listen(5000, () => {
    console.log(`Server started on port`);
});
