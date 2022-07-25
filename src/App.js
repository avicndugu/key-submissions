import './App.css';
import { useState, useEffect } from 'react';

function App() {
const [word, setWord] = useState("");
const [searchTerm, setSearchTerm] = useState("cup");
 

  const BASIC_API_ENDPOINT = 'https://api.pexels.com/v1/search?query=';
 // Default request returns 15 items 
 // const API_ENDPOINT = BASIC_API_ENDPOINT + searchterm;
  const numberofitems = '&per_page=3';
  const orientation = '&orientation=square';
  const size = '&size=medium';
  // const API_ENDPOINT = BASIC_API_ENDPOINT + searchterm + numberofitems + orientation + size;
  const API_ENDPOINT = BASIC_API_ENDPOINT + searchTerm + numberofitems + orientation + size;

  function DataFetch(url){
    const [data, setData] = useState("");
    useEffect(() => { 
      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              "Authorization": process.env.REACT_APP_PEXELS_API_KEY
            }
          })
          const json = await response.json();
          setData(json);
        } catch(error) {
            console.log("error:", error);
          }
        };
        fetchData();
    },[url]);
    return data;
  }

  const result = DataFetch(API_ENDPOINT);
  console.log(result)

  if(!result){
    return (
      <>
        <p>Loading</p>
      </>
    )
  } else {
  return (
      <div className="App">
        <div>
          <label htmlFor="related-images">Enter the English word you wish to translate: </label>
          <br />
          <input type="text" id="related-images" value={ word } onChange={(e)=> setWord(e.target.value)}/>
          <br />
          <button className="button" onClick={()=>setSearchTerm(word)}>Get images</button>
        </div>

        <div className="container">
        {
          result.photos.map((item)=>(
            <div>
              <img src={item.src.tiny} alt={item.alt} />
            </div>
          ))
        }
        </div>
          <Button></Button>
      </div>
    );
  }
}

function Button() {
  // Sending Data Using POST METHOD
  const postData = async (word) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(word)
    };
    const sent = await fetch('https://reqres.in/api/posts', requestOptions)
    const jsons = await sent.json();
    console.log(jsons)
  }
  return(
    <button onClick={()=>postData({ title: 'React Hooks POST Request Example'})}> Submit Word</button>
  )
}
export default App;
