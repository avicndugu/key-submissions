import './App.css';
import { useState, useEffect } from 'react';

function App() {
const [word, setWord] = useState("");
const [searchTerm, setSearchTerm] = useState("cup");
 
  const [data, setData] = useState([]);

  const BASIC_API_ENDPOINT = 'https://api.pexels.com/v1/search?query=';
 // Default request returns 15 items 
 // const API_ENDPOINT = BASIC_API_ENDPOINT + searchterm;
  const numberofitems = '&per_page=5';
  const orientation = '&orientation=square';
  const size = '&size=medium';
  // const API_ENDPOINT = BASIC_API_ENDPOINT + searchterm + numberofitems + orientation + size;
  const API_ENDPOINT = BASIC_API_ENDPOINT + searchTerm + numberofitems + orientation + size;


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
      <div>
        <label htmlFor="related-images">Enter the English word you wish to translate: </label>
        <br />
        <input type="text" id="related-images" value={ word } onChange={(e)=> setWord(e.target.value)}/>
        <button onClick={()=>setSearchTerm(word)}>Get images</button>
      </div>

      <div>

      </div>
    </div>
  );
}

export default App;
