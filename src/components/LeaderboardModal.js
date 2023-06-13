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
import { getLeaderboard } from '../firebase';

function LeaderboardModal() {
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
				</Box>
			</Modal>
		</div>
	);
}

export default LeaderboardModal;
