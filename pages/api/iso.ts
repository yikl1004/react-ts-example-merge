// import isDev from 'isdev'
// import path from 'path'
// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import { match, RouterContext } from 'react-router'

import { serialize } from 'cookie'

/**
 * This sets `cookie` on `res` object
 */
// @ts-ignore
const cookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    // @ts-ignore
    options.expires = new Date(Date.now() + options.maxAge)
    // @ts-ignore
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
// @ts-ignore
const cookies = handler => (req, res) => {
    // @ts-ignore
    res.cookie = (name, value, options) => cookie(res, name, value, options)

    return handler(req, res)
}

// @ts-ignore
const handler = (req, res) => {
  res.cookie('Next.js', 'api-middleware!')
  res.end('Hello Next.js middleware!')
}

export default cookies(handler)
