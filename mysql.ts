import express, { Request, Response } from 'express';
import * as mysql from 'mysql2';
import { Connection, QueryError, OkPacket, FieldPacket } from 'mysql2';

const app = express();
const connection: Connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'abdullah@123',
  database: 'student',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('abdullah@123')
  }
});

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, This is my First Express JS API program');
});

app.get('/students', (_req: Request, res: Response) => {
  const sql = 'SELECT * FROM student_data';
  connection.query(sql, (err: QueryError | null, result: any) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(result);
  });
});

app.get('/students/:Roll_no', (req: Request, res: Response) => {
  const studentRollNo = req.params.Roll_no;
  const sql = 'SELECT * FROM student_data WHERE Roll_no = ?';
  connection.query(sql, [studentRollNo], (err: QueryError | null, result: any) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(result[0]);
  });
});

app.post('/students', (req: Request, res: Response) => {
  const { name, age, Email, Class, Student_name, Father_name, Address } = req.body;
  const sql = 'INSERT INTO student_data (name, Age, Email, Class, Student_name, Father_name, Address) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, age, Email, Class, Student_name, Father_name, Address], (err: QueryError | null, _result: OkPacket, _fields: FieldPacket[]) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Student added successfully' });
  });
});

app.put('/students/:Roll_no', (req: Request, res: Response) => {
  const studentRollNo = req.params.Roll_no;
  const { name, age } = req.body;
  const sql = 'UPDATE student_data SET Student_name = ?, Age = ? WHERE Roll_no = ?';
  connection.query(sql, [name, age, studentRollNo], (err: QueryError | null, _result: OkPacket, _fields: FieldPacket[]) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Student updated successfully' });
  });
});

app.delete('/students/:Roll_no', (req: Request, res: Response) => {
  const studentRollNo = req.params.Roll_no;
  const sql = 'DELETE FROM student_data WHERE Roll_no = ?';
  connection.query(sql, [studentRollNo], (err: QueryError | null, _result: OkPacket, _fields: FieldPacket[]) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Student deleted successfully' });
  });
});

const port: number = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
