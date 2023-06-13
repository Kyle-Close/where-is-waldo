import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { getLeaderboard } from '../firebase';

function LeaderboardModal({ handlePlayAgain }) {
	const [open, setOpen] = useState(true);
	const [leaderboard, setLeaderboard] = useState([]);

	useEffect(() => {
		async function fetchLeaderboard() {
			const leaderboardData = await getLeaderboard();
			setLeaderboard(leaderboardData);
		}

		fetchLeaderboard();
	}, []);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Modal
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				open={open}
				onClose={handleClose}
				aria-labelledby='leaderboard-modal-title'
				aria-describedby='leaderboard-modal-description'
			>
				<Box
					sx={{
						backgroundColor: 'background.paper',
						boxShadow: 5,
						padding: 2,
					}}
				>
					<Typography
						variant='h6'
						id='leaderboard-modal-title'
						sx={{
							marginBottom: 2, // adds a margin-bottom of 16px (1 = 8px in Material UI)
							textAlign: 'center', // centers the text
						}}
					>
						Leaderboard
					</Typography>

					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Rank</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Time (seconds)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{leaderboard.map((entry, index) => (
									<TableRow key={index}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{entry.name}</TableCell>
										<TableCell>{entry.time}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Button
						onClick={handlePlayAgain}
						variant='contained'
						color='primary'
						sx={{
							marginTop: 2, // this adds a margin-top of 16px (1 = 8px in Material UI)
							display: 'block', // this makes the button a block-level element
							marginLeft: 'auto', // these two lines center the block-level element
							marginRight: 'auto',
						}}
					>
						Play Again
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

export default LeaderboardModal;
