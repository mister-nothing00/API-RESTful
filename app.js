const express = require('express');
const tipologiaRoutes = require('./routes/tipologia');
const corsoRoutes = require('./routes/corso');
const ateneoRoutes = require('./routes/ateneo');

const app = express();
app.use(express.json());

app.use('/api/tipologie', tipologiaRoutes);
app.use('/api/corsi', corsoRoutes);
app.use('/api/atenei', ateneoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
