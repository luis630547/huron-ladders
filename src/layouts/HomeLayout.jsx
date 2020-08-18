import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import Notification from '../components/Notification';

// zustand user, fetchAllInfo
import { useUserStore, useProblemStore } from '../zustand';

const HomeLayout = () => {
	const [ handle, setHandle ] = useState('');
	const [ error, setError ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ open, setOpen ] = useState(false);

	const fetchUser = useUserStore((state) => state.fetchUser);
	const fetchSolvedProblems = useProblemStore(
		(state) => state.fetchSolvedProblems
	);

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		try {
			setError(false);
			if (handle && handle.length > 3) {
				await fetchUser(handle);
				await fetchSolvedProblems(handle);
				setOpen(true);
				setIsLoading(false);
			} else {
				setError(true);
				setIsLoading(false);
			}
		} catch (error) {
			setError(true);
			setIsLoading(false);
		}
	};

	return (
		<div className="homeLayout">
			<Notification openState={open} />
			<Typography variant="h2" align="center">
				Huron Ladders
			</Typography>
			<Typography variant="subtitle1" align="center">
				Este es un proyecto open source creado para el Club de
				Algoritmia de ESCOM.
			</Typography>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					margin: '2rem 0'
				}}
			>
				{error === false ? (
					<TextField
						size="small"
						label="Codeforces handle"
						variant="outlined"
						value={handle}
						onChange={(e) => setHandle(e.target.value)}
						style={{ marginBottom: '1rem' }}
					/>
				) : (
					<TextField
						error
						helperText={`The user not exist`}
						size="small"
						label="Codeforces handle"
						variant="outlined"
						value={handle}
						onChange={(e) => setHandle(e.target.value)}
						style={{ marginBottom: '1rem' }}
					/>
				)}
				<Button
					type="submit"
					disabled={isLoading}
					variant="contained"
					color="primary"
				>
					Search
				</Button>
			</form>
		</div>
	);
};

export default HomeLayout;
