const checkObjName = require('../lib/checkObjName');
const arj = require('api-response-json')
const mysql = require('../../../dtatbase.config');
const jwt = require('jsonwebtoken');

function dashboard(req, res, next) {
    const _query = req.query;

    const _query_key = Object.keys(_query)

    if (checkObjName(_query_key, "token")) {
        jwt.verify(_query.token, "jwt", (error, decoded) => {
            if (error) {
                arj.internalServerError(res, false, 'token ผิดพลาด', {
                    status: "error",
                    success: false,
                    error: error
                })
            } else {
                let _sql = `SELECT * FROM Tokens WHERE token = '${_query.token}'`;

                mysql.query(_sql, function (err, result) {
                    if (err) {
                        arj.unauthorized(res, false, {
                            status: "error",
                            message: "ดึงข้อมูลผิดพลาด",
                            error: err
                        })
                    } else if (result.length !== 0){
                        arj.ok(res, true, {
                            status: "success",
                            message: "ใช้งานอยู่",
                            data: decoded.data
                        })
                    }else{
                        arj.unauthorized(res, false, {
                            status: "error",
                            message: "ไม่ได้ใช้งานอยู่",
                            data: []
                        })
                    }
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

module.exports = dashboard;