import cors from 'cors'
import express from 'express'

import { PORT, registerMock } from './helper'
import { logger } from './middleware/logger'

const app = express()

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

// logger
app.use(logger)

await registerMock(app)

app.listen(PORT, () => {
  console.log(`🚀 Mock服务器启动成功`)
  console.log(`📍 端口: ${PORT}`)
  console.log(`🌐 地址: http://localhost:${PORT}`)
})
