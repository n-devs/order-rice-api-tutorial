const checkObjName = require('../lib/checkObjName');
const arj = require('api-response-json')
const TwinBcrypt = require('twin-bcrypt');
const mysql = require('../../../dtatbase.config');

function register(req, res, next) {
    const _body = req.body;

    const _body_key = Object.keys(_body)

    if (checkObjName(_body_key, "name") && checkObjName(_body_key, "email") && checkObjName(_body_key, "password") && checkObjName(_body_key, "confirm_password")) {
        if(_body.password === _body.confirm_password) {
            TwinBcrypt.hash(_body.password, function (hash) {
                let _sql = `INSERT INTO Users SET name = '${_body.name}', email = '${_body.email}', password = '${hash}'`
                mysql.query(_sql, function (err, result) {
                    if (err) {
                        arj.unauthorized(res, false, {
                            status: "error",
                            message: "บันทึกข้อมูลผิดพลาด",
                            error: err
                        })
                    } else {
                        arj.ok(res, true, {
                            status: "success",
                            message: "บันทึกข้อมูลสำเร็จ",
                            data: result
                        })
                    }
                })
            })
        }else{
            arj.unauthorized(res, false, {
                status: "error",
                message: "รหัสไม่ตรงกัน"
            }) 
        }
       
    } else {
        arj.unauthorized(res, false, {
            status: "error",
            message: "กรอกข้อมูลไม่ครบ"
        })
    }

}

module.exports = register;