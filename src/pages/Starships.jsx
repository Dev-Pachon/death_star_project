import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import axios from '../util/axios.js'
import Starship from '../components/Starship.jsx'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function Starships() {

  const [starships, setStarships] = useState([])
  const [next, setNext] = useState('')
  const [previous, setPrevious] = useState('')

  const renderStarships = () => {
    return starships.map((starship) => (
      <Starship starship={starship} key={starship.name} />
    ))
  }

  const getStarships = async (url) => {
    axios.get(url)
      .then((response) => {
        setStarships(response.data.results)
        setNext(response.data.next)
        setPrevious(response.data.previous)
      })
  }

  useEffect(() => {
    getStarships('/starships')
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
            Explore Starships
          </Typography>
          <img src="https://hips.hearstapps.com/hmg-prod/images/veh-ia-1751-1576604159.jpg?crop=0.684xw:0.577xh;0.134xw,0.247xh&resize=1920:*" height={200} />
          <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mt: 2 }}>
            Discover the technical details and history of all the starships in the Star Wars galaxy.
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="md">
        {renderStarships()}
      </Container>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        <Button variant={previous ? "contained" : 'disabled'} onClick={() => getStarships(previous)}>Previous</Button>
        <Button variant={next ? "contained" : 'disabled'} onClick={() => getStarships(next)}>Next</Button>
      </Stack>
    </>
  )
}