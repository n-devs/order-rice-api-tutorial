const checkObjName = require('../lib/checkObjName');
const arj = require('api-response-json');
const mysql = require('../../../dtatbase.config');

function insert_product(req, res, next) {
    const _body = req.body;

    const _body_key = Object.keys(_body);

    if (checkObjName(_body_key, "name") && checkObjName(_body_key, "price")) {
        let _sql = `INSERT INTO Products SET name = '${_body.name}',price = '${_body.price}'`;

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


module.exports = insert_product;