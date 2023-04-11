import {
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent
} from '@mui/material';
import {makeStyles} from "@mui/styles"
import {Link} from "react-router-dom"
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles({
	root: {
		maxWidth: 1000,
	},
	media: {
		height: 200,
	},
});

function Starship({starship}) {
    const classes = useStyles();
    return (
        <Card
            className={classes.root}
            sx={{mb:2}}
        >
            <CardActionArea component={Link} to="/starships">
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {starship.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {'Model: '+starship.model+'\nManufacturer: '+starship.manufacturer}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Starship