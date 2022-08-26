import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'


const App = () => {
  
  //=====>STATES 
  
  let [books, setBooks] = useState([])
  let [newTitle, setNewTitle] = useState('')
  let [newAuthor, setNewAuthor] = useState('')
  let [newDate, setNewDate] = useState('')
  let [newPrice, setNewPrice] = useState(0)
  let [newCover, setNewCover] = useState('')

  const handleChangeDate = (event) => {
    setNewDate(event.target.value)
    console.log(typeof(newDate))
  }
  
  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleChangeCover = (event) => {
    setNewCover(event.target.value)
  }

  const handleChangePrice = (event) => {
    setNewPrice(event.target.value)
  }

  const handleBookSubmission = (event) => {

  }

  useEffect(() => {
    axios.get('http://localhost:3000/books')
    .then((response) => {
      setBooks(response.data)
    })
  }, [])

  return (
    <div>
      <h1>whaddup</h1>
      <h2>Add a New Book</h2>
      <form onSubmit={handleBookSubmission}>
        Title: <input type ='text' onChange={handleChangeTitle}/><br/>
        Author: <input type ='text' onChange={handleChangeAuthor}/><br/>
        Cover: <input type ='text' onChange={handleChangeCover}/><br/>
        Price: <input type ='number' onChange={handleChangePrice}/><br/>
        Date: <input type ='date' onChange={handleChangeDate}/><br/>
        <input type='submit' value='Submit New Book'/>
      </form>
      {books.map((books) => {
        return <div>
          <h1>{books.title}</h1>
          </div>
      })}
    </div>
  )
}

export default App;

