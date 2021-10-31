const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const port = process.env.PORT || 3002
const app = express();

// Middleware 
app.use(cors())
app.use(express.json())


// Database Connetion 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fwb1h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () =>{
    try{
        await client.connect();
        console.log("Database Connected")

        // Database and Collections 

        const dbName = client.db('travelhero');
        const cityCol = dbName.collection('city');
        const destinationCol = dbName.collection('destination');
        const tourCol = dbName.collection('tour');
        const manageCol = dbName.collection('manage');

        // City Collection 
        app.get('/city', async(req, res) => {
            const cursor = cityCol.find({});
            const city = await cursor.toArray();
            res.send(city);
        })
        // Single City 
        app.get('/city/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id:ObjectId(id)}
            const result = await cityCol.findOne(query)
            res.send(result)
            console.log(id)
        })


        // Tour Collection 
        app.get('/tour', async(req, res) => {
            const cursor = tourCol.find({});
            const tour = await cursor.toArray();
            res.send(tour);
        })
        // Single Tour 
        app.get('/tour/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id:ObjectId(id)}
            const result = await tourCol.findOne(query)
            res.send(result)
            console.log(id)
        })


        // Destination Collection 
        app.get('/destination', async(req, res) => {
            const cursor = destinationCol.find({});
            const destination = await cursor.toArray();
            res.send(destination);
        })
        // Single City 
        app.get('/destination/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id:ObjectId(id)}
            const result = await destinationCol.findOne(query)
            res.send(result)
            // console.log(id)
        })

        // Get Managable Data 
        app.get('/manage', async(req, res) => {
            const cursor = manageCol.find({})
            const manage = await cursor.toArray();
            res.send(manage)
        })

        // Get Managable single Data 
        app.get('/manage/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await manageCol.findOne(query)
            res.json(result)
        })


        // Posting Data 
        app.post('/manage', async(req, res) => {
            const manage = req.body;
            console.log('post hitted')
            const result = await manageCol.insertOne(manage)
            res.json(result)
        })
        app.post('/tour', async(req, res) => {
            const tour = req.body;
            console.log('post hitted')
            const result = await tourCol.insertOne(tour)
            res.json(result)
        })

        // Deleting Data 
        app.delete('/manage/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id:ObjectId(id)}
            const result = await manageCol.deleteOne(query)
            res.json(result)
        })

    }
    finally{

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send("Server Running...")
});



app.listen(port, () => {
    console.log("server runnig on", port)
})
