import { useState, useEffect } from 'react';
import { Box, Typography, Container, Skeleton, Stack, Button } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import axios from '../util/axios.js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { firebaseStorage } from '../util/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Person = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({})
    const [image, setImage] = useState({})
    const [show, setShow] = useState(true)

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const getPerson = () => {
        axios.get(`/people/${id}/`)
            .then((response) => {
                setPerson(response.data)
            }).catch(() => {
                setShow(false)
                nothig()
            })
    }

    const getPersonImage = () => {
        const storageRef = ref(firebaseStorage, `people/${id}.jpg`)
        getDownloadURL(storageRef).then((url) => {
            setImage(url)
        }).catch(() => {
            axios.get(`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`)
            .then(() => {
                setImage(`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`)
            }).catch(() => {
                setImage(null)
            })
        })
    }

    useEffect(() => {
        getPerson()
        getPersonImage()
    }, [id])

    const nothig = () => {
        MySwal.fire({
            title: <p>Nothing to see here</p>,
            icon: 'error',
            confirmButtonText: 'Back to people',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/people')
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
            const storageRef = ref(firebaseStorage, `people/${id}.jpg`)
            await uploadBytes(storageRef, file)
            .then(() => {
                MySwal.fire({
                    title: <p>Image uploaded</p>,
                    icon: 'success',
                })
            })
            getPersonImage()
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
                        {person.name}
                    </Typography>
                    {image ? <img src={image} height={320} /> : <Skeleton variant="rectangular" height={320} />}
                    <Typography variant="h5" align="left" color="text.secondary" paragraph sx={{ mt: 2 }}>
                        <b>{`Height: `}</b>
                        {`${person.height}`} <br />
                        <b>{`Mass: `}</b>
                        {`${person.mass}`} <br />
                        <b>{`Hair color: `}</b>
                        {`${person.hair_color}`} <br />
                        <b>{`Skin color: `}</b>
                        {`${person.skin_color}`} <br />
                        <b>{`Eye color: `}</b>
                        {`${person.eye_color}`} <br />
                        <b>{`Birth year: `}</b>
                        {`${person.birth_year}`} <br />
                        <b>{`Gender: `}</b>
                        {`${person.gender}`}
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

export default Person