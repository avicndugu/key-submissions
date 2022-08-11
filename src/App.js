import './App.css';
import { useState } from 'react';

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
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    const cleanwords = value.trim();
    const words = cleanwords.split(" ");
    if (words.length>1){
    // Regex for a multiple words with spaces and without numbers
      const regWord =RegExp(/^([a-zA-Z-' ])+$/);
      regexcheck(regWord)
    } else {
    // Regex for a single word without spaces and numbers
      const regWord =RegExp(/^([a-zA-Z-'])+$/);
      regexcheck(regWord);
    }

    function regexcheck(regWord){
      if(name==="primary-lang"){
        if(regWord.test(cleanwords)){
          setEnValid(regWord.test(cleanwords))
        } else {
          setEnValid(regWord.test(cleanwords))
        }
      }
      if(name==="secondary-lang"){
        if(regWord.test(cleanwords)){
          setKiValid(regWord.test(cleanwords))

        } else {
          setKiValid(regWord.test(cleanwords))
        }
      }
    }
  }

// Use click instead of useffect to load data
  const handleClick = async (term) => {
  const search = BASIC_API_ENDPOINT + term + numberofitems + orientation + size;

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

  if(isLoading || !newData){
    return (
      <div className="App">
        <p>Enter the English word and its Kikuyu translation.</p>
        <div className="container pt-1 pb-1">
          <div className="pb-1">
            <label htmlFor="related-images-en">English Word</label>
            <br />
            <br />
            <input type="text" id="primary-lang"  name="primary-lang" value={ word } onChange={(e)=> {
              setWord(e.target.value);
              handleUserInput(e);
            }}/>
            <p>{ !enValid ? "Enter a valid English word" : "Correct English word" }</p>
          </div>
          <div>
            <label htmlFor="related-images-ki">Kikuyu Word</label>
            <br />
            <br />
            <input type="text" id="secondary-lang" name="secondary-lang" value={ translation } onChange={(e)=> {
              setTranslation(e.target.value);
              handleUserInput(e);
            }}/>
            <p>{ !kiValid ? "Enter a Kikuyu word" : "Correct Kikuyu word" }</p>
          </div>
        </div>
        <div className="pt-1 pb-1">
          <p>Pictures helps everyone remember word better.</p>
          <button className="button" onClick={()=>handleClick(word)}>Load pictures</button>
        </div>
        <div className="container pt-1 pb-1">
          <div>
            <img src="https://via.placeholder.com/280x200.png?text=loading..." alt="placeholder" width="280" height="200"/>
          </div>
          <div>
            <img src="https://via.placeholder.com/280x200.png?text=loading..." alt="placeholder" width="280" height="200"/>
          </div>
          <div>
            <img src="https://via.placeholder.com/280x200.png?text=loading..." alt="placeholder" width="280" height="200"/>
          </div>
        </div>
        <Button imgUrl ={ imgUrl } word={ word } translation={ translation } buttontext="Submit Word Without Picture" />
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
            <button className="button" onClick={()=>handleClick(word)}>Load pictures</button>
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
          <Button imgUrl ={ imgUrl } word={ word } translation={ translation } buttontext="Submit Word with Pictures" />
        </div>
      )
    }
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
    console.log(sent.status)
    console.log(jsons)
  }
  return(
    <button onClick={()=>postData({ english: props.word , url: props.imgUrl , translation: props.translation })}> { props.buttontext } </button>
  )
}
export default App;
