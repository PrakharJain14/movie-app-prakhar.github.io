import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import axios from 'axios';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );

        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
    }, []);

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };

    const addFavouriteMovie = (movie) => {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const handleSignUp = async (username, password) => {
        try {
            const response = await axios.post('/api/signup', { username, password });
            if (response.data.success) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Sign-up error', error);
        }
    };

    const handleSignIn = async (username, password) => {
        try {
            const response = await axios.post('/api/signin', { username, password });
            if (response.data.success) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Sign-in error', error);
        }
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <div className='container-fluid movie-app'>
            {!isAuthenticated ? (
                <div>
                    <SignIn onSignIn={handleSignIn} />
                    <SignUp onSignUp={handleSignUp} />
                </div>
            ) : (
                <>
                    <div className='row d-flex align-items-center mt-4 mb-4'>
                        <MovieListHeading heading='Movies' />
                        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                    </div>
                    <div className='row'>
                        <MovieList
                            movies={movies}
                            handleFavouritesClick={addFavouriteMovie}
                            favouriteComponent={AddFavourites}
                        />
                    </div>
                    <div className='row d-flex align-items-center mt-4 mb-4'>
                        <MovieListHeading heading='Playlist' />
                    </div>
                    <div className='row'>
                        <MovieList
                            movies={favourites}
                            handleFavouritesClick={removeFavouriteMovie}
                            favouriteComponent={RemoveFavourites}
                        />
                    </div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            )}
        </div>
    );
};

export default App;
