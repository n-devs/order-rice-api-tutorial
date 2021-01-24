const checkObjName = require('../lib/checkObjName');
const arj = require('api-response-json')
const mysql = require('../../../dtatbase.config');
const jwt = require('jsonwebtoken');

function logout(req, res, next) {
    const _query = req.query;

    const _query_key = Object.keys(_query)

    if (checkObjName(_query_key, "token")) {
        jwt.verify(_query.token, "jwt", (error, decoded) => {
            if (error) {
                arj.internalServerError(res, false, 'token ผิดพลาด', {
                    status: "error",
                    success: false
                })
            } else {

             }
        })
        let _sql = `DELETE FROM Tokens WHERE token = '${_query.token}'`;

        mysql.query(_sql, function (err, result) {
            if (err) {
                arj.unauthorized(res, false, {
                    status: "error",
                    message: "ลบข้อมูลผิดพลาด",
                    error: err
                })
            } else {
                arj.ok(res, true, {
                    status: "success",
                    message: "logout"
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

module.exports = logout;