const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const db_name = path.join(__dirname, "data", "todos.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'todos.db'");
});

// Creating the task table1(task table)
const sql_create = `CREATE TABLE IF NOT EXISTS Task (
  Task_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title VARCHAR(100) NOT NULL,
  Description VARCHAR(100),
  DueDate DATE NOT NULL,
  Status VARCHAR(20),
  Priority VARCHAR(20)
);`;
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Task' table");
  // Database seeding
  const sql_insert = `INSERT INTO Task (Task_ID, Title, Description, DueDate,Status,Priority) VALUES
  (1, 'task_1', 'HTML', '2019-04-17' ,'completed','high'),
  (2, 'task_2', 'CSS', '2020-04-17','incomplete','medium');`;
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation 2 task");
  });
});

// Creating the task table2(Notes table)
const sql_note_create = `CREATE TABLE IF NOT EXISTS Notes (
  Note_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Task_ID INTEGER ,
  Note TEXT,
  FOREIGN KEY (Task_ID) REFERENCES Task (Task_ID)
);`;
db.run(sql_note_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Notes' table");
  // Database seeding
  const sql_note_insert = `INSERT INTO Notes (Note_ID, Task_ID, Note) VALUES
  (1, 1, 'this is markup language'),
  (2, '1', 'HTML elements are represented by <> tags')`;
  db.run(sql_note_insert, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation 2 Notes");
  });
});
module.exports = {
    db
}