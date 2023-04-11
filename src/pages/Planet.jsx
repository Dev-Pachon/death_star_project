import { useState, useEffect } from 'react';
import { Box, Typography, Container, Skeleton, Stack, Button } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import axios from '../util/axios.js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { firebaseStorage } from '../util/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Planet = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState({})
    const [image, setImage] = useState({})
    const [show, setShow] = useState(true)

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const getPlanet = () => {
        axios.get(`/planets/${id}/`)
            .then((response) => {
                setPlanet(response.data)
            }).catch(() => {
                setShow(false)
                nothig()
            })
    }

    const getPlanetImage = () => {
        const storageRef = ref(firebaseStorage, `planets/${id}.jpg`)
        getDownloadURL(storageRef).then((url) => {
            setImage(url)
        }).catch(() => {
            axios.get(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
            .then(() => {
                setImage(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
            }).catch(() => {
                setImage(null)
            })
        })
    }

    useEffect(() => {
        getPlanet()
        getPlanetImage()
    }, [id])

    const nothig = () => {
        MySwal.fire({
            title: <p>Nothing to see here</p>,
            icon: 'error',
            confirmButtonText: 'Back to planets',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/planets')
            }
        })
    }

    const upload = async () => {
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your profile picture'
            }
          })
          
          if (file) {
            const storageRef = ref(firebaseStorage, `planets/${id}.jpg`)
            await uploadBytes(storageRef, file)
            .then(() => {
                MySwal.fire({
                    title: <p>Image uploaded</p>,
                    icon: 'success',
                })
            })
            getPlanetImage()
          }
    }

    return (<>
        {show ?
            <Box>
                <Container maxWidth="sm" align="center">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        {planet.name}
                    </Typography>
                    {image ? <img src={image} height={320} /> : <Skeleton variant="rectangular" height={320} />}
                    <Typography variant="h5" align="left" color="text.secondary" paragraph sx={{ mt: 2 }}>
                        <b>{`Rotation Period: `}</b>
                        {`${planet.rotation_period}`} <br />
                        <b>{`Orbital Period: `}</b>
                        {`${planet.orbital_period}`} <br />
                        <b>{`Diameter: `}</b>
                        {`${planet.diameter}`} <br />
                        <b>{`Climate: `}</b>
                        {`${planet.climate}`} <br />
                        <b>{`Gravity: `}</b>
                        {`${planet.gravity}`} <br />
                        <b>{`Terrain: `}</b>
                        {`${planet.terrain}`} <br />
                        <b>{`Surface Water: `}</b>
                        {`${planet.surface_water}`} <br />
                        <b>{`Population: `}</b>
                        {`${planet.population}`}
                    </Typography>
                </Container>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={() => upload()}>Upload image</Button>
                </Stack>
            </Box> : null}
    </>
    )
}

export default Planet