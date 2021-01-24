const checkObjName = require('../lib/checkObjName');
const arj = require('api-response-json');
const mysql = require('../../../dtatbase.config');

function orders(req, res, next) {
    const _query = req.query;
    const _query_key = Object.keys(_query);

    if (typeof _query.limit === "undefined") {
        let _sql = `SELECT 
        Orders.id, 
        Orders.product_id , 
        Products.name,
        Products.price  
        FROM Orders 
        LEFT JOIN Products ON Orders.product_id = Products.id 
        GROUP BY Orders.id,Products.id
        ORDER BY RAND() DESC`;

        mysql.query(_sql, function (err, result) {
            if (err) {
                arj.unauthorized(res, false, {
                    status: "error",
                    message: "บันทึกข้อมูลผิดพลาด",
                    error: err
                })
            } else if (result.length !== 0) {
                arj.ok(res, true, {
                    status: "success",
                    message: "ดึงข้อมูลสำเร็จ",
                    data: result
                })

            } else {
                arj.unauthorized(res, false, {
                    status: "error",
                    message: "ไม่พบรายการสั่งอาหาร",
                    data: []
                })
            }
        })
    } else {
        if (checkObjName(_query_key, "limit")) {
            let _sql = `SELECT 
            Orders.id, 
            Orders.product_id , 
            Products.name,
            Products.price  
            FROM Orders 
            LEFT JOIN Products ON Orders.product_id = Products.id 
            GROUP BY Orders.id,Products.id
            ORDER BY RAND() DESC
            LIMIT ${_query.limit}`;

            mysql.query(_sql, function (err, result) {
                if (err) {
                    arj.unauthorized(res, false, {
                        status: "error",
                        message: "บันทึกข้อมูลผิดพลาด",
                        error: err
                    })
                } else if (result.length !== 0) {
                    arj.ok(res, true, {
                        status: "success",
                        message: "ดึงข้อมูลสำเร็จ",
                        data: result
                    })

                } else {
                    arj.unauthorized(res, false, {
                        status: "error",
                        message: "ไม่พบรายการสั่งอาหาร",
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
}


module.exports = orders;