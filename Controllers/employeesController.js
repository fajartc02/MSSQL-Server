const configDB = require('../config')
const sql = require("mssql");

module.exports = {
  getAllEmployees: (req, res) => {
    // connect to your database
    sql.connect(configDB, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        var queryDB = `SELECT * FROM employees`
        if(req.query.idEmployee) {
          queryDB = 
          `
            SELECT * FROM employees
              WHERE id = ${req.query.idEmployee}
          `
        }
        request.query(
          `
            ${queryDB}
          `
        , function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.status(201).json({
              message: 'Success To Get All Employees',
              data: recordset
            })
            sql.close()
        });
    });
  },
  addEmployee: (req, res) => {
    sql.connect(configDB, function(err) {
      var userData = {
        name_employee: req.body.name_employee,
        noreg_employee: req.body.noreg_employee,
        no_polisi: req.body.no_polisi,
        shift: req.body.shift,
        berlaku_sim: req.body.berlaku_sim,
        berlaku_stnk: req.body.berlaku_stnk
      }
      if(err) console.log(err)
      var request = new sql.Request();
      request.query(
        `
          INSERT INTO employees 
            (name_employee, noreg_employee, no_polisi, berlaku_sim, berlaku_stnk, shift)
          VALUES 
            (
              '${userData.name_employee}', 
              ${+userData.noreg_employee}, 
              '${userData.no_polisi}', 
              '${userData.berlaku_sim}', 
              '${userData.berlaku_stnk}', 
              '${userData.shift}'
            )
        `
      , function(err, recordset) {
        if(err) {
          res.status(500).json({
            message: 'Data Already Register. Please Register Another User'
          })
        } else {
          res.status(201).json({
            message: `Success To Add Emlployee ${userData.name_employee}`,
          })
        }
        sql.close()
      })
    })
  },
  editEmployee: (req, res) => {
    sql.connect(configDB, function(err) {
      console.log('masuk');
      
      if(err) console.log(err)
      var request = new sql.Request();
      request.query(
        `
          UPDATE employees
          SET 
            ${`name_employee = '${req.body.name_employee}'` || ''},
            ${`noreg_employee = ${req.body.noreg_employee}` || ''},
            ${`no_polisi = '${req.body.no_polisi}'` || ''},
            ${`shift = '${req.body.shift}'` || ''},
            ${`berlaku_sim = '${req.body.berlaku_sim}'` || ''},
            ${`berlaku_stnk = '${req.body.berlaku_stnk}'` || ''}
          WHERE id = ${req.params.idEmployee}
        `
      , function(err, recordset) {
        if(err) {
          res.status(500).json({
            message: 'Error to Edit',
            err: err
          })
        } else {
          res.status(201).json({
            message: 'Success To Edit Data',
            data: recordset
          })
        }
        sql.close()
      })
    })
  },
  deleteEmployee: (req, res) => {
    sql.connect(configDB, function(err) {
      if(err) console.log(err);
      let request = new sql.Request();
      console.log(req.params.idEmployee);
      
      request.query(
        `
          DELETE FROM employees
          WHERE id = ${req.params.idEmployee}
        `
      , function(err, recordset) {
          if(err) {
            res.status(500).json({
              message: 'Error to Delete'
            })
          } else {
            res.status(201).json({
              message: 'Success To Delete Data'
            })
          }
          sql.close()
        }
      )
    })
  },
  patrolCheckEmployee: (req, res) => {
    sql.connect(configDB, function(err) {
      if(err) console.log(err);
      console.log(req.body);
      console.log(req.params.idEmployee);
      
      let request = new sql.Request();
      request.query(
      `
        INSERT INTO checked_patrol (
          employeeID, date_checked, lamp_fr, lamp_rr, lamp_br,
          sign_rg, sign_lf, spion_rg, spion_lf, sim_check, asuransi_check,
          stnk_check, helm_check, klakson_check, sepatu_check, roda_check,
          jas_hujan, spare_lamp_fr, spare_lamp_rr, note_atasan
        )
        VALUES (
          ${req.params.idEmployee}, '${req.body.date_checked}', '${req.body.lamp_fr}', '${req.body.lamp_rr}', '${req.body.lamp_br}', 
          '${req.body.sign_rg}', '${req.body.sign_lf}', '${req.body.spion_rg}', '${req.body.spion_lf}', '${req.body.sim_check}', '${req.body.asuransi_check}',
          '${req.body.stnk_check}', '${req.body.helm_check}', '${req.body.klakson_check}', '${req.body.sepatu_check}', '${req.body.roda_check}', 
          '${req.body.jas_hujan}', '${req.body.spare_lamp_fr}', '${req.body.spare_lamp_rr}', '${req.body.note_atasan}'
        )
      `
      , function(err, recordset) {
        if(err) {
          res.status(500).json({
            messsage: 'Error'
          })
        } else {
          res.status(201).json({
            message: 'Success',
            data: recordset
          })
        }
        sql.close()
      })
    })
  },
  getAllCheckedPatrol: (req, res) => {
    sql.connect(configDB, function(err) {
      if(err) console.log(err);
      let request = new sql.Request()

      request.query(
      `
        SELECT * FROM employees JOIN checked_patrol
        ON (id = employeeID)
      `
      , function(err, recordset) {
        if(err) {
          res.status(500).json({
            message: 'Error'
          })
        } else {
          res.status(200).json({
            message: 'Success',
            data: recordset
          })
        }
        sql.close()
      })
    })
  }
}