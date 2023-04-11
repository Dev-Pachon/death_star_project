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
        height: 400,
    },
});

function Planet({ planet }) {
    const classes = useStyles();
    const id = planet.url.replace('https://swapi.dev/api/planets/', '').replace('/', '')
    const [url, setUrl] = useState(null)

    const getPlanetImage = () => {
        const storageRef = ref(firebaseStorage, `planets/${id}.jpg`)
        getDownloadURL(storageRef).then((url) => {
            setUrl(url)
        }).catch(() => {
            axios.get(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
            .then(() => {
                setUrl(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
            }).catch(() => {
                setUrl(null)
            })
        })
    }

    useEffect(() => {
        getPlanetImage()
    }, [id])

    return (
        <Card
            className={classes.root}
            sx={{ mb: 2 }}
        >
            <CardActionArea component={Link} to={planet.url.replace('https://swapi.dev/api', '')}>
                {url ?
                    <CardMedia
                        className={classes.media}
                        image={url}
                        title="Planet"
                    />
                    :
                    <Skeleton variant="rectangular" height={200} />
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {planet.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {'Diameter: ' + planet.diameter}<br /> {'Climate: ' + planet.climate}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Planet