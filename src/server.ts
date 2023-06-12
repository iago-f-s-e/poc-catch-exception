import * as http from "http";
import {HandleResponse} from "./common";
import {CreateBillController} from "./application";


const server = http.createServer()

server.listen(3000, '127.0.0.1', () => {
  console.log('running')
})

server.on('request', (req, res) => {
  let data = ''

  req.on('data', chunk => {
    data += chunk
  })

  req.on('end', () => {
    let body = null

    try {
      body = JSON.parse(data)
    } catch (e) {
      res.statusCode = 500
      res.end(e.message)
    }
    const handleResponse = new HandleResponse(res)
    const controller = new CreateBillController(handleResponse)

    controller.exec(body)
  })
})
