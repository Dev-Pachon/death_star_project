import {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {useParams} from "react-router-dom";

export default function PeopleDetails() {
	const {id} = useParams();
	const [character, setCharacter] = useState(null);
	useEffect(() => {
		const fetchCharacter = async () => {
			const response = await fetch(`https://swapi.dev/api/people/${id}/`);
			const data = await response.json();
			setCharacter(data);
		};
		fetchCharacter()
	}, [id]);

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			{character && (
				<>
					<Typography variant="h3" sx={{mt: '2rem', fontWeight: 'bold'}}>
						{character.name}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							mt: '2rem',
							bgcolor: '#F8F8F8',
							borderRadius: '10px',
							boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
							padding: '2rem',
							maxWidth: '1200px',
							minWidth: '600px',
						}}
					>
						<img
							src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
							alt={character.name}
							height="400"
							sx={{borderRadius: '10px'}}
						/>
						<Box sx={{ml: '2rem'}}>
							<Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
								Height:
							</Typography>
							<Typography variant="h5" gutterBottom>
								{character.height} cm
							</Typography>
							<Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
								Mass:
							</Typography>
							<Typography variant="h5" gutterBottom>
								{character.mass} kg
							</Typography>
							<Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
								Hair Color:
							</Typography>
							<Typography variant="h5" gutterBottom>
								{character.hair_color}
							</Typography>
							<Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
								Skin Color:
							</Typography>
							<Typography variant="h5" gutterBottom>
								{character.skin_color}
							</Typography>
							<Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
								Eye Color:
							</Typography>
							<Typography variant="h5" gutterBottom>
								{character.eye_color}
							</Typography>
							<Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
								Birth Year:
							</Typography>
							<Typography variant="h5" gutterBottom>
								{character.birth_year}
							</Typography>
						</Box>
					</Box>
				</>
			)}
		</Box>
	);
}