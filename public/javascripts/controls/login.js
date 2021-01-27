const checkObjName = require('../lib/checkObjName');
const arj = require('api-response-json')
const TwinBcrypt = require('twin-bcrypt');
const mysql = require('../../../dtatbase.config');
const jwt = require('jsonwebtoken');

function login(req, res, next) {
    const _body = req.body;

    const _body_key = Object.keys(_body)

    if (checkObjName(_body_key, "email") && checkObjName(_body_key, "password")) {
        let _sql = `SELECT * FROM Users WHERE email = '${_body.email}'`;

        mysql.query(_sql, function (err, result) {
            if (err) {
                arj.unauthorized(res, false, "บันทึกข้อมูลผิดพลาด",{
                    status: "error",
                    error: err
                })
            } else if (result.length !== 0) {
               

                TwinBcrypt.compare(_body.password, result[0].password, function (check) {
                    if (check) {
                        req.session.userId = result[0].id;
                        let token = jwt.sign({
                            data: result,
                            session: req.session,
                            sessionID: req.sessionID,
                            success: true,
                            created_at: new Date()
                        },"jwt")
                        
                        let _sql_token = `INSERT INTO Tokens SET token = '${token}', user_id = '${result[0].id}'`;

                        mysql.query(_sql_token, function (err, result) {
                            if(err) {
                                console.log("error set token");
                            }else {
                                console.log("success set token");
                            }
                        })

                        arj.ok(res, true, {
                            access_token: token,
                            status: "success",
                            message: "login",
                            data: result
                        })
                    } else {

                        arj.unauthorized(res, false,"password ไม่ถูกต้อง", {
                            status: "error",
                            data: []
                        })
                    }
                })

            } else {
                arj.unauthorized(res, false,"ไม่พบผู้ใช้", {
                    status: "error",
                    data: []
                })
            }
        })

    } else {
        arj.unauthorized(res, false, {
            status: "error",
            message: "กรอกข้อมูลไม่ครบ"
        })
    }

}

module.exports = login;