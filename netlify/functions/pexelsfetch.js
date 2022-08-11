import fetch from 'node-fetch';
const { PEXELS_API_KEY } = process.env;
const API_ENDPOINT = 'https://api.pexels.com/v1/search?query=people';

exports.handler = async (event, context) => {
  const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          "Authorization": PEXELS_API_KEY
        }
      })
  const data = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: data
    })
  }
};