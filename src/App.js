import './App.css';
import { useState, useEffect } from 'react';
// Initialize the Supabase JS client
import { createClient } from '@supabase/supabase-js';

function App() {
const [word, setWord] = useState("");
const [imgUrl, setImgUrl] = useState("");
const [checked, setChecked] = useState([true, false, false]);
const [translation, setTranslation] = useState("");
const BASIC_API_ENDPOINT = 'https://api.pexels.com/v1/search?query=';
const [isLoading, setIsLoading] = useState(false);
const [newData, setNewData] = useState(null);
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

 // Default request returns 15 items 
  const numberofitems = '&per_page=3';
  const orientation = '&orientation=square';
  const size = '&size=medium';

  // Form validation
  const [enValid, setEnValid] = useState(false);
  const [kiValid, setKiValid] = useState(false);

  // Regex for a single word without spaces and numbers
  const regWord =RegExp(/^([a-zA-Z-'])+$/);
  // Regex for a multiple words with spaces and without numbers
  const regWords =RegExp(/^([a-zA-Z-' ])+$/);


  useEffect(()=> {
    const cleanword = word.trim();
    const splitword = cleanword.split(" ");
    if (splitword.length>1){
      if(regWords.test(cleanword)){
        setEnValid(true);
      } else {
        setEnValid(false);
      }
    } else {
      if(regWord.test(cleanword)){
        setEnValid(true);
      } else {
        setEnValid(false);
      }
    }
  }, [word, regWord, regWords]);


  useEffect(()=> {
    const cleantranslation = translation.trim();
    const splittranslation = translation.split(" ");
    if (splittranslation.length>1){
      if(regWords.test(cleantranslation)){
        setKiValid(true);
      } else {
        setKiValid(false);
      }
    } else {
      if(regWord.test(cleantranslation)){
        setKiValid(true);
      } else {
        setKiValid(false);
      }
    }
  },[translation, regWord, regWords]);


// Use click instead of useffect to load data
  const handleClick = async () => {
    const search = BASIC_API_ENDPOINT + word + numberofitems + orientation + size;
    setIsLoading(true);
    try {
      const response = await fetch(search, {
        method: 'GET',
        headers: {
          "Authorization": process.env.REACT_APP_PEXELS_API_KEY
        }
      })
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const json = await response.json();
      setNewData(json);
    } catch(error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Set the first url as the default when the user might not click on any option 
  useEffect(()=> {
    if(newData){
      console.log(newData)
      console.log(newData.photos)
      if(newData.photos.length>0){
        console.log(newData.photos[0])
        console.log(newData.photos[0].src.tiny)
        setImgUrl(newData.photos[0].src.tiny)
      }
    }
  },[newData])

  if(isLoading || !newData){
    return (
      <div className="App">
        <p>Enter the English word and its Kikuyu translation.</p>
        <div className="container pt-1 pb-1">
          <div className="pb-1">
            <label htmlFor="related-images-en">English Word</label>
            <br />
            <br />
            <input type="text" id="primary-lang"  name="primary-lang" value={ word } onChange={(e)=> setWord(e.target.value) }/>
            <p>{ !enValid ? "Enter a valid English word" : " " }</p>
          </div>
          <div>
            <label htmlFor="related-images-ki">Kikuyu Word</label>
            <br />
            <br />
            <input type="text" id="secondary-lang" name="secondary-lang" value={ translation } onChange={(e)=> setTranslation(e.target.value) }/>
            <p>{ !kiValid ? "Enter a Kikuyu word" : " " }</p>
          </div>
        </div>
        <div className="pt-1 pb-1">
          <p>Pictures helps everyone remember word better.</p>
          <button className="button" onClick={()=> {
            if(enValid && kiValid){
              handleClick();
            } 
          }}>Load pictures</button>
        </div>
        <div className="container pt-1 pb-1">
          <div>
            <img src="https://via.placeholder.com/280x200.png?text=waiting-to-loading..." alt="placeholder" width="280" height="200"/>
          </div>
          <div>
            <img src="https://via.placeholder.com/280x200.png?text=waiting-to-loading..." alt="placeholder" width="280" height="200"/>
          </div>
          <div>
            <img src="https://via.placeholder.com/280x200.png?text=waiting-to-loading..." alt="placeholder" width="280" height="200"/>
          </div>
        </div>
      </div>
    )
  } else {
    if(newData.photos.length===0) {
      return (
        <div className="App">
          <p>Enter the English word and its Kikuyu translation.</p>
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
            <button className="button" onClick={()=>handleClick(word)}>Load pictures</button>
          </div>
          <div className="container pt-1 pb-1">
            <div>
              <img src="https://via.placeholder.com/280x200.png?text=No+pictures+found" alt="placeholder" width="280" height="200"/>
            </div>
            <div>
              <img src="https://via.placeholder.com/280x200.png?text=No+pictures+found" alt="placeholder" width="280" height="200"/>
            </div>
            <div>
              <img src="https://via.placeholder.com/280x200.png?text=No+pictures+found" alt="placeholder" width="280" height="200"/>
            </div>
          </div>
          <Button imgUrl ={ imgUrl } word={ word } translation={ translation } buttontext="Submit Word Without Picture" />
        </div>
      )
    } else {
      return (
        <div className="App">
          <p>Enter the English word and its Kikuyu translation.</p>
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
          </div>
          <div className="container pt-1 pb-1">
            {
              newData.photos.map((item, index)=>(
                <div key={index} onClick={()=> {
                  setImgUrl(item.src.tiny)
                }}>
                  <label htmlFor={index}>
                    <img src={item.src.tiny} alt={item.alt} className={ checked[index] ? "checked" : " " } width="280" height="200" />
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
          <Button imgUrl ={ imgUrl } word={ word } translation={ translation }
           isvalid={(enValid && kiValid)} buttontext="Submit Word with Pictures"
           setWord = { setWord } setImgUrl = { setImgUrl } setTranslation = { setTranslation }
           setNewData = { setNewData }
          />
        </div>
      )
    }
  }
}

function Button(props) {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Sending Data Using POST METHOD
  const postData = async (word) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(word, props.imgUrl)
    };
    // const sent = await fetch('https://reqres.in/api/posts', requestOptions)
    // const sent = await fetch('http://localhost:3001', requestOptions)
    // const sent = await fetch('https://zmgkwurpwwqznupvrscd.supabase.co', requestOptions);
    const {data, error} = await supabase.from('kikuyu-words').insert([{ english: props.word, kikuyu: props.translation, img_path: props.imgUrl }]);
    // const jsons = await sent.json();
    // console.log(sent.status)
    // console.log(jsons)
    console.log(data)
    if (error) {
      console.log(error.message);
    }
    props.setWord("");
    props.setImgUrl("");
    props.setTranslation("");
    props.setNewData(null);
  }
  return(
    <button onClick={()=> {
      if(props.isvalid){
        postData({ english: props.word , url: props.imgUrl , translation: props.translation });
      }
    }}> { props.buttontext } </button>
  )
}
export default App;
