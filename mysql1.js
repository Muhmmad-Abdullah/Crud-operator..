const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'abdullah@123',
  database: 'student',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('abdullah@123')
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

app.use(express.json()); // Parse JSON requests

app.get("/", (req, res) => {
  res.send("Hello This is my First Express js api program");
});

// GET all students
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM student_data';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

// GET a specific student by ID
app.get('/students/:Roll_no', (req, res) => {
  const studentRollNo = req.params.Roll_no;
  const sql = 'SELECT * FROM student_data WHERE Roll_no = ?';
  connection.query(sql, [studentRollNo], (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result[0]);
  });
});

// POST a new student
app.post('/studentspost/:Roll_no', (req, res) => {
  const { name, age, Email, Class, Student_name, Father_name, Address } = req.body;
  const sql = 'INSERT INTO student_data (name, Age, Email, Class, Student_name, Father_name, Address) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, age, Email, Class, Student_name, Father_name, Address], (err) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Student added successfully' });
  });
});

// PUT (Update) a student's information
app.put('/studentsput/:Roll_no', (req, res) => {
  const studentRollNo = req.params.Roll_no;
  const { name, age } = req.body;
  const sql = 'UPDATE student_data SET Student_name = ?, Age = ? WHERE Roll_no = ?';
  connection.query(sql, [name, age, studentRollNo], (err) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Student updated successfully' });
  });
});

// DELETE a student
app.delete('/studentsdelete/:Roll_no', (req, res) => {
  const studentRollNo = req.params.Roll_no;
  const sql = 'DELETE FROM student_data WHERE Roll_no = ?';
  connection.query(sql, [studentRollNo], (err) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Student deleted successfully' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

