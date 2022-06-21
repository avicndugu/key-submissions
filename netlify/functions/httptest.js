const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  let response
  try {
    response = await fetch('http://jsonplaceholder.typicode.com/users')
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}