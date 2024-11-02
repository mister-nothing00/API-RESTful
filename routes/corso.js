const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Inserisci un nuovo corso
router.post('/', async (req, res) => {
    const { nome_corso, tipologia_id } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO corso (nome_corso, tipologia_id) VALUES (?, ?)', [nome_corso, tipologia_id]);
        console.log(`Corso inserito: ${nome_corso} con ID: ${result.insertId}`);
        res.status(201).json({ id: result.insertId, nome_corso, tipologia_id });
    } catch (error) {
        console.error('Errore durante l\'inserimento del corso:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

// Modifica un corso
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_corso, tipologia_id } = req.body;
    try {
        const [result] = await db.execute('UPDATE corso SET nome_corso = ?, tipologia_id = ? WHERE id = ?', [nome_corso, tipologia_id, id]);
        if (result.affectedRows) {
            console.log(`Corso aggiornato: ${nome_corso} con ID: ${id}`);
            res.sendStatus(200);
        } else {
            console.warn(`Nessun corso trovato con ID: ${id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Errore durante l\'aggiornamento del corso:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

// Elimina un corso
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM corso WHERE id = ?', [id]);
        if (result.affectedRows) {
            console.log(`Corso eliminato con ID: ${id}`);
            res.sendStatus(200);
        } else {
            console.warn(`Nessun corso trovato con ID: ${id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Errore durante l\'eliminazione del corso:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

module.exports = router;
