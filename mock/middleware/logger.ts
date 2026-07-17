import { RequestHandler } from 'express'

import { colors, formatSize, formatTimestamp, getMethodColor, getStatusColor } from '../helper'

export const createLogger = (): RequestHandler => {
  return (req, res, next) => {
    const start = Date.now()
    const originalSend = res.send
    const originalJson = res.json
    let responseSize = 0

    res.send = function (body) {
      responseSize = Buffer.byteLength(body || '', 'utf8')
      return originalSend.call(this, body)
    }

    res.json = function (body) {
      const jsonString = JSON.stringify(body)
      responseSize = Buffer.byteLength(jsonString, 'utf8')
      return originalJson.call(this, body)
    }

    res.on('finish', () => {
      const duration = Date.now() - start
      const { ip, method, url } = req
      const { statusCode } = res

      const timestamp = formatTimestamp()
      const methodColor = getMethodColor(method)
      const statusColor = getStatusColor(statusCode)
      const size = formatSize(responseSize)

      const logMessage = `${timestamp} ${methodColor}${method}${colors.reset} ${statusColor}${statusCode}${colors.reset} ${colors.gray}${url}${colors.reset} ${colors.gray}${ip}${colors.reset} ${colors.gray}${size}${colors.reset} ${colors.gray}${duration}ms${colors.reset}`

      console.log(logMessage)
    })

    next()
  }
}

export const logger = createLogger()
