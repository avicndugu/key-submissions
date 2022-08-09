import './App.css';
import { useState, useEffect } from 'react';

function App() {
const [word, setWord] = useState("");
const [searchTerm, setSearchTerm] = useState("cup");
const [imgUrl, setImgUrl] = useState("");
const [checked, setChecked] = useState([true, false, false]);
const [translation, setTranslation] = useState("");

const updateState = (id) => {
  const newState = checked.map( (item, index) => {
    if (index===id) {
      return true;
    } else {
      return false;
    }
  })
    setChecked(newState)

} 

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

  // Set the url of the default image as soon as the api is fully loaded 
  useEffect(()=> {
    if(result){
      setImgUrl(result.photos[0].src.tiny)
    }
  },[result]);

  if(!result){
    return (
      <>
        <p>Loading</p>
      </>
    )
  } else {
    return (
      <div className="App">
        <p>Enter the English and Kikuyu word you wish to translate.</p>
        <div className="container pt-1 pb-1">
          <div className="pb-1">
            <label htmlFor="related-images-en">English Word</label>
            <br />
            <br />
            <input type="text" id="related-images-en" value={ word } onChange={(e)=> setWord(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="related-images-ki">Kikuyu Word</label>
            <br />
            <br />
          <input type="text" id="related-images-ki" value={ translation } onChange={(e)=> setTranslation(e.target.value)}/>
          </div>
        </div>
        <div className="pt-1 pb-1">
          <p>Pictures helps everyone remember word better.</p>
          <button className="button" onClick={()=>setSearchTerm(word)}>Load pictures</button>
        </div>
        <div className="container pt-1 pb-1">
        {
          result.photos.map((item, index)=>(
            <div key={index} onClick={()=> {
              setImgUrl(item.src.tiny)
              console.log(item.src.tiny)
            }}>
              <label htmlFor={index}>
                <img src={item.src.tiny} alt={item.alt} className={ checked[index] ? "checked" : " " }  />
                <div>
                  <input type="radio" name="image-chooser" id={index}  defaultChecked={checked[index]} onClick= {() => {
                    updateState(index);
                    setImgUrl(item.src.tiny); 
                  }}/>
                </div>
              </label>
            </div>
          ))
        }
        </div>
          <Button imgUrl ={ imgUrl } word={ word } translation={ translation } />
      </div>
    );
  }
}

function Button(props) {
  // Sending Data Using POST METHOD
  const postData = async (word) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(word, props.imgUrl)
    };
    const sent = await fetch('https://reqres.in/api/posts', requestOptions)
    const jsons = await sent.json();
    console.log(jsons)
  }
  return(
    <button onClick={()=>postData({ english: props.word , url: props.imgUrl , translation: props.translation })}> Submit Word and Image Url</button>
  )
}
export default App;
