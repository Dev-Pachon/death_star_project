import { useState, useEffect } from 'react';
import { Box, Typography, Container, Skeleton, Stack, Button } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import axios from '../util/axios.js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { firebaseStorage } from '../util/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Starship = () => {
    const { id } = useParams();
    const [starship, setStarship] = useState({})
    const [image, setImage] = useState({})
    const [show, setShow] = useState(true)

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const getStarship = () => {
        axios.get(`/starships/${id}/`)
            .then((response) => {
                setStarship(response.data)
            }).catch(() => {
                setShow(false)
                nothig()
            })
    }

    const getStarshipImage = () => {
        const storageRef = ref(firebaseStorage, `starships/${id}.jpg`)
        getDownloadURL(storageRef).then((url) => {
            setImage(url)
        }).catch(() => {
            setImage(null)
        })
    }

    useEffect(() => {
        getStarship()
        getStarshipImage()
    }, [id])

    const nothig = () => {
        MySwal.fire({
            title: <p>Nothing to see here</p>,
            icon: 'error',
            confirmButtonText: 'Back to starships',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/starships')
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
            const storageRef = ref(firebaseStorage, `starships/${id}.jpg`)
            await uploadBytes(storageRef, file)
            .then(() => {
                MySwal.fire({
                    title: <p>Image uploaded</p>,
                    icon: 'success',
                })
            })
            getStarshipImage()
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
                        {starship.name}
                    </Typography>
                    {image ? <img src={image} height={320} /> : <Skeleton variant="rectangular" height={320} />}
                    <Typography variant="h5" align="left" color="text.secondary" paragraph sx={{ mt: 2 }}>
                        <b>{`Model: `}</b>
                        {`${starship.model}`} <br />
                        <b>{`Manufacturer: `}</b>
                        {`${starship.manufacturer}`} <br />
                        <b>{`Cost in credits: `}</b>
                        {`${starship.cost_in_credits}`} <br />
                        <b>{`Length: `}</b>
                        {`${starship.length}`} <br />
                        <b>{`Max atmosphering speed: `}</b>
                        {`${starship.max_atmosphering_speed}`} <br />
                        <b>{`Crew: `}</b>
                        {`${starship.crew}`} <br />
                        <b>{`Passengers: `}</b>
                        {`${starship.passengers}`} <br />
                        <b>{`Cargo capacity: `}</b>
                        {`${starship.cargo_capacity}`} <br />
                        <b>{`Consumables: `}</b>
                        {`${starship.consumables}`} <br />
                        <b>{`Hyperdrive rating: `}</b>
                        {`${starship.hyperdrive_rating}`} <br />
                        <b>{`MGLT: `}</b>
                        {`${starship.MGLT}`} <br />
                        <b>{`Starship class: `}</b>
                        {`${starship.starship_class}`} <br />
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

export default Starship