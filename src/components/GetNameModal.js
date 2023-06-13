import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box'; // import Box for centering

function GetNameModal({ setPlayerName }) {
	const [open, setOpen] = useState(true);
	const [name, setName] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleSubmit = () => {
		if (name !== '') {
			setPlayerName(name);
			setOpen(false);
		}
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle
					id='form-dialog-title'
					sx={{ textAlign: 'center' }}
				>
					Enter Your Name
				</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<DialogContentText>Please enter your name.</DialogContentText>
					</Box>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Name'
						type='text'
						fullWidth
						onChange={handleNameChange}
						sx={{ mt: 2 }} // Adds some margin at the top
					/>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center' }}>
					{' '}
					<Button
						onClick={handleSubmit}
						color='primary'
						variant='contained' // Make the button filled
						size='large' // Increase the size of the button
						sx={{ px: 4, mb: 3 }} // Add some padding to the sides of the button
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default GetNameModal;
