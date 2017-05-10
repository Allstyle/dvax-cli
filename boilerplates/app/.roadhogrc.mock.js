export default {
  // 支持值为 Object 和 Array
  'GET /dvax/data': {name: 'dvax from mock js'},

  // GET POST 可省略
  '/dvax/users/1': {id: 1},

  // 支持自定义函数，API 参考 express@4
  'POST /dvax/users/create': (req, res) => { res.end('OK') },
}
