const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Inserisci una nuova tipologia di corso
router.post('/', async (req, res) => {
    const { nome_tipologia } = req.body;
    try {
        const [result] = await db.execute('INSERT INTO tipologia_corso (nome_tipologia) VALUES (?)', [nome_tipologia]);
        console.log(`Tipologia di corso inserita: ${nome_tipologia} con ID: ${result.insertId}`);
        res.status(201).json({ id: result.insertId, nome_tipologia });
    } catch (error) {
        console.error('Errore durante l\'inserimento della tipologia di corso:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

// Modifica una tipologia di corso
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_tipologia } = req.body;
    try {
        const [result] = await db.execute('UPDATE tipologia_corso SET nome_tipologia = ? WHERE id = ?', [nome_tipologia, id]);
        if (result.affectedRows) {
            console.log(`Tipologia di corso aggiornata: ${nome_tipologia} con ID: ${id}`);
            res.sendStatus(200);
        } else {
            console.warn(`Nessuna tipologia trovata con ID: ${id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Errore durante l\'aggiornamento della tipologia di corso:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

// Elimina una tipologia di corso
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM tipologia_corso WHERE id = ?', [id]);
        if (result.affectedRows) {
            console.log(`Tipologia di corso eliminata con ID: ${id}`);
            res.sendStatus(200);
        } else {
            console.warn(`Nessuna tipologia trovata con ID: ${id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Errore durante l\'eliminazione della tipologia di corso:', error);
        res.status(500).json({ error: 'Errore nel server' });
    }
});

module.exports = router;
