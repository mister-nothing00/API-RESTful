const db = require('../db/connection');

class CourseTypeController {
    static async createCourseType(req, res) {
        const { type_name } = req.body;
        try {
            const [result] = await db.execute('INSERT INTO course_type (name) VALUES (?)', [type_name]);
            console.log(`Course type added: ${type_name} with ID: ${result.insertId}`);
            res.status(201).json({ id: result.insertId, type_name });
        } catch (error) {
            console.error('Error adding course type:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async updateCourseType(req, res) {
        const { id } = req.params;
        const { type_name } = req.body;
        try {
            const [result] = await db.execute('UPDATE course_type SET name = ? WHERE id = ?', [type_name, id]);
            if (result.affectedRows) {
                console.log(`Course type updated: ${type_name} with ID: ${id}`);
                res.sendStatus(200);
            } else {
                console.warn(`No course type found with ID: ${id}`);
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error updating course type:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async deleteCourseType(req, res) {
        const { id } = req.params;
        try {
            const [result] = await db.execute('DELETE FROM course_type WHERE id = ?', [id]);
            if (result.affectedRows) {
                console.log(`Course type deleted with ID: ${id}`);
                res.sendStatus(200);
            } else {
                console.warn(`No course type found with ID: ${id}`);
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error deleting course type:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = CourseTypeController;