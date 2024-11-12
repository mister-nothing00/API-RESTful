const express = require('express');
const courseTypesRoutes = require('./routes/courseTypes.js');
const courseRoutes = require('./routes/course.js');
const universityRoutes = require('./routes/university.js');

const app = express();
app.use(express.json());

app.use('/api/course-types', courseTypesRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/universities', universityRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});