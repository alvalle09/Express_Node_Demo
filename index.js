const Joi = require('joi');
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
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
    console.log(courses);
});

app.put('/api/courses/:id', (req, res) => {
    // look up course    
    // If course doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given id not found');  

    const result = validateCouse(req.body);

    if (result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // Update course
    courses.name = req.body.name;
    
    // Return updated course 
    res.send(course);

    //if not ex
});

function validateCourse(course) {

    // If invalid, return 404 - Bad request
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}

// PORT from environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
