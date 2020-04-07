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
    // console.log('working');

});

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
            // console.log(answer)
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
                case 'View employees.':
                    viewEmployees();
                    break;
                case 'Update employees.':
                    updateEmployee();
                    break;
                case 'Exit Program.':
                    process.exit();
            }
        })
}

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
    
    let departments = [];
    
    connection.query(
        'SELECT * FROM department',
        (err,depResults) => {
            if (err) throw err;
            // console.log(depResults)
            departments = depResults.map(e => e.name)
            console.log('Here are the current departments:')
            for (let i= 0; i<departments.length; i++) {
                console.log(departments[i])
            }
            initialize();
        }
    )
};

function viewRoles() {

    let departmentsToSearchRoles = [];

    connection.query(
        'SELECT name, id FROM department',
        (err, result) => {
            if (err) throw err;
            // console.log(result)
            departmentsToSearchRoles = result.map(e => e.name);

            inquirer.prompt(
                [{
                    message: 'View the roles for which department?',
                    type: 'list',
                    name: 'departmentToViewRoles',
                    choices: departmentsToSearchRoles
                }]
            ).then(result => {
                const department = result.departmentToViewRoles;
                // console.log(department);
                connection.query(
                    'SELECT id FROM department WHERE ?',
                    {
                        name: department
                    },
                    (err,depId) => {
                        if (err) throw err;
                        connection.query(
                            'SELECT title FROM role WHERE department_id = ?',
                            depId[0].id,
                            (err,roles) => {
                                if (err) throw err;
                                console.log(`Here are the roles within the ${department} department:`);
                                for (let i=0; i<roles.length; i++) {
                                    console.log(roles[i].title)
                                }
                                initialize();
                            }
                        )
                    }
                )
            })
        }
    )
};

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
                        (err, depId) => {
                            if (err) throw err;
                            connection.query(
                                'select role.title, role.id FROM role WHERE role.department_id = ?',
                                depId[0].id,
                                (err, roleInfo) => {
                                    if (err) throw err;
                                    console.log(roleInfo)
                                    // roleId = roleInfo.id;
                                    // console.log(roleId)
                                    roles = roleInfo.map(e => e.title)
                                    console.log(roles);
                                    inquirer.
                                        prompt(
                                            [{
                                                name: 'employeeRole',
                                                type: 'list',
                                                message: "What is this person's role?",
                                                choices: roles
                                            }]
                                        ).then(
                                            theirRole => {
                                                // console.log(theirRole)
                                                const theirRoleTitle = theirRole.employeeRole
                                                //need to add employee to the database of employees now
                                                // console.log(theirRoleTitle)
                                                connection.query(
                                                    'SELECT id FROM role WHERE ?',
                                                    {
                                                        title: theirRoleTitle
                                                    },
                                                    (err, resultRoleId) => {
                                                        if (err) throw err;
                                                        // console.log(resultRoleId)

                                                        // still need to address the manager ID issue

                                                        connection.query(
                                                            'INSERT INTO employee SET ?',
                                                            {
                                                                first_name: answersDpt.firstName,
                                                                last_name: answersDpt.lastName,
                                                                role_id: resultRoleId[0].id,
                                                                manager_id: 9999
                                                            },
                                                            (err, results) => {
                                                                if (err) throw err;
                                                                console.log(results);
                                                                initialize();
                                                            }
                                                        )
                                                    }
                                                )


                                            }
                                        )
                                }
                            )
                        }
                    )
                }
                )

        })
};

function viewEmployees() {

    connection.query(
        'SELECT * FROM employee',
        (err,result) => {
            if (err) throw err;
            console.log('All current employees:');
            for (let i=0; i<result.length;i++) {
                console.log(`ID: ${result[i].id} | Name: ${result[i].last_name}, ${result[i].first_name}`)
            }
            initialize();
        }
    )
};

function updateEmployee() {
    
    connection.query(
        'SELECT * FROM employee',
        (err,resultEmp) => {
            if (err) throw err;
            let employeesToEdit = [];
            employeesToEdit = resultEmp.map(e=>{
                return {
                    id: e.id,
                    full_Name: `${e.first_name} ${e.last_name}`
                }
            })
            // console.log(employeesToEdit)
            inquirer.
                prompt(
                    [{
                        message: 'Which employee are we editing?',
                        name: 'editEmployee',
                        type: 'list',
                        choices: employeesToEdit.map(e=> e.full_Name)
                    }]
                ).then(
                    result => {
                        const employee = result.editEmployee;
                        // console.log(employee)
                        console.log(employee);

                        employeeObj = employeesToEdit.filter(e=> e.full_Name === employee);
                        console.log(employeeObj)
                        const employeeId = employeeObj[0].id

                        connection.query(
                            'SELECT * FROM role',
                            (err,resultDep) => {
                                if (err) throw err;
                                roles = resultDep.map(e => {
                                    return {
                                        id: e.id,
                                        roleTitle: e.title 
                                    }
                                })

                                inquirer.prompt(
                                    [{
                                        message: "What is this person's new role?",
                                        name: 'newRole',
                                        type: 'list',
                                        choices: roles.map(e=> e.roleTitle)
                                    }]
                                ).then(
                                    resultNewRole => {
                                        
                                        roleObj = roles.filter(e=> e.roleTitle === resultNewRole.newRole)
                                        
                                        
                                        console.log(roleObj)
                                        connection.query(
                                            'UPDATE employee SET ? WHERE ?',
                                            [{
                                                role_id: roleObj[0].id,
                                            },
                                            {
                                                id: employeeId
                                            }],
                                            (err,resultUpdate) => {
                                                if (err) throw err;
                                                console.log(resultUpdate);
                                            }
                                        )
                                        initialize();
                                    }
                                )
                            }
                        )
                    }
                )
        }
    )

};

// BEGIN THE APPLICATION 

initialize();

