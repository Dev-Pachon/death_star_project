import {
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent
} from '@mui/material';
import { makeStyles } from "@mui/styles"
import { Link } from "react-router-dom"
import Skeleton from '@mui/material/Skeleton'
import { ref, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from '../util/firebase.js'
import { useState, useEffect } from 'react'

const useStyles = makeStyles({
    root: {
        maxWidth: 1000,
    },
    media: {
        height: 200,
    },
});

function Starship({ starship }) {
    const classes = useStyles();
    const id = starship.url.replace('https://swapi.dev/api/starships/', '').replace('/', '')
    const [url, setUrl] = useState(null)

    const getStarshipImage = () => {
        const storageRef = ref(firebaseStorage, `starships/${id}.jpg`)
        getDownloadURL(storageRef).then((url) => {
            setUrl(url)
        }).catch(() => {
            setUrl(null)
        })
    }

    useEffect(() => {
        getStarshipImage()
    }, [id])

    return (
        <Card
            className={classes.root}
            sx={{ mb: 2 }}
        >
            <CardActionArea component={Link} to={starship.url.replace('https://swapi.dev/api', '')}>
                {url ?
                    <CardMedia
                        className={classes.media}
                        image={url}
                        title="Starship"
                    />
                    :
                    <Skeleton variant="rectangular" height={200} />
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {starship.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {'Model: ' + starship.model}<br /> {'Manufacturer: ' + starship.manufacturer}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Starship