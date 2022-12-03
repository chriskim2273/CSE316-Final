/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (newListName, newSongs, userEmail) => {
    return api.post(`/playlist/`, {
        // SPECIFY THE PAYLOAD
        name: newListName,
        songs: newSongs,
        ownerEmail: userEmail
    })
}
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const getPlaylistPairs = () => api.get(`/playlistpairs/`)
export const updatePlaylistById = (id, playlist) => {
    return api.put(`/playlist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist: playlist
    })
}

export const publishPlaylist = (listName, songsList, userEmail, userName) => {
    return api.post(`/published/`, {
        // SPECIFY THE PAYLOAD
        name: listName,
        songs: songsList,
        ownerEmail: userEmail,
        ownerName: userName,
        likes: [],
        dislikes: [],
        comments: [],
    })
}


export const getPublishedById = (id) => api.get(`/published/${id}`)
export const getPublishedPairs = () => api.get(`/publishedpairs/`)
export const addPublishedRating = (id, userid, rating) => api.put(`/published_addrating/${id}/${userid}`, {
    rating: rating
})
export const addPublishedComment = (id, text, author) => api.put(`/published_addcomment/${id}`, {
    text: text,
    author: author
})

const apis = {
    publishPlaylist,
    createPlaylist,
    deletePlaylistById,
    getPlaylistById,
    getPlaylistPairs,
    updatePlaylistById,
    getPublishedById,
    getPublishedPairs,
    addPublishedRating,
    addPublishedComment
}

export default apis
