require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Свързване с базата данни
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Проверка на връзката с базата данни
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Примерен маршрут за тест
app.get('/api/test', (req, res) => {
    res.send('Test route is working!');
});


// Начална страница
app.get('/', (req, res) => {
    res.send('SMDPRO API is running!');
});

// Слушане на порт 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// API за проекти
// Вземане на всички проекти
app.get('/api/projects', (req, res) => {
    const query = 'SELECT * FROM Projects';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Създаване на нов проект
app.post('/api/project', (req, res) => {
    const { name, revision, version, description } = req.body;
    const query = 'INSERT INTO Projects (name, revision, version, description) VALUES (?, ?, ?, ?)';
    db.query(query, [name, revision, version, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Project created', projectId: result.insertId });
    });
});

// Вземане на проект по ID
app.get('/api/project/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Projects WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Project not found' });
        res.json(result[0]);
    });
});

// Обновяване на проект
app.put('/api/project/:id', (req, res) => {
    const { id } = req.params;
    const { name, revision, version, description } = req.body;
    const query = 'UPDATE Projects SET name = ?, revision = ?, version = ?, description = ? WHERE id = ?';
    db.query(query, [name, revision, version, description, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project updated' });
    });
});

// Изтриване на проект
app.delete('/api/project/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Projects WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    });
});
// API за проекти - край

// API за материали
// Вземане на всички материали
app.get('/api/materials', (req, res) => {
    const query = 'SELECT * FROM Materials';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Вземане на материал по ID
app.get('/api/material/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Materials WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Material not found' });
        res.json(result[0]);
    });
});

// Създаване на нов материал
app.post('/api/material', (req, res) => {
    const { part_number, name, description, barcode, package_type, moisture_sensitive } = req.body;
    const query = 'INSERT INTO Materials (part_number, name, description, barcode, package_type, moisture_sensitive) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [part_number, name, description, barcode, package_type, moisture_sensitive], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Material created', materialId: result.insertId });
    });
});

// Обновяване на материал
app.put('/api/material/:id', (req, res) => {
    const { id } = req.params;
    const { part_number, name, description, barcode, package_type, moisture_sensitive } = req.body;
    const query = 'UPDATE Materials SET part_number = ?, name = ?, description = ?, barcode = ?, package_type = ?, moisture_sensitive = ? WHERE id = ?';
    db.query(query, [part_number, name, description, barcode, package_type, moisture_sensitive, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Material not found' });
        res.json({ message: 'Material updated' });
    });
});

// Изтриване на материал
app.delete('/api/material/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Materials WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Material not found' });
        res.json({ message: 'Material deleted' });
    });
});

// API за материали - край

// API за BOM
// Вземане на всички BOM
app.get('/api/bom', (req, res) => {
    const query = 'SELECT * FROM BOM';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Вземане на BOM по ID
app.get('/api/bom/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM BOM WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'BOM not found' });
        res.json(result[0]);
    });
});

// Създаване на нов BOM
app.post('/api/bom', (req, res) => {
    const { project_id, panel_type, multiplication, material_id, quantity } = req.body;
    const query = 'INSERT INTO BOM (project_id, panel_type, multiplication, material_id, quantity) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [project_id, panel_type, multiplication, material_id, quantity], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'BOM created', bomId: result.insertId });
    });
});

// Обновяване на BOM
app.put('/api/bom/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, panel_type, multiplication, material_id, quantity } = req.body;
    const query = 'UPDATE BOM SET project_id = ?, panel_type = ?, multiplication = ?, material_id = ?, quantity = ? WHERE id = ?';
    db.query(query, [project_id, panel_type, multiplication, material_id, quantity, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'BOM not found' });
        res.json({ message: 'BOM updated' });
    });
});


// Изтриване на BOM
app.delete('/api/bom/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM BOM WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'BOM not found' });
        res.json({ message: 'BOM deleted' });
    });
});

// API за BOM - край

// API за Панели
// Вземане на всички панели
app.get('/api/panels', (req, res) => {
    const query = 'SELECT * FROM Panels';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Вземане на панел по ID
app.get('/api/panel/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Panels WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Panel not found' });
        res.json(result[0]);
    });
});

// Създаване на нов панел
app.post('/api/panel', (req, res) => {
    const { project_id, part_number, multiplication, stencil_position } = req.body;
    const query = 'INSERT INTO Panels (project_id, part_number, multiplication, stencil_position) VALUES (?, ?, ?, ?)';
    db.query(query, [project_id, part_number, multiplication, stencil_position], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Panel created', panelId: result.insertId });
    });
});

// Обновяване на панел
app.put('/api/panel/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, part_number, multiplication, stencil_position } = req.body;
    const query = 'UPDATE Panels SET project_id = ?, part_number = ?, multiplication = ?, stencil_position = ? WHERE id = ?';
    db.query(query, [project_id, part_number, multiplication, stencil_position, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Panel not found' });
        res.json({ message: 'Panel updated' });
    });
});


// Изтриване на панел
app.delete('/api/panel/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Panels WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Panel not found' });
        res.json({ message: 'Panel deleted' });
    });
});

// API за Панели - край
