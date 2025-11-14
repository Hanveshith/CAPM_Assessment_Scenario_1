
# Assessment Overview

Scenario-1: Creating Entity, Exposing Data and Validations


#### 1. Schema and Service

[Schema](https://github.com/Hanveshith/CAPM_Assessment_Scenario_1/blob/main/db/schema.cds), [Service](https://github.com/Hanveshith/CAPM_Assessment_Scenario_1/blob/main/srv/EmployeeService.cds)



### 2. Handler

#### 1. CREATE
```javascript
//CREATE VALIDATIONS
    this.before('CREATE', EmployeeSet, (req) => {
        //Validating employee salaryAmount < 500000
        const { salaryAmount, currencyCode } = req.data;
        console.log(salaryAmount)
        if( salaryAmount > 50000 && currencyCode !== 'USD' ) req.reject({message: "Employee's salary must be less than 50000 USD"});
    })

    this.on('CREATE', EmployeeSet, async (req) => {
        console.log(req.data)
        // const query = cds.ql `INSERT INTO ${EmployeeSet} VALUES(${req.data})`
        const res = await INSERT.into(EmployeeSet).entries(req.data);
        // cds.run(query);
        console.log("Create operation successful");
        // return {"message: Create operation successful"}
    })
```
#### 2. UPDATE
``` javascript
//UPDATE VALIDATIONS
    this.before('UPDATE', EmployeeSet, (req) => {
        const { salaryAmount, currencyCode } = req.data;
        //Validating employee salaryAmount < 500000
        if( salaryAmount > 50000 && currencyCode !== 'USD' ) req.reject({message: "Employee's salary must be less than 50000 USD"});
        //Restricting nameFist and loginName changing
        if( req.data.nameFirst || req.data.loginName ) req.reject({message: "Operation not allowed"});
    })

    this.on('UPDATE', EmployeeSet, (req) => {
        console.log("Update operation successful");
        // return {"message: Create operation successful"}
    })
```

#### 3. DELETE
``` javascript
//DELETE VALIDATION
    this.before('DELETE', EmployeeSet, async (req) => {
        //Restricting the delete of nameFirst start with 'S'
        const {ID} = req.params[0];
        console.log(ID)
        const query = cds.ql `SELECT nameFirst from ${EmployeeSet} where ID=${ID}`;
        const nameFirst = await cds.run(query);
        console.log(nameFirst)
        if(nameFirst[0].nameFirst.charAt(0) === 'S') req.reject({message: 'Cannot be deleted'});
        // await cds.run(`DELETE FROM ${EmployeeSet} where id=${ID}`);
    })
    
    this.on('DELETE', EmployeeSet, async (req) => {
        await DELETE.from(EmployeeSet).where({ID:ID})
        console.log("Delete operation successful");
    })
```


## API Reference

#### 1. Get Service Document

```http
  GET /odata/v4/employee
```
| Description                |
  | :------------------------- |
 | Service Document |

#### 2. Get Metadata

```http
  GET odata/v4/employee/$metadata
```
| Description                |
  | :------------------------- |
 | Service Document Metadata |
 
#### 3. Get EmployeeSet

```http
  GET /odata/v4/employee/EmployeeSet
```
| Description                |
  | :------------------------- |
 | GET EmployeeSet |

 
#### 4. Get Employees whose name starts with ‘S’

```http
  GET /odata/v4/employee/EmployeeSet?$filter=startswith(nameFirst,'S')
```
| Description                |
  | :------------------------- |
 | Employees whose name starts with ‘S’ |

 #### 5.    Get Top 2 Employee order by salary

```http
  GET /odata/v4/employee/EmployeeSet?$top=2&orderby=salaryAmount
```
| Description                |
  | :------------------------- |
 | Top 2 Employee order by salary |

  #### 6.   Create Employee 

```http
  POST /odata/v4/employee/EmployeeSet
```
 | Description                |
 | :------------------------- |
 | Create Employee |

#### Body 
case - 1: CREATE an employee with salary <50000 & currency code USD.
```JSON
{
  "nameFirst": "nameFirst-2553083",
  "nameMiddle": "nameMiddle-2553083",
  "nameLast": "nameLast-2553083",
  "nameInitials": "nameInitials-2553083",
  "Gender": "M",
  "Language": "83",
  "phoneNumber": "phoneNumber-2553083",
  "Email": "Email-2553083",
  "loginName": "Name-2553083",
  "Currency": {
    "code": "USD"
  },
  "salaryAmount": 3000,
  "accountNumber": "ntNumber-2553083",
  "bankId": "-2553083",
  "bankName": "bankName-2553083"
}
```

case - 2:	CREATE an employee with salary > 50000 & currency code USD.
```JSON
{
  "nameFirst": "nameFirst-2553083",
  "nameMiddle": "nameMiddle-2553083",
  "nameLast": "nameLast-2553083",
  "nameInitials": "nameInitials-2553083",
  "Gender": "M",
  "Language": "83",
  "phoneNumber": "phoneNumber-2553083",
  "Email": "Email-2553083",
  "loginName": "Name-2553083",
  "Currency": {
    "code": "USD"
  },
  "salaryAmount": 3000000,
  "accountNumber": "ntNumber-2553083",
  "bankId": "-2553083",
  "bankName": "bankName-2553083"
}
```

case - 3:	CREATE an employee with salary <50000 & currency code EUR.
```JSON
{
  "nameFirst": "nameFirst-2553083",
  "nameMiddle": "nameMiddle-2553083",
  "nameLast": "nameLast-2553083",
  "nameInitials": "nameInitials-2553083",
  "Gender": "M",
  "Language": "83",
  "phoneNumber": "phoneNumber-2553083",
  "Email": "Email-2553083",
  "loginName": "Name-2553083",
  "Currency": {
    "code": "EUR"
  },
  "salaryAmount": 3000,
  "accountNumber": "ntNumber-2553083",
  "bankId": "-2553083",
  "bankName": "bankName-2553083"
}
```
 #### 7.    Updade Employee

```http
  PATCH odata/v4/employee/EmployeeSet
```
|Parameters | Description                |
|:-- | :------------------------- |
| ID | Create Employee |

#### Body 
case - 1:	UPDATE an employee by keeping the nameFirst and loginName intact.
```JSON
{
  "nameMiddle": "nameMiddle-2553083",
  "nameLast": "nameLast-2553083",
  "nameInitials": "nameInitials-2553083",
  "Gender": "F",                            //changing form M to F
  "Language": "83",
  "phoneNumber": "phoneNumber-2553083",
  "Email": "Email-2553083",
  "Currency": {
    "code": "215"
  },
  "salaryAmount": 30000,
  "accountNumber": "ntNumber-2553083",
  "bankId": "-2553083",
  "bankName": "bankName-2553083"
}

```

case - 2:	UPDATE an employee by changing the loginName.
```JSON
{
  "loginName : "sai",                       // changing
  "nameMiddle": "nameMiddle-2553083",
  "nameLast": "nameLast-2553083",
  "nameInitials": "nameInitials-2553083",
  "Gender": "F",    
  "Language": "83",
  "phoneNumber": "phoneNumber-2553083",
  "Email": "Email-2553083",
  "Currency": {
    "code": "215"
  },
  "salaryAmount": 30000,
  "accountNumber": "ntNumber-2553083",
  "bankId": "-2553083",
  "bankName": "bankName-2553083"
}

```

 #### 8.    Delete Employee

```http
  DELETE odata/v4/employee/EmployeeSet/
```
|Parameters | Description                |
|:-- | :------------------------- |
| ID | Create Employee |




