require("dotenv").config();

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// Defines an event handler used to handle HTTP GET requests for app /root
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");

// allows express to show static content pages from the dist folder we coppied
app.use(express.static("dist"));
// json parser
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  // the next function yields control to the next middleware
  next();
};
app.use(requestLogger);
// allows cross resource sharing
app.use(cors());

// const mongoose = require("mongoose");

// const password = process.argv[2];

// const url = `mongodb+srv://fullstack:${password}@cluster0.9qjac5i.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);

// noteSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;
  // console.log(body);
  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  console.log(note);
  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unkown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
