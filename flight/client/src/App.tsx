import { useState, useEffect } from 'react'
import { DiaryEntry } from './types'
import axios from 'axios'

const App = () => {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [notify, setNotify] = useState <string>('')

  const baseUrl = 'http://localhost:3000/api'

  useEffect(() => {
    axios.get<DiaryEntry[]>(`${baseUrl}/diaries`).then((response) => {
      setDiaries(response.data);
    })
  }, [])
  

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try{
      const response = await axios.post(`${baseUrl}/diaries`, {
        date: (event.target as HTMLFormElement).date.value,
        weather: (event.target as HTMLFormElement).weather.value,
        visibility: (event.target as HTMLFormElement).visibility.value,
        comment: 'placeholder'
      })
      setDiaries([...diaries, response.data])
    } catch(error){
      if (axios.isAxiosError(error) && error.response) {
        setNotify(error.response.data)
      } else {
        console.error(error);
    }
  }}
  
  return (
    <>
      <h1>Diaries</h1>
      <p style={{color:'red'}}>
        {notify}
      </p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather</th>
            <th>Visibility</th>
          </tr>
        </thead>
        <tbody>
          {diaries.map((diary) => (
            <tr key={diary.id}>
              <td>{diary.date}</td>
              <td>{diary.weather}</td>
              <td>{diary.visibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add a new diary entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date</label>
          <input type='date' name='date' />
        </div>
        <br/>
        <div>
          <label>Weather</label>
          <input type="radio" name="weather" value="sunny" /> Sunny
          <input type="radio" name="weather" value="rainy" /> Rainy
          <input type="radio" name="weather" value="cloudy" /> Cloudy
          <input type="radio" name="weather" value="stormy" /> Stormy
          <input type="radio" name="weather" value="windy" /> Windy
        </div>
        <br/>
        <div>
          <label>Visibility</label>
          <input type="radio" name="visibility" value="great" /> Great
          <input type="radio" name="visibility" value="good" /> Good
          <input type="radio" name="visibility" value="ok" /> Ok
          <input type="radio" name="visibility" value="poor" /> Poor
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

export default App
