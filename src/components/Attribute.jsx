import {Typography} from "@mui/material";

export default function Attribute({name, value}) {
	return (
		<>
			{value !== "n/a" ? <><Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
					{name}:
				</Typography>
					<Typography variant="h5" gutterBottom>
						{value}
					</Typography>
				</>
				: null}
		</>
	)
}