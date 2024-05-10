import Budget from './Budget'
import Genres from './Genres'
import './Moviedetails.css'
function Moviedetails({updateId, movie}){
    const _movie = movie.movieDetail.movie
    return(
    <article className="movie-details">
        <button id='0' className="exit" onClick={()=>{updateId(0)}}>Back</button> 
        <img src={_movie.backdrop_path}/>
        <img src={_movie.poster_path}/>
        <ul className='info'>
            <li className='title' aria-label='movie-title'>{_movie.title}</li>
            <li>{_movie.tagline}</li>
            <li className='bold'>Average Rating: {_movie.average_rating}</li>
            <Genres genres= {_movie.genres}/>
            <li>Runtime: {_movie.runtime}</li>
            <Budget budget= {_movie.budget}/>
            <li>{_movie.overview}</li>
            <li>{_movie.release_date}</li>
        </ul>
    </article>)
};

export default Moviedetails
