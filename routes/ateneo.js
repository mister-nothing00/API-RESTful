const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Inserisci un nuovo ateneo
router.post('/', async (req, res) => {
    const { nome_ateneo } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO ateneo (nome_ateneo) VALUES (?)', [nome_ateneo]);
        console.log(`Ateneo inserito: ${nome_ateneo} con ID: ${result.insertId}`);
        res.status(201).json({ id: result.insertId, nome_ateneo });
    } catch (error) {
        console.error('Errore durante l\'inserimento dell\'ateneo:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

// Modifica un ateneo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_ateneo } = req.body;
    try {
        const [result] = await db.execute('UPDATE ateneo SET nome_ateneo = ? WHERE id = ?', [nome_ateneo, id]);
        if (result.affectedRows) {
            console.log(`Ateneo aggiornato: ${nome_ateneo} con ID: ${id}`);
            res.sendStatus(200);
        } else {
            console.warn(`Nessun ateneo trovato con ID: ${id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Errore durante l\'aggiornamento dell\'ateneo:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

// Elimina un ateneo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM ateneo WHERE id = ?', [id]);
        if (result.affectedRows) {
            console.log(`Ateneo eliminato con ID: ${id}`);
            res.sendStatus(200);
        } else {
            console.warn(`Nessun ateneo trovato con ID: ${id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Errore durante l\'eliminazione dell\'ateneo:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

module.exports = router;
