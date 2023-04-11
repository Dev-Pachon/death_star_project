import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import axios from '../util/axios.js'
import Planet from '../components/PlanetCard.jsx'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function Planets() {

    const [planets, setPlanets] = useState([])
    const [next, setNext] = useState('')
    const [previous, setPrevious] = useState('')

    const renderPlanets = () => {
        return planets.map((planet) => (
            <Planet planet={planet} key={planet.name} />
        ))
    }

    const getPlanets = async (url) => {
        axios.get(url)
            .then((response) => {
                setPlanets(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
            })
    }

    useEffect(() => {
        getPlanets('/planets')
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
                        Visit Planets
                    </Typography>
                    <img src="https://media.gq.com.mx/photos/5e2368ce73e13600083c0175/16:9/pass/nasa-planeta-tatooine-star-wars.jpg" height={200} />
                    <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mt: 2 }}>
                        Have you ever wondered about the road your favorite characters had to travel? Here you can find out!
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="md" align="center">
                {renderPlanets()}
            </Container>
            <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
            >
                <Button variant={previous ? "contained" : 'disabled'} onClick={() => getPlanets(previous)}>Previous</Button>
                <Button variant={next ? "contained" : 'disabled'} onClick={() => getPlanets(next)}>Next</Button>
            </Stack>
        </>
    )
}