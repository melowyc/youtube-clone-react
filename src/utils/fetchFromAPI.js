import axios from "axios";
import { videoRoute } from "./APIRoutes.js";

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    params: { maxResults: 50 },
    headers: {
        'X-RapidAPI-Key': "86d58ad5famsh3e3439f46cd932cp12363bjsn4665c150c8fc",
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }

};
console.log("env" + process.env.REACT_APP_RAPID_API_KEY);

export const fetchFromAPI = async (url) => {

    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    return data;
};

export const getVideoComment = async (videoId) => {
    const getVideoCommentUrl = `${videoRoute}/${videoId}/getcomments`;
    console.log("getting video comments using url: ", getVideoCommentUrl)

    try {
        const response = await axios.get(getVideoCommentUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000 // Set a timeout to prevent the request from hanging indefinitely
        });
        console.log("got video data: ", response);
        return response.data;

    } catch (error) {
        console.log("error getting video data: ", error);
        throw error;
    }
}

export const addVideoComment = async (videoId, videoComment) => {
    const addVideoCommentUrl = `${videoRoute}/${videoId}/addcomment`;
    console.log("adding video comment", videoComment,  " using url: ", addVideoCommentUrl)

    try {
        const response = await axios.post(addVideoCommentUrl, videoComment, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000, // Set a timeout to prevent the request from hanging indefinitely
        });
        console.log("add video comment response: ", response);
        return response;

    } catch (error) {
        console.log("error getting video data: ", error);
        throw error;
    }
}

export const deleteVideoComment = async (cid) => {
    const deleteVideoCommentUrl = `${videoRoute}/deletecomment/${cid}/`;
    console.log("deleting video comment with cid", cid,  " using url: ", deleteVideoCommentUrl)

    try {
        const response = await axios.delete(deleteVideoCommentUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000, // Set a timeout to prevent the request from hanging indefinitely
        });
        console.log("add video comment response: ", response);
        return response;

    } catch (error) {
        console.log("error getting video data: ", error);
        throw error;
    }
}

export const updateVideoComment = async (cid, newContent) => {
    const updateVideoCommentUrl = `${videoRoute}/updatecomment/${cid}/`;
    console.log("updating video comment with cid", cid,  " using url: ", updateVideoCommentUrl)

    try {
        const response = await axios.put(updateVideoCommentUrl, {"commentContent": newContent}, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000, // Set a timeout to prevent the request from hanging indefinitely
        });
        console.log("add video comment response: ", response);
        return response;

    } catch (error) {
        console.log("error getting video data: ", error);
        throw error;
    }
}