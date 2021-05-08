
const { request } = require("express");
const express = require("express");
const { Cat } = require("./models");
const app = express();

app.use(express.json());

app.post("/cats", (req, res) => {
  Cat.create(req.body)
    .then((cat) => res.status(201).json(cat))
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/cats', (req, res) => {
  Cat.findAll({where: req.query})
    .then((cat)=> res.status(201).json(cat))
    .catch((err) => {
    res.status(400).send(err);
    });
});

app.get('/cats/:catId', (req, res) => {
  Cat.findByPk(req.params.catId)
  .then((cat) => res.status(201).json(cat))
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.patch('/feed/:catId', (req, res) => {
  Cat.update(
    { lastFed: new Date() }, 
    { where: { id: req.params.catId }})
  .then((cat) => res.status(201).json(cat))
  .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete('/cats/:catId', (req, res) => {
  Cat.destroy(
    { where: {id : req.params.catId}})
  .then((catsDeleted) => res.status(202).json(catsDeleted))
  .catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = app;