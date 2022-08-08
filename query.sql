SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept_name, roles.salary, employees.manager_id, manager.first_name, manager.last_name
AS manager
FROM employees
JOIN departments
ON employees.role_id = roles.id
JOIN departments
ON roles.department_id = departments.id
JOIN employee manager
ON manager.id = employees.manager_id;