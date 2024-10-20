import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { MongoClient, ServerApiVersion } from 'mongodb';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: 'true'}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: 'true'}));

app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// const client = new MongoClient(process.env.CONNECTION_URL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
  
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
// }


// run().catch(console.dir);


