-- Creazione del database
CREATE DATABASE IF NOT EXISTS corsi_db;
USE corsi_db;

-- Tabella delle tipologie di corso
CREATE TABLE IF NOT EXISTS tipologia_corso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_tipologia VARCHAR(100) UNIQUE NOT NULL
);

-- Tabella dei corsi
CREATE TABLE IF NOT EXISTS corso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_corso VARCHAR(100) NOT NULL,
    tipologia_id INT,
    FOREIGN KEY (tipologia_id) REFERENCES tipologia_corso(id) ON DELETE SET NULL
);

-- Tabella degli atenei
CREATE TABLE IF NOT EXISTS ateneo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_ateneo VARCHAR(100) UNIQUE NOT NULL
);

-- Tabella di relazione tra corsi e atenei (molti-a-molti)
CREATE TABLE IF NOT EXISTS corso_ateneo (
    corso_id INT,
    ateneo_id INT,
    PRIMARY KEY (corso_id, ateneo_id),
    FOREIGN KEY (corso_id) REFERENCES corso(id) ON DELETE CASCADE,
    FOREIGN KEY (ateneo_id) REFERENCES ateneo(id) ON DELETE CASCADE
);
