import './App.css';
import { useState, useEffect } from 'react';

function App() {
 
  const [data, setData] = useState([]);
  const searchterm = 'cup'
  const BASIC_API_ENDPOINT = 'https://api.pexels.com/v1/search?query=';
 // Default request returns 15 items 
 // const API_ENDPOINT = BASIC_API_ENDPOINT + searchterm;
  const numberofitems = '&per_page=5';
  const orientation = '&orientation=square';
  const size = '&size=medium';
  const API_ENDPOINT = BASIC_API_ENDPOINT + searchterm + numberofitems + orientation + size;


  useEffect(() => { 
    const fetchData = () => {
      fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          "Authorization": ""
        }
      })
      // fetch('/.netlify/functions/pexelsfetch')
      .then(response => response.json())
      .then((data) => {setData(data) })
      };
      fetchData();
  },[API_ENDPOINT]);
  console.log(data);


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
