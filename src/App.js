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
    event.preventDefault();
    axios.post(
      'http://localhost:3000/books',
      {
        title: newTitle,
        author: newAuthor,
        cover: newCover,
        price: newPrice,
        publishDate: newDate
      }
    ).then(() => {
      axios.get('http://localhost:3000/books')
      .then((response => {
        setBooks(response.data)
      }))
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/books')
    .then((response) => {
      setBooks(response.data)
    })
  }, [])

  const handleDeleteBook = (books) => {
    axios.delete(`http://localhost:3000/books/${books._id}`)
    .then(() => {
      axios
      .get('http://localhost:3000/books')
      .then((response) => {
        setBooks(response.data)
      })
    })
  }

  const submitEditChanges = (books) => {
    axios.put(`http://localhost:3000/books/${books._id}`,
    {
        title: newTitle,
        author: newAuthor,
        cover: newCover,
        price: newPrice,
        publishDate: newDate
    })
    .then(() => {
      axios.get('http://localhost:3000/books')
      .then((response) => {
        setBooks(response.data)
      })
    })
  }

  return (
    <div className='Wrapper'>
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
          <button onClick={(event) => {
            handleDeleteBook(books)
          }}>Delete Book</button>
          <details>
            <div>
              <form onSubmit={() => {{submitEditChanges(books)}}}>
              Title: <input type ='text' onKeyUp={handleChangeTitle}/><br/>
              Author: <input type ='text' onKeyUp={handleChangeAuthor}/><br/>
              Cover: <input type ='text' onKeyUp={handleChangeCover}/><br/>
              Price: <input type ='number' onKeyUp={handleChangePrice}/><br/>
              Date: <input type ='date' onKeyUp={handleChangeDate}/><br/>
              <input type='submit' value='submit changes'></input>
              </form>
            </div>
          </details>
          </div>
      })}
    </div>
  )
}

export default App;

