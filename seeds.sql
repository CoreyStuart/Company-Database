INSERT INTO departments (departments.dept_name)
VALUES 
("Bartenders"),
("Barbacks"),
("Bottle Service"),
("Security"),
("Bussers");

INSERT INTO roles (title, salary, department_id)
VALUES
('Main Bar Bartender', 20000, 1),
('Varsity Bartender', 20000, 1),
('OneOne Bartender', 20000, 1),
('Rodeo Bartender', 20000, 1),
('Varsity Barback', 25000, 2),
('OneOne Barback', 25000, 2),
('Rodeo Barback', 25000, 2),
('Lead Bottle Girl', 20000, 3), 
('Bottle Girl', 20000, 3),
('Door Security', 35000, 4),
('Inside Security', 30000, 4),
('Varsity Busser', 25000, 5),
('OneOne Busser', 25000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Haley', 'Felix', 1, 0),
('Dylan', 'OConnor', 2, 4),
('Koryn', 'Smith', 3, 0),
('Max', 'Doolittle', 4, 0),
('Dayton', 'Rankin', 5, 0);