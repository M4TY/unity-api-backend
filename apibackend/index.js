const express = require("express");
const req = require("express/lib/request");
const Note = require("./Note");

let port = 2222;

const app = express();

const mongoose = require("mongoose");
const { response } = require("express");

const url = `mongodb+srv://maty:maty@cluster0.nyek6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.get("/note/:id", (req, res) => {
  run(req.params.id);
});

app.get("/notes", (req, res) => {
  let response = getAll().then((value) => {
    res.send(value);
  });
});

async function run(para) {
  const newNote = await Note.create({
    content: para,
    date: new Date().toLocaleString("cs-CZ"),
  });
  await newNote.save();
  console.log(newNote);
}

async function getAll() {
  let filter = {};
  let all = await Note.find(filter);
  return all;
}

app.listen(port);
