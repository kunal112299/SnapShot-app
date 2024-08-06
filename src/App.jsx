
import { Form } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

function App() {
  const [inputText, setInputText] = useState(''); 
  const [images, setImages] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
   
  const IMAGE_PER_PAGE = 20;

  const API_URL = 'https://api.unsplash.com/search/photos'; 

  // handling input
  const handleChange = (e)=>{
    setInputText(e.target.value)
    console.log(inputText)
  }
  //fetch function
  const getImage = async(text)=>{
    try {
      const res = await fetch(`${API_URL}?query=${text}&page=${page}&per_page=${IMAGE_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`)
      const apiData = await res.json()
      if(!res.ok) {
        throw new Error('err in fetching');
      }
      setImages(apiData.results);
      setTotalPages(apiData.total_pages);
      console.log('DATA\n', apiData)
    } catch (error) {
      console.log(error); 
    }
  };
  useEffect(() => {
    getImage(inputText);
  }, [page]);

  console.log(page);
  

  const handleSelection = (selection)=>{
    setInputText(selection);
    getImage(selection);

  }

  // handling submit
  const handleSubmit = (e) => {
    e.preventDefault();
    getImage(inputText);
  }

  return (
    <div className="container">
      <h1 className="title">Image Search</h1>
      <div className="search-section">
      <form onSubmit={handleSubmit}>
      <Form.Control 
          type="search" 
          placeholder=" Type Something to Search" 
          className='search-input'
          onChange={handleChange}
      />
      </form>
      </div>
      <div className="filters">
        <div onClick={()=>{handleSelection('nature')}}>Nature</div>
        <div onClick={()=>{handleSelection('Birds')}}>Birds</div>
        <div onClick={()=>{handleSelection('Cats')}}>Cats</div>
        <div onClick={()=>{handleSelection('CLouds')}}>Clouds</div>
      </div>
      <div className="images">
        {
          images.map(image =>{
            return(
              <img key={image.id} src={image.urls.small} alt={image.alt_description} className='image' />
            )
          })
        }
      </div>
      <div className="buttons">
        {
          page>1 && (
            <button className='button1' onClick={()=>{
              setpage(page - 1);
            }}>Previous</button>
          )
        }
        {
          page<totalPages && (
            <button className='button1' onClick={()=>{
              setpage(page + 1);
            }}>Next</button>
          )
        }
      </div>
    </div>
  )
}

export default App





// const result = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=1&per_page=${IMAGE_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`);
        // console.log('result',result.data)