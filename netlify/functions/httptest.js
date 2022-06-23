import fetch from 'node-fetch';
const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts';

exports.handler = async (event, context) => {
  const response = await fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
  const data = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: data
    })
  }
};
