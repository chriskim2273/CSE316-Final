
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import logo from '../logo.png'
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <Box sx={{ display: 'grid' }} gap={4}>
                <Box>
                    <img src={logo} alt={'logo'}>
                    </img>
                </Box>
                <Box sx={{ marginTop: '-210px' }}>
                    <Typography variant="h2" component="h2" sx={{ textDecoration: 'underline' }} display="inline">
                        Welcome to Playlister!
                    </Typography>
                    <Typography variant="h5" component="h5" sx={{ marginTop: '-30px' }}>
                        Create, Edit, and Publish Youtube Playlists
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '50px'
                    }} gap={5}>
                        <Button size='large' variant="contained" href="/login/">Login</Button>
                        <Button size='large' variant="contained" href="/register/">Register</Button>
                        <Button size='large' variant="contained">Continue As Guest</Button>
                    </Box>
                </Box>

            </Box>
        </div >
    )
}