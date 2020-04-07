DROP DATABASE IF EXISTS employee_cms_db;
CREATE DATABASE employee_cms_db;

USE employee_cms_db;

create table department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

create table role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
); 

create table employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
);


insert into employee (first_name, last_name, role_id, manager_id)
values ('Eric', 'Smith', 1, 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ('Dani', 'Smith', 2, 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ('Alan', 'Smith', 3, 1);
insert into employee (first_name, last_name, role_id, manager_id)
values ('Rich', 'Smith', 4, 2);
insert into employee (first_name, last_name, role_id, manager_id)
values ('Rich', 'Smith', 5, 2);
insert into employee (first_name, last_name, role_id, manager_id)
values ('Rich', 'Smith', 6, 2);
insert into employee (first_name, last_name, role_id, manager_id)
values ('Rich', 'Smith', 7, 3);
insert into employee (first_name, last_name, role_id, manager_id)
values ('Rich', 'Smith', 8, 3);
insert into employee (first_name, last_name, role_id, manager_id)
values ('Rich', 'Smith', 9, 3);

insert into role (title, salary, department_id)
values ('Engineering Intern', 20000, 1);
insert into role (title, salary, department_id)
values ('Engineering Specialist', 80000, 1);
insert into role (title, salary, department_id)
values ('Engineering Manager', 120000, 1);

insert into role (title, salary, department_id)
values ('Accounting Intern', 20000, 2);
insert into role (title, salary, department_id)
values ('Accounting Specialist', 80000, 2);
insert into role (title, salary, department_id)
values ('Accounting Manager', 120000, 2);

insert into role (title, salary, department_id)
values ('HR Intern', 20000, 3);
insert into role (title, salary, department_id)
values ('HR Specialist', 80000, 3);
insert into role (title, salary, department_id)
values ('HR Manager', 120000, 3);

insert into department (name)
values ('Engineering');
insert into department (name)
values ('Accounting');
insert into department (name)
values ('Human Resources');


SELECT * FROM department;

select * from employee;

select * from role;
