// import { createClient } from 'pexels';

const { PEXELS_API_KEY } = process.env;
const API_ENDPOINT = 'https://api.pexels.com/v1/search?query=people';

// const client = createClient(PEXELS_API_KEY);



// exports.handler = async (event, context) => {
//   const response = await fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
//   const data = await response.json()
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       data: data
//     })
//   }
// };

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