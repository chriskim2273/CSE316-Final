/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const PublishedController = require('../controllers/published-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)

router.post('/published', auth.verify, PublishedController.publishList)
router.post('/published/:id', auth.verify, PublishedController.duplicatePublishedList)
router.delete('/published/:id', auth.verify, PublishedController.unpublishList)
router.put('/published_addrating/:id/:userid', auth.verify, PublishedController.addRating)
router.put('/published_addcomment/:id', auth.verify, PublishedController.addComment)
router.get('/published/:id', auth.verify, PublishedController.getPublishedById)
router.get('/publishedpairs', auth.verify, PublishedController.getPublishedPairs)
router.get('/publisheds', auth.verify, PublishedController.getPublisheds)

module.exports = router