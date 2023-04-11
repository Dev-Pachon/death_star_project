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
import axios from '../util/axios.js'

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 600,
    },
});

function Person({ person }) {
    const classes = useStyles();
    const id = person.url.replace('https://swapi.dev/api/people/', '').replace('/', '')
    const [url, setUrl] = useState(null)

    const getPersonImage = () => {
        const storageRef = ref(firebaseStorage, `people/${id}.jpg`)
        getDownloadURL(storageRef).then((url) => {
            setUrl(url)
        }).catch(() => {
            axios.get(`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`)
            .then(() => {
                setUrl(`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`)
            }).catch(() => {
                setUrl(null)
            })
        })
    }

    useEffect(() => {
        getPersonImage()
    }, [id])

    return (
        <Card
            className={classes.root}
            sx={{ mb: 2 }}
        >
            <CardActionArea component={Link} to={person.url.replace('https://swapi.dev/api', '')}>
                {url ?
                    <CardMedia
                        className={classes.media}
                        image={url}
                        title="Person"
                    />
                    :
                    <Skeleton variant="rectangular" height={200} />
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {person.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { `Height: ${person.height}` } <br />
                        { `Mass: ${person.mass}` }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Person