const checkObjName = require('../lib/checkObjName');
const arj = require('api-response-json');
const mysql = require('../../../dtatbase.config');

function insert_order(req, res, next) {
    const _body = req.body;

    const _body_key = Object.keys(_body);

    if (checkObjName(_body_key, "product_id") && checkObjName(_body_key, "user_id")) {
        let _sql = `INSERT INTO Orders SET product_id = '${_body.product_id}',user_id = '${_body.user_id}'`;

        mysql.query(_sql, function (err, result) {
            if (err) {
                arj.unauthorized(res, false,"บันทึกข้อมูลผิดพลาด", {
                    status: "error",
                    error: err
                })
            } else if (result.length !== 0) {
                arj.ok(res, true, "ดึงข้อมูลสำเร็จ",{
                    status: "success",
                    data: result
                })

            } else {
                arj.unauthorized(res, false,"ไม่พบรายการสั่งอาหาร", {
                    status: "error",
                    data: []
                })
            }
        })

    } else {
        arj.unauthorized(res, false,"กรอกข้อมูลไม่ครบ", {
            status: "error",
        })
    }
}


module.exports = insert_order;