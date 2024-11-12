const db = require('../db/connection');

class CourseController {
    static async getCourses(req, res) {
        const { course_name, type_id } = req.query;
        let query = `
            SELECT c.id AS course_id, c.name AS course_name, t.id AS type_id, t.name AS type_name, 
                   GROUP_CONCAT(u.id) AS university_ids, GROUP_CONCAT(u.name) AS university_names
            FROM course c
            LEFT JOIN course_type t ON c.type_id = t.id
            LEFT JOIN course_university cu ON c.id = cu.course_id
            LEFT JOIN university u ON cu.university_id = u.id
            GROUP BY c.id
        `;

        const params = [];
        if (course_name) {
            query += ' HAVING course_name LIKE ?';
            params.push(`%${course_name}%`);
        }
        if (type_id) {
            query += (course_name ? ' AND' : ' WHERE') + ' type_id = ?';
            params.push(type_id);
        }

        try {
            const [results] = await db.execute(query, params);
            res.status(200).json(results);
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async createCourse(req, res) {
        const { course_name, type_id } = req.body;
        try {
            const [result] = await db.execute ('INSERT INTO course (name, type_id) VALUES (?, ?)', [course_name, type_id]);
            console.log(`Course added: ${course_name} with ID: ${result.insertId}`);
            res.status(201).json({ id: result.insertId, course_name, type_id });
        } catch (error) {
            console.error('Error adding course:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async updateCourse(req, res) {
        const { id } = req.params;
        const { course_name, type_id } = req.body;
        try {
            const [result] = await db.execute('UPDATE course SET name = ?, type_id = ? WHERE id = ?', [course_name, type_id, id]);
            if (result.affectedRows) {
                console.log(`Course updated: ${course_name} with ID: ${id}`);
                res.sendStatus(200);
            } else {
                console.warn(`No course found with ID: ${id}`);
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async deleteCourse(req, res) {
        const { id } = req.params;
        try {
            const [result] = await db.execute('DELETE FROM course WHERE id = ?', [id]);
            if (result.affectedRows) {
                console.log(`Course deleted with ID: ${id}`);
                res.sendStatus(200);
            } else {
                console.warn(`No course found with ID: ${id}`);
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = CourseController;