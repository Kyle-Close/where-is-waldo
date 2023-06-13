import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

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
				<DialogTitle id='form-dialog-title'>Enter Your Name</DialogTitle>
				<DialogContent>
					<DialogContentText>Please enter your name.</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Name'
						type='text'
						fullWidth
						onChange={handleNameChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color='primary'
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						color='primary'
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default GetNameModal;
