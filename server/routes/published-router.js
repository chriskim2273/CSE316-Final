/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PublishedController = require('../controllers/published-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/published', auth.verify, PublishedController.publishList)
/*
router.delete('/published/:id', auth.verify, PublishedController.deletePlaylist)
router.get('/published/:id', auth.verify, PublishedController.getPlaylistById)
router.get('/publishedpairs', auth.verify, PublishedController.getPlaylistPairs)
router.get('/published', auth.verify, PublishedController.getPlaylists)
router.put('/published/:id', auth.verify, PublishedController.updatePlaylist)
*/
module.exports = router