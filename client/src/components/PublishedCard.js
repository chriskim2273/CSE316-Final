import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Button, Grid, Modal } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List } from '@mui/material';
import SongCard from './SongCard';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import AuthContext from '../auth';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function PublishedCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [updatedList, setUpdatedList] = useState(false);

    function refreshOnUpdate() {
        setUpdatedList(!updatedList);
    }
    const { idNamePair, selected, is_expanded, setExpanded } = props;
    const { auth } = useContext(AuthContext);

    let songs = store.currentList ? (store.currentList.songs ? store.currentList.songs : []) : []

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentPublishedList(id);
            //setText("Joe");
            //setText("");
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        if (id == null) {
            id = _id;
        }
        store.markListForDeletion(id);
    }

    async function handlePublishList(event) {
        if (store.currentList != "null") {
            event.stopPropagation();
            store.publishPlaylist(store.currentList.name, store.currentList.songs);
        }
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    const handleChange = (isExpanded, panel) => {
        console.log("panel: " + panel);
        console.log("expanded: " + is_expanded)
        setExpanded(isExpanded ? panel : false);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }


    console.log("Songs: " + songs);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleDuplicateList() {
        store.duplicateList(store.currentList.name, store.currentList.songs);
        refreshOnUpdate();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentPublishedList();
    }

    const getLikesAndDislikes = () => {
        if (store.currentList != null) {
            if (store.currentList.likes != null && store.currentList.dislikes != null) {
                return {
                    likes: store.currentList.likes.length,
                    dislikes: store.currentList.dislikes.length
                }
            }
        }
        else {
            return {
                likes: "?",
                dislikes: "?"
            }
        }
    }

    const buttonDisabled = (likeButton) => {
        if (store.currentList != null) {
            if (likeButton) {
                if (store.currentList.likes != null) {
                    if (store.currentList.likes.includes(auth.user.email)) {
                        return true;
                    }
                    return false;
                }
                return true;
            }
            else {
                if (store.currentList.dislikes != null) {
                    if (store.currentList.dislikes.includes(auth.user.email)) {
                        return true;
                    }
                    return false;
                }
                return true;
            }
        }
        return true;
    }

    function handleAddRating(event, rating) {
        store.addRating(rating);
        //handleLoadList(event, idNamePair._id);
    }

    function returnPublishDate() {
        if (store.currentList != null) {
            if (store.currentList.createdAt != null) {
                let dStr = new Date(store.currentList.createdAt).toDateString();
                return dStr;
            }
        }
    }

    function returnListens() {
        if (store.currentList != null) {
            if (store.currentList.listens != null) {
                return store.currentList.listens;
            }
        }
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ borderRadius: "25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{ transform: "translate(1%,0%)", width: '98%', fontSize: '48pt' }}
            button
        //onClick={(event) => {
        //   handleExpand();
        //}}
        >

            <Accordion
                onChange={(event, isExpanded) => {
                    handleChange(isExpanded, idNamePair._id);
                    if (isExpanded) {
                        handleLoadList(event, idNamePair._id);
                    }
                    if (store.canClose()) {
                        handleClose();
                    }
                    store.addListen();
                }}
                sx={{ width: "100%" }}
                expanded={is_expanded === idNamePair._id && store.currentList != null}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={"panel-content-" + idNamePair._id}
                    id={"panel-header-" + idNamePair._id}
                >
                    <Box
                        sx={{ display: 'grid' }}
                    >
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                        <Typography> By {auth.getUserName().firstName + " " + auth.getUserName().lastName} </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <List
                            id="playlist-cards"
                            sx={{ overflow: 'scroll', height: '35vh', width: '100%', bgcolor: '#8000F00F' }}
                        >
                            {
                                songs.map((song, index) => (
                                    <SongCard
                                        id={'playlist-song-' + (index)}
                                        key={'playlist-song-' + (index)}
                                        index={index}
                                        song={song}
                                        removable={false}
                                    />
                                ))
                            }
                        </List>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Button
                                    onClick={(event) => {
                                        handleDuplicateList(store.currentList.name, store.currentList.songs);
                                    }}>Duplicate</Button>
                            </Box>
                            <Box
                                sx={{ display: 'flex' }}
                                gap={1}>
                                <Box>
                                    <Typography>{"Posted on " + returnPublishDate()
                                    }</Typography>
                                    <Typography><VisibilityIcon />{" " + returnListens()}</Typography>
                                </Box>
                                <Button
                                    sx={{ display: 'flex' }}
                                    color={
                                        buttonDisabled(true) ? "secondary" : "primary"
                                    }
                                    onClick={(event) => {
                                        handleAddRating(event, 1);
                                    }}>
                                    <ThumbUpIcon />
                                    <Typography>{getLikesAndDislikes().likes}</Typography>
                                </Button>
                                <Button
                                    sx={{ display: 'flex' }}
                                    color={
                                        buttonDisabled(false) ? "secondary" : "primary"
                                    }
                                    onClick={(event) => {
                                        handleAddRating(event, -1);
                                    }}>
                                    <ThumbDownIcon />
                                    <Typography>{getLikesAndDislikes().dislikes}</Typography>
                                </Button>
                            </Box>
                        </Grid>
                        {modalJSX}
                    </Box>
                </AccordionDetails>
            </Accordion>

        </ListItem >

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 48 } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default PublishedCard;