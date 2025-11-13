using { ust.HanveshithReddy.Juvventhula.DB as DB } from '../db/schema';

define service EmployeeService {
    entity EmployeeSet as projection on DB.Employee;
}