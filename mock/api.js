const fs = require('fs') //这时属于node中的的包，专门用来读取文件中的内容。
    // 根据传递过来的文件名称读取文件内容
function fromJonsFile(fileName) {
    // req:表示接受浏览器发送过来的数据（request）
    // res:表示将数据返回给浏览器 (response)
    return (req, res) => {
        const data = fs.readFileSync(`mock/data/${fileName}.json`).toString()
        const jsonData = JSON.parse(data)
        return res.json(jsonData)
    }
}

function fromJSONDetailFile(fileName, dataType) {
    return (req, res) => {
        const data = fs.readFileSync(`mock/data/${fileName}.json`).toString();
        const json = JSON.parse(data)
         //如果条件成立，表示要查询的是商品的图片。
        if (dataType === "imgCategory") {
            // 如果该条件成立，表示是根据图片的类别编号，查询出对应的图片信息。
            var result = { "status": 0, "message": [] };
            for (var i = 0; i < json.message.length; i++) {

                if (json.message[i].category_id === Number(req.params.id)) {

                    // 一个类型下有很多的图片。
                    result.message.push(json.message[i]);

                }
            }
            return res.json(result);

        } else {
            var result = {};
            // console.log("id=",req.params.id);
            for (var i = 0; i < json.message.length; i++) {
                // console.log("json:",json.message[i].id);
                // console.log("json:",typeof(req.params.id));
                if (json.message[i].id === Number(req.params.id)) {

                    result = { "status": 0, "message": [json.message[i]] };
                    break;
                }
            }
            return res.json(result);
        }
    }
}
const proxy = {
    'GET /api/getSwape': fromJonsFile('Swape'),
    'GET /api/getProductList': fromJonsFile('GoodProductList'),
    'GET /api/getProductInfo/:id': fromJSONDetailFile('ProductInfo'),
    'GET /api/showProductSwipe/:id': fromJSONDetailFile('ProductDetailSwiper', 'imgCategory')
}
module.exports = proxy;