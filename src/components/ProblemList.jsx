import React from 'react';
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableBody,
	Button,
	TableRow,
	TableCell,
	Link,
	LinearProgress,
	Grid,
	Hidden
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const ProblemList = ({ problems, isLoading }) => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<TableContainer component={Paper} style={{ margin: '1rem 0' }}>
					{isLoading && <LinearProgress />}
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<Hidden xsDown>
									<TableCell>Key</TableCell>
								</Hidden>
								<TableCell>Name</TableCell>
								<Hidden xsDown>
									<TableCell>Difficulty</TableCell>
								</Hidden>
								<Hidden xsDown>
									<TableCell>Topic</TableCell>
								</Hidden>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{problems.map((problem, id) => (
								<TableRow key={id}>
									<TableCell>{id + 1}</TableCell>
									<Hidden xsDown>
										<TableCell>
											<Link
												href={`https://codeforces.com/problemset/problem/${problem.contest}/${problem.letter}`}
											>
												{problem.contest}-{problem.letter}
											</Link>
										</TableCell>
									</Hidden>
									<TableCell>
										<Link
											rel="noopener"
											target="_blank"
											href={`https://codeforces.com/problemset/problem/${problem.contest}/${problem.letter}`}
										>
											{problem.name}
										</Link>
									</TableCell>
									<Hidden xsDown>
										<TableCell>easy</TableCell>
									</Hidden>
									<Hidden xsDown>
										<TableCell>sorting, math</TableCell>
									</Hidden>
									<TableCell>
										{problem.status ? (
											<Button
												variant="contained"
												color="primary"
												size="small"
												rel="noopener"
												target="_blank"
												href={`https://codeforces.com/contest/${problem.contest}/submission/${problem.status}`}
												startIcon={<DoneIcon />}
											>
												{problem.status}
											</Button>
										) : (
											'-'
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
};

export default ProblemList;
