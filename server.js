// DEPENDENCIES

const mysql = require('mysql');
const inquirer = require('inquirer');

// CONNECTION

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'BCLarryWilcox74!',
    database: 'employee_cms_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('working');

});

// GLOBAL VARIABLES 



// GLOBAL FUNCTIONS

function initialize() {
    inquirer.
        prompt([
            {
                name: 'action',
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'Add new Department.',
                    'Add a role.',
                    'Add an employee.',
                    'View departments.',
                    'View roles.',
                    'View employees.',
                    'Update employees.',
                    'Exit Program.'
                ]
            }
        ]).then(answer => {
            console.log(answer)
            switch (answer.action) {
                case 'Add new Department.':
                    // console.log('this works');
                    addADepartment();
                    break;
                case 'View departments.':
                    // console.log('this works as well')
                    viewDepartment();
                    break;
                case 'View roles.':
                    viewRoles();
                    break;
                case 'Add a role.':
                    addRole();
                    break;
                case 'Add an employee.':
                    addEmployee();
                    break;
                case 'View Employees.':
                    viewEmployees();
                    break;
                case 'Update Employees.':
                    updateEmployee();
                    break;
                case 'Exit Program.':
                    break;
            }
        })
}

// GLOBAL FUNCTIONS

function addADepartment() {
    inquirer.prompt(
        [{
            name: 'departmentName',
            type: 'input',
            message: "What department are we adding?"
        }]
    ).then(
        department => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: department.departmentName
                },
                err => {
                    if (err) throw err;
                    console.log('Department added');
                    initialize();
                }
            )
        }
    )
}

function addRole() {

    let departments = []

    connection.query(
        'SELECT name FROM department',
        (err, result) => {
            if (err) throw err;
            // console.log('Finding all departments')
            // console.log(result)
            // for (let i =0; i<result.length; i++) {
            //     departments.push(result[i].name)
            // }
            departments = result.map(e => e.name)
            // console.log(departments);
            inquirer.
                prompt(
                    [{
                        name: 'roleName',
                        type: 'input',
                        message: 'What role are we adding?'
                    },
                    {
                        name: 'roleSalary',
                        type: 'input',
                        message: 'What is the salary of this role?'
                    },
                    {
                        name: 'department_name',
                        type: 'list',
                        choices: departments,
                        message: 'What department is this role in?'
                    }]
                ).then(
                    answers => {
                        const department = answers.department_name;
                        connection.query(
                            'SELECT id FROM department WHERE ?',
                            {
                                name: department
                            },
                            (err, dep) => {
                                // console.log(dep)
                                if (err) throw err;
                                connection.query(
                                    'INSERT INTO role SET ?',
                                    {
                                        title: answers.roleName,
                                        salary: answers.roleSalary,
                                        department_id: dep[0].id
                                    }
                                )
                                initialize();
                            }
                        )
                    }
                )
        }
    )
};

function viewDepartment() {

};

function viewRoles() {

};

// SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
// FROM Orders
// INNER JOIN Customers
// ON Orders.CustomerID=Customers.CustomerID;


function addEmployee() {

    let roles = [];

    let departments = [];

    let employees = [];

    connection.query(
        'SELECT name FROM department',
        (err, result) => {
            if (err) throw err;
            // console.log('Finding all departments')
            // console.log(result)
            // for (let i =0; i<result.length; i++) {
            //     departments.push(result[i].name)
            // }
            departments = result.map(e => e.name)
            // console.log(departments);

            inquirer.prompt(
                [{
                    message: 'First name?',
                    type: 'input',
                    name: 'firstName'
                },
                {
                    message: 'Last name?',
                    type: 'input',
                    name: 'lastName'
                },
                {
                    message: "What department is this person in?",
                    type: 'list',
                    name: 'employeeDepartment',
                    choices: departments
                },
                ]).then(answersDpt => {
                    const department = answersDpt.employeeDepartment;

                    connection.query(
                        
                        'SELECT id FROM department WHERE ?',
                        {
                            name: department
                        },
                        (err,depId) => {
                            if (err) throw err;
                            console.log('WE ARE GETTING HERE')
                            console.log(depId);

                            connection.query(

                            )
                        }
                    )



                    connection.query(
                        'SELECT role.title, role.id, ? FROM role INNER JOIN role ON department.id=role.department_id',
                        {
                            name: department
                        },
                        (err, result) => {
                            if (err) throw err;

                            // console.log(result)

                        }
                    )
                }



                    // answers => {
                    //     const department = answers.department_name;
                    //     connection.query(
                    //         'SELECT id FROM department WHERE ?',
                    //         {
                    //             name: department
                    //         },
                    //         (err, dep) => {
                    //             console.log(dep)
                    //             if (err) throw err;
                    //             connection.query(
                    //                 'INSERT INTO role SET ?',
                    //                 {
                    //                     title: answers.roleName,
                    //                     salary: answers.roleSalary,
                    //                     department_id: dep[0].id
                    //                 }
                    //             )
                    //         }
                    //     )
                    // }
                )

        })




    connection.query(
        'SELECT role.id, role.title, employee.last_name FROM role INNER JOIN employee ON role.id=employee.role_id',
        (err, result) => {
            if (err) throw err;

            // console.log(result)

            roles = result.map(e => e.title)



            // inquirer.
            //     prompt(
            //         [{
            //             message: 'First name?',
            //             type: 'input',
            //             name: 'firstName'
            //         },
            //         {
            //             message: 'Last name?',
            //             type: 'input',
            //             name: 'lastName'
            //         },
            //         {
            //             message: "What department is this person in?",
            //             type: 'list',
            //             name: 'employeeDepartment',
            //             choices: departments
            //         },
            //         {
            //             message: "What is this person's role?",
            //             type: 'list',
            //             name: 'employeeRole',
            //             choices: roles
            //         },
            //         {
            //             message: "who is this person's manager?",
            //             type: 'list',
            //             name: 'employeeMgr',
            //             choices: managers
            //         }]
            //     )
        }
    )
};

function viewEmployees() {

};

function updateEmployee() {

};

// BEGIN THE APPLICATION 

initialize();

