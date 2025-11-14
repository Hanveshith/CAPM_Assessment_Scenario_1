const cds = require('@sap/cds');
const { INSERT, DELETE } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(function(){
    const {EmployeeSet} = this.entities;


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

    
    //UPDATE VALIDATIONS
    this.before('UPDATE', EmployeeSet, (req) => {
        const { salaryAmount, currencyCode } = req.data;
        //Validating employee salaryAmount < 500000
        if( salaryAmount > 50000 && currencyCode !== 'USD' ) req.reject({message: "Employee's salary must be less than 50000 USD"});
        //Restricting nameFist and loginName changing
        if( req.data.nameFirst || req.data.loginName ) req.reject({message: "Operation not allowed"});
    })

    
    // this.on('UPDATE', EmployeeSet, (req) => {
    //     console.log("Update operation successful");
    //     // return {"message: Create operation successful"}
    // })

    this.after('UPDATE', EmployeeSet, (req) => {
        console.log('Update operation successful')
    })

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
})