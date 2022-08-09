const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

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
  console.log(`Connected to the employees_db database.`)
);

db.connect(function(err){

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
 
 let query = "SELECT departments.dept_name AS departments FROM departments;";


 db.query(query, function(err, res) {
     
     if (err) throw err;
     console.table(res); 
     
     mainPrompt();

});
};

function viewRoles() {
    db.query("SELECT departments.dept_name AS departments from departments", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results)

        mainPrompt();

    });

}

function viewRoles() {
    db.query("SELECT roles.title, roles.salary, departments.dept_name AS departments FROM roles INNER JOIN departments ON departments.id = roles.department_id;", (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results)

        mainPrompt();

    });

};

function viewEmployees() {
    db.query("SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name, employees.manager_id " +
    "FROM employees " +
    "JOIN roles ON roles.id = employees.role_id " +
    "JOIN departments ON roles.department_id = departments.id " +
    "ORDER BY employees.id;", (err, res) => {
        if (err) {
            console.log(err);
        }

        console.log(res); 
        
        mainPrompt();
    });
}

function addDep() {
    db.query("SELECT departments.dept_name FROM departments;", (err, res) => {
        if(err) {
            console.log(err)
        }
        else {
            inquirer.prompt([
                {
                type: 'input',
                name: "new_department",
                message: "Enter the new department you would like to create:"
                }])
                .then(function(response) {
                    db.query("INSERT INTO departments SET ?", {
                    dept_name: response.new_department}
                    )
                    mainPrompt();
                })
        }
    })
}

function addRole() {
    db.query("SELECT roles.title AS roles, roles.salary, departments.dept_name FROM roles INNER JOIN departments ON departments.id = roles.department_id;", (err, res) => {
        if(err) {
            console.log(err)
        }
        else {
            inquirer.prompt([
                {
                type: 'input',
                name: "new_title",
                message: "Enter the new role you would like to create:"
                },
            {
                type: 'list',
                name: 'new_salary',
                message: 'What is their salary?',
                choices: ['20000', '25000', '30000'],
            }])
                .then(function(response) {
                    db.query("INSERT INTO roles SET ?", {
                    title: response.new_title, salary: response.new_salary}
                    )
                    mainPrompt();
                })
        }
    })
}

function addEmp() {
    db.query("SELECT employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name, employees.manager_id " +
    "FROM employees " +
    "JOIN roles ON roles.id = employees.role_id " +
    "JOIN departments ON roles.department_id = departments.id " +
    "ORDER BY employees.id;", (err, res) => {
        if(err) {
            console.log(err)
        }
        else {
            inquirer.prompt([
                {
                type: 'input',
                name: "new_first_name",
                message: "What is their first name?"
                },
            {
                type: 'input',
                name: 'new_last_name',
                message: 'What is their last name?',
            }])
                .then(function(response) {
                    db.query("INSERT INTO employees SET ?", {
                    first_name: response.new_first_name, last_name: response.new_last_name}
                    )
                    mainPrompt();
                })
        }
    })
}

function upEmp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'up',
            message: 'Im going to be a 100% honest with you, I am not doing all this for an update feature. You have two options. Either exit this question and go back to the main prompt or see the phrase you can dedicate your life too. Your choice here',
            choices: ['Go back', 'View the words of wisdom'],
        }
    ]).then(function(input) {
        if(input.select === 'Go back') {
            mainPrompt();
        }
        else {
            wordsOfWisdom();
        }
    })
}

function wordsOfWisdom() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'chiefKeef',
            message: '******* in school telling me, always in the barber shop Chief Keef aint bout this, Chief aint bout that My boy a BD on ******* Lamron and them He, he, they say that ***** dont be putting in no work Shut the **** up, yall ****** aint know **** All yall ************* talkin about Chief Keef aint no hitter, Chief Keef aint this, Chief Keef a fake Shut the **** up, yall dont live with that ***** Yall know that ***** got caught with a ratchet Shootin at the police and **** ***** been on probation since ***** I dont know when ************, stop ***** playin him like that Them ****** savages out there If I catch another ************ talking sweet about Chief Keef Im fucking beatin they ***, Im not ******* playin no more Know them ****** roll with Lil Reese and them',
            choices: ['300', 'Gorillaz in a Coup'],
        }
    ]).then(function (input) {
        if(input.select === '300') {
            mainPrompt();
        }
        else {
            mainPrompt();
        }
    })
}

function exit() {
    db.end();

    console.log("Later nerd");
}