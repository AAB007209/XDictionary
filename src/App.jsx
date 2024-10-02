import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/dictionary.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const result = data.find((item) => item.word.toLowerCase() === searchTerm.toLowerCase());
    if (result) {
      setMessage(result.meaning);
    } else {
      setMessage("Word not found in the dictionary.");
    }
  }

  return (
    <>
      <h1>Dictionary App</h1>
      <div>
        <input type="text" placeholder='Search for a word' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSubmit}>Search</button>
        <h3>Definition: </h3>
        {message && <p>{message}</p>}
      </div>
    </>
  )
}

export default App
