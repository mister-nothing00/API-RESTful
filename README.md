# API RESTful per la Gestione di Corsi Universitari

Questo progetto consiste in una completa API RESTful per la gestione di corsi universitari, tipologie di corsi e atenei. L'API permette l'inserimento, modifica e cancellazione di corsi e atenei, nonché l'associazione di corsi a più atenei.

## Tecnologie Utilizzate

- 🟢 **Node.js**: Ambiente di esecuzione per JavaScript sul server.
- ⚙️ **Express**: Framework web per costruire le API.
- 🗄️ **MySQL**: Sistema di gestione di database relazionali per l'archiviazione dei dati.
- 📊 **MariaDB**: Versione del database compatibile con MySQL.
- 🔒 **SQL Prepared Statements**: Per prevenire attacchi di SQL Injection.
- 🛠️ **Postman**: Strumento per testare le API.

## Funzionalità delle API

Le API implementano le seguenti funzionalità:

- ➕ Inserimento, modifica e cancellazione di tipologie di corso.
- ➕ Inserimento, modifica e cancellazione di corsi.
- ➕ Inserimento, modifica e cancellazione di atenei.
- 🔗 Associazione di corsi a più atenei.
- 📑 Visualizzazione di tutti i corsi e atenei, con possibilità di filtro per nome del corso e tipologia.

## Istruzioni per l'uso

1. 🛠️ Clona il repository dal seguente link: https://github.com/mister-nothing00/API-RESTful.git
2. 📦 Assicurati di avere Node.js e MySQL installati sul tuo sistema.
3. 📜 Esegui `npm install` per installare le dipendenze del progetto.
4. 🗃️ Configura il database MySQL con il file `migrations.sql` per creare la struttura delle tabelle.
5. 🚀 Avvia il server con il comando `node app.js`.
6. 🛠️ Usa Postman per testare le API secondo la documentazione.
