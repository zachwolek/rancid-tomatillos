import { useState, useEffect } from 'react';
import Movies from './Movies/Movies';
import Moviedetails from './Moviedetails/Moviedetails';
import {getMovies, getMovie} from './Api';
import StatusMessage from './StatusMessage';
import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
function App() {
  const [movie, setMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [focusDetails, setFocusDetails] = useState(false)
  const [focusId, setFocusId] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Loading... Taking a while? Try refreshing the page.')
  function updateId(id){
    setFocusId(id)
  };
const navigate = useNavigate()
  useEffect(()=>{
    getMovies()
      .then((response =>{
        console.log(response)
        if(response.ok){
          return response.json();
        } else {
          throw new Error ('Bad Request');
        }}))
      .then(data => {setMovies(data.movies)})
      .then(navigate('/movies', {replace: true}))
      .catch(error => console.error(error))
  },[]);

  useEffect(()=>{
    focusId ? getMovie(focusId)
      .then((response =>{
        setStatusMessage('Loading... Taking a while? Try refreshing the page.');
        if(response.ok){
        return response.json();
        }else{
          throw new Error ('Bad Request');
        }}))
      .then(data => {setMovie(data.movie); setFocusDetails(true); setStatusMessage('')})
      .catch(error => console.log(error))
    : setFocusDetails(false);
  },[focusId]);

  return (
    <main>
      <header>Rancid Tomatillos</header>
        <div className="center-view">
        <Routes>
          <Route path='/movies' element={<Movies movies = {movies} updateId = {updateId}/>}/>
          <Route path='/movies/:id' element={<Moviedetails updateId = {updateId} movie = {movie}/>}/>
          <Route path='*' element={<StatusMessage statusMessage={statusMessage}/>}/>
        </Routes>
        </div>
      <footer>---</footer>
    </main>
  );
};

export default App;
