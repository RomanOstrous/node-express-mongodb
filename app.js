const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://RomaDB:Orr1998kv2foreva@romaclaster.omugrde.mongodb.net/RomaDB?retryWrites=true&w=majority&appName=RomaClaster';

mongoose
  .connect(db)
  .then(res => console.log('Conected to DB'))
  .catch(err => console.log(err));

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended: false}));
app.use(express.static('styles'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  Contact
    .find()
    .then(contacts => res.render(createPath('contacts'), { contacts, title }))
    .catch(er => {
      console.log(er);
      res.render(createPath('error'), {title: 'Error'})
    });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('post'), { post, title }))
    .catch(er => {
      console.log(er);
      res.render(createPath('error'), {title: 'Error'})
    });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  Post
    .find()
    .then(posts => res.render(createPath('posts'), { posts, title }))
    .catch(er => {
      console.log(er);
      res.render(createPath('error'), {title: 'Error'})
    });
});

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({title, author, text });
  post
    .save()
    .then(result => res.redirect('/posts'))
    .catch(er => {
      console.log(er);
      res.render(createPath('error'), {title: 'Error'})
    });
});

app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
