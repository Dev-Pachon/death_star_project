import {
	Container,
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Stack,
	Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	root: {
		maxWidth: 300,
	},
	media: {
		height: 140,
	},
});

function Home() {
	const classes = useStyles();
	return (
		<Container maxWidth="md" sx={{ marginTop: '4rem', textAlign: 'center' }}>
			<Typography variant="h3" component="h1" gutterBottom>
				Welcome to the Star Wars Universe
			</Typography>
			<Typography variant="body1" sx={{ marginBottom: '2rem' }}>
				Explore the galaxy, discover new worlds, and meet new characters.
			</Typography>
			<Stack
				direction="row"
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
			>
				<Card
					className={classes.root}>
					<CardActionArea component={Link} to="/starships">
						<CardMedia
							className={classes.media}
							image={"https://hips.hearstapps.com/hmg-prod/images/veh-ia-1751-1576604159.jpg?crop=0.684xw:0.577xh;0.134xw,0.247xh&resize=1920:*"}
							title="Starship"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Explore Starships
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Discover the technical details and history of all the starships in the Star Wars galaxy.
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				<Card
					className={classes.root}>
					<CardActionArea component={Link} to="/people">
						<CardMedia
							className={classes.media}
							image={"https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg"}
							title="Darth Vader"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Discover Characters
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Find different personal details about your favorite characters and their path through the universe.
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				<Card
					className={classes.root}>
					<CardActionArea component={Link} to="/planets">
						<CardMedia
							className={classes.media}
							image={"https://media.gq.com.mx/photos/5e2368ce73e13600083c0175/16:9/pass/nasa-planeta-tatooine-star-wars.jpg"}
							title="Tatooine"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								Visit Planets
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								Have you ever wondered about the road your favorite characters had to travel? Here you can find out!
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Stack>
		</Container>
	);
}

export default Home;
