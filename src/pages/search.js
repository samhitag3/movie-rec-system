import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import secret from "../secret";

export default function SearchPage() {
    const navigate = useNavigate()

    const { searchParams } = useParams();
    const [searchTitle, setSearchTitle] = useState(searchParams || "");

    const searchResult = async() => {
        if (searchTitle != "") {
            try {
                console.log(`${secret["Rapid API"]["API_key"]}`);
                const url = `https://moviedatabase8.p.rapidapi.com/Search/${searchTitle}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': `${secret["Rapid API"]["API_key"]}`,
                        'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com'
                    }
                };
    
                const response = await fetch(url, options);
                
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Searching for...</title>
            </Helmet>
            <div>
                <input type="text" placeholder="Please Enter Title" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                <button onClick={() => navigate(`/search/${searchTitle}`)}>I dont do anything</button>
                <br/>
                <br/>
                <button onClick={() => searchResult()}>Get results</button>
            </div>
        </HelmetProvider>
    );
}