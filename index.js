const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const { db, Task, Notes } = require('./db')

// Creating the Express server
const app = express();
const PORT =process.env.PORT || 4000;
// Server configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Starting the server
app.listen(PORT, () => {
  console.log("Server started (http://localhost:3000/) !");
});
// GET /
app.get("/", (req, res) => {
  const sql = "SELECT * FROM Task ORDER BY Title";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("index", { model: rows });
  });
});
// GET /
app.get("/index", (req, res) => {
  const sql = "SELECT * FROM Task ORDER BY Title";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("index", { model: rows });
  });
});

// GET /create
app.get("/create", (req, res) => {
  res.render("create", { model: {} });
});

// POST /create
app.post("/create", (req, res) => {
  const sql = "INSERT INTO Task (Title, Description, DueDate , Status, Priority) VALUES (?, ?, ?, ?, ?)";
  const row = [req.body.Title, req.body.Description, req.body.DueDate, req.body.Status, req.body.Priority];
  db.run(sql, row, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/index");
  });
});

// GET /edit/5
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Task WHERE Task_ID = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("edit", { model: row });
  });
});

// POST /edit/5
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const task = [req.body.Title, req.body.Description, req.body.DueDate, req.body.Status, req.body.Priority, id];
  const sql = "UPDATE Task SET Title = ?, Description = ?, DueDate = ? , Status = ?,Priority=? WHERE (Task_ID = ?)";
  db.run(sql, task, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/index");
  });
});

// GET /addNote/5
app.get("/addNote/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Task WHERE Task_ID = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("addNote", { model: row });
  });
});
//post/addNote/
app.post("/addNote/:id", (req, res) => {
  const id = req.params.id;
  const sql = "INSERT INTO Notes (Task_ID,Note) VALUES (?, ?)";
  const row = [id, req.body.Note];
  db.run(sql, row, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/index");
  });
});

// GET /showNotes
app.get("/showNote/:id", (req, res) => {
  const id = req.params.id;
  const sql = "select * from Task INNER JOIN Notes on Notes.Task_ID=Task.Task_ID WHERE Task.Task_ID= ?";
  db.all(sql, id, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("showNote", { model: rows });
  });
});

//GET/StatusSort
app.get("/StatusSort", (req, res) => {
  const sql = "SELECT * FROM Task ORDER BY Status DESC"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.render("index", { model: rows });
  })
})
//GET /PrioritySort
app.get("/PrioritySort", (req, res) => {
  const sql = "select * from Task ORDER BY CASE PRIORITY WHEN 'low' THEN 1 WHEN 'medium'THEN 2 WHEN 'high' THEN 3 END DESC"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.render("index", { model: rows });
  })
})

//GET/DateSort
app.get("/DateSort", (req, res) => {
  const sql = "select * from task ORDER by DueDate ASC"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.render("index", { model: rows });
  })
})