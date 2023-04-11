import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import axios from '../util/axios.js'
import Person from '../components/PersonCard.jsx'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function People() {

    const [people, setPeople] = useState([])
    const [next, setNext] = useState('')
    const [previous, setPrevious] = useState('')

    const renderPeople = () => {
        return people.map((person) => (
            <Person person={person} key={person.name} />
        ))
    }

    const getPeople = async (url) => {
        axios.get(url)
            .then((response) => {
                setPeople(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
    }

    useEffect(() => {
        getPeople('/people')
    }, [])

    return (
        <>
            {/* Hero unit */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 10,
                    pb: 8,
                }}
            >
                <Container maxWidth="sm" align="center">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Discover Characters
                    </Typography>
                    <img src="https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg" height={200} />
                    <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mt: 2 }}>
                        Find different personal details about your favorite characters and their path through the universe.
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="md" align="center">
                {renderPeople()}
            </Container>
            <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
            >
                <Button variant={previous ? "contained" : 'disabled'} onClick={() => getPeople(previous)}>Previous</Button>
                <Button variant={next ? "contained" : 'disabled'} onClick={() => getPeople(next)}>Next</Button>
            </Stack>
        </>
    )
}