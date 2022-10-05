/* Replace with your SQL commands */
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    location VARCHAR(50)
);

INSERT INTO companies (name, location) 
VALUES
    ('PayLoad', 'Kano'),
    ('Opay', 'Abuja'),
    ('Kuda', 'Baraje'),
    ('InterSwitch', 'Imo');