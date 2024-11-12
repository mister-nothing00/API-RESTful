-- Creazione del database
CREATE DATABASE IF NOT EXISTS courses_db;
USE courses_db;

-- Tabella delle tipologie di corso
CREATE TABLE IF NOT EXISTS course_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Tabella dei corsi
CREATE TABLE IF NOT EXISTS course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES course_type(id) ON DELETE SET NULL
);

-- Tabella degli atenei
CREATE TABLE IF NOT EXISTS university (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Tabella di relazione tra corsi e atenei (molti-a-molti)
CREATE TABLE IF NOT EXISTS course_university (
    course_id INT,
    university_id INT,
    PRIMARY KEY (course_id, university_id),
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (university_id) REFERENCES university(id) ON DELETE CASCADE
);