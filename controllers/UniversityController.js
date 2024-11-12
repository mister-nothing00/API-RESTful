const db = require('../db/connection');

class UniversityController {
    static async createUniversity(req, res) {
        const { university_name } = req.body;
        try {
            const [result] = await db.execute('INSERT INTO university (name) VALUES (?)', [university_name]);
            console.log(`University added: ${university_name} with ID: ${result.insertId}`);
            res.status(201).json({ id: result.insertId, university_name });
        } catch (error) {
            console.error('Error adding university:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async updateUniversity(req, res) {
        const { id } = req.params;
        const { university_name } = req.body;
        try {
            const [result] = await db.execute('UPDATE university SET name = ? WHERE id = ?', [university_name, id]);
            if (result.affectedRows) {
                console.log(`University updated: ${university_name} with ID: ${id}`);
                res.sendStatus(200);
            } else {
                console.warn(`No university found with ID: ${id}`);
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error updating university:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async deleteUniversity(req, res) {
        const { id } = req.params;
        try {
            const [result] = await db.execute('DELETE FROM university WHERE id = ?', [id]);
            if (result.affectedRows) {
                console.log(`University deleted with ID: ${id}`);
                res.sendStatus(200);
            } else {
                console.warn(`No university found with ID: ${id}`);
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error deleting university:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = UniversityController;