import { createClient } from 'pexels';
const client = createClient(process.env.PEXELS_API_KEY);

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
}