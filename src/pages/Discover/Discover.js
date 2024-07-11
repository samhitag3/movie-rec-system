import './Discover.css'

import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Movie from "../../components/Movie/Movie";

import secret from "../../secret";

export default function Discover() {
    // Allows us to redirect to another path
    const navigate = useNavigate()

    const [ sortBy, setSortBy ] = useState('');
    const [ withCast, setWithCast ] = useState('');
    const [ withCrew, setWithCrew ] = useState('');
    const [ withGenres, setWithGenres ] = useState('');
    const [ withKeywords, setWithKeywords ] = useState('');
    const [ year, setYear ] = useState('');

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    }

    const handleWithCastChange = (e) => {
        setWithCast(e.target.value);
    }

    const handleWithCrewChange = (e) => {
        setWithCrew(e.target.value);
    }

    const handleWithGenresChange = (e) => {
        setWithGenres(e.target.value);
    }

    const handleWithKeywordsChange = (e) => {
        setWithKeywords(e.target.value);
    }

    const handleYearChange = (e) => {
        setYear(e.target.value);
    }

    const [ discoverParams, setDiscoverParams ] = useState('');
    const [ discoverResult, setDiscoverResult ] = useState([]);
    const discoverMovies = async() => {
        if (discoverParams) {
            try {
                const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1${discoverParams}`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${secret.TMDB.API_read_access_token}`
                    }
                };

                const response = await fetch(url, options);
                
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const result = await response.json();
                const processedResult = [];
                
                if (result.total_results > 0) {
                    for (const item of result.results) {
                        if ((item.name || item.original_title) && item.poster_path) {
                            processedResult.push({"title": item.name || item.original_title, "cover": `https://image.tmdb.org/t/p/original${item.poster_path}`})
                        }
                    }
                }
                setDiscoverResult([...processedResult]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    useEffect(() => {discoverMovies()}, [discoverParams]);

    const onClickDiscover = () => {
        var discoverSTR = '&sort_by=';
        if (sortBy == 'Highest Revenue') {
            discoverSTR = discoverSTR + 'revenue.desc';
        } else if (sortBy == 'Title, A to Z') {
            discoverSTR = discoverSTR + 'title.asc';
        } else if (sortBy == 'Title, Z to A') {
            discoverSTR = discoverSTR + 'title.desc';
        } else {
            discoverSTR = discoverSTR + 'popularity.desc';
        }

        if (withCast != '') {
            discoverSTR = discoverSTR + "&with_cast=" + withCast.replace(' ', '%20');
        }

        if (withCrew != '') {
            discoverSTR = discoverSTR + "&with_crew=" + withCrew.replace(' ', '%20');
        }

        if (withGenres != '') {
            discoverSTR = discoverSTR + "&with_genres=" + withGenres.replace(' ', '%20');
        }

        if (withKeywords != '') {
            discoverSTR = discoverSTR + "&with_keywords=" + withKeywords.replace(' ', '%20');
        }

        if (year != '') {
            discoverSTR = discoverSTR + "&year=" + year;
        }

        setDiscoverParams(discoverSTR);
        navigate(`/discover/${discoverSTR}`);
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Discover</title>
            </Helmet>
                <div id='DiscoverBlock'>
                    <select
                        value={sortBy}
                        onChange={handleSortByChange}
                    >
                        <option value="">Sort By</option>
                        <option value="Most Popular">Most Popular</option>
                        <option value="Highest Revenue">Highest Revenue</option>
                        <option value="Title, A to Z">Title, A to Z</option>
                        <option value="Title, Z to A">Title, Z to A</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Cast"
                        spellCheck="false"
                        value={withCast}
                        onChange={handleWithCastChange}
                    />
                    <input
                        type="text"
                        placeholder="Crew"
                        spellCheck="false"
                        value={withCrew}
                        onChange={handleWithCrewChange}
                    />
                    <input
                        type="text"
                        placeholder="Genres"
                        spellCheck="false"
                        value={withGenres}
                        onChange={handleWithGenresChange}
                    />
                    <input
                        type="text"
                        placeholder="Keywords"
                        spellCheck="false"
                        value={withKeywords}
                        onChange={handleWithKeywordsChange}
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={year}
                        onChange={handleYearChange}
                    />
                    <button onClick={onClickDiscover}>Discover</button>

                    <div id="ResultsGallery" className="moviesContainer">
                    {discoverResult.map((item, index) => (
                        <Movie
                            key={index}
                            title={item.title}
                            cover={item.cover}
                        />
                    ))}
                </div>
            </div>
        </HelmetProvider>
    );
}