import './search.css'

import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import secret from "../secret";

export default function SearchPage() {
    // Allows us to redirect to another path
    const navigate = useNavigate()

    // Search up movie by calling TMDB API using search parameters
    const { searchParams } = useParams();
    const [searchResult, setSearchResult] = useState([]);
    const searchMovies = async() => {
        if (searchParams) {
            try {
                const url = `https://api.themoviedb.org/3/search/multi?query=${searchParams}&include_adult=${false}&language=en-US&page=${1}'`;
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
                        processedResult.push({"title": item.name || item.original_title, "cover": `https://image.tmdb.org/t/p/original${item.poster_path}`})
                    }
                }
                setSearchResult([...searchResult, ...processedResult]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
    useEffect(() => {searchMovies()}, [searchParams]);

    useEffect(() => {console.log(searchResult)}, [searchResult]);

    // Tracks what's entered in the search bar
    const [searchTitle, setSearchTitle] = useState(searchParams || "");

    return (
        <HelmetProvider>
            <Helmet>
                <title>Searching for...</title>
            </Helmet>
            <div>
                <input type="text" placeholder="Please Enter Title" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                <button onClick={() => navigate(`/search/${searchTitle}`)}>Search</button>
            </div>
            <div id="ResultsGallery">
                {searchResult.map((item, index) => {
                    return (
                        <div className="MovieBlock" key={`Movie${index + 1}`}>
                            <img className="MovieCover" src={item.cover}></img>
                            <div className="MovieTitleContainer">{item.title}</div>
                        </div>
                    )
                })}
            </div>
        </HelmetProvider>
    );
}