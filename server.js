const inquirer = require('inquirer');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Oregon21',
    database: 'employee_db'
  },
  console.log(`Connected to the books_db database.`)
);

connection.connect(function(err){

    if (err) throw err;

    mainPrompt();

});

function mainPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'select',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee', 'EXIT'],
    }])
    .then(function (input) {
        if(input.select === 'view all departments') {
            viewDep();
        }
        else if (input.select === 'view all roles') {
            viewRoles();
        }
        else if (input.select === 'view all employees') {
            viewEmployees();
        }
        else if (input.select === 'add a department') {
            addDep();
        }
        else if (input.select === 'add a role') {
            addRole();
        }
        else if (input.select === 'add an employee') {
            addEmp();
        }
        else if (input.select === 'update an employee') {
            upEmp();
        }
        else {
            exit();
        };
    });
};
function viewDep() {
 
 let query = "SELECT department.dept_name AS departments FROM department;";


 connection.query(query, function(err, res) {
     
     if (err) throw err;

     console.table(res); 
     
     mainPrompt();

});
};

function viewRoles() {
    let query = "SELECT "
}

