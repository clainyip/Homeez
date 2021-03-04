const express = require('express');
const app = express();
const connectDb = require('./src/connection');
const Info = require('./src/model/Information.model')
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 8080;
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.get('/info', async (req, res) => {
  const info = await Info.find();

  res.json(info);
});

app.post('/info', async (req, res) => {
  
  const info = new Info({ table_info: req.body.tableInfo });

  await info.save().then(() => console.log('info created'));

  res.send('info created \n');
});

app.delete('/info/:id', async (req, res) => {
  const id = req.params.id;
  const info = await Info.deleteOne({_id: id});

  res.send('info deleted \n');
});

app.delete('/info', async (req, res) => {
  const info = await Info.remove();

  res.send('infos deleted \n');
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
