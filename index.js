const express = require('express');
const app = express();

// middleware for allwing parsing of json object in request
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' }
];

app.get('/', (req, res) => {
    res.send('Hello, Node & Express!!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given id not found');  
    res.send(course);
    res.send(req.params.id);
})

app.get('/api/courses/:id', (req, res) => {
    res.send(req.query);
})

// post new course
app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        // 400 bad request
        res.status(400).send('Name is required and length must be more than 3 characters.');
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


// PORT from environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
