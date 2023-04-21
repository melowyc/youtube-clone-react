import axios  from "axios";

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    params: { maxResults:50 },
    headers: {
        'X-RapidAPI-Key': "86d58ad5famsh3e3439f46cd932cp12363bjsn4665c150c8fc",
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
    
};
console.log("env"+process.env.REACT_APP_RAPID_API_KEY);

export const fetchFromAPI = async (url) => {
    
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    return data;
};
