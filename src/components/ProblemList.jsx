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
	Hidden,
	Chip
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
								<TableRow key={`${problem.contest}${problem.letter}`}>
									<TableCell>{id + 1}</TableCell>
									<Hidden xsDown>
										<TableCell>
											<Link
												style={{color: "#20507A"}}
												href={`https://codeforces.com/problemset/problem/${problem.contest}/${problem.letter}`}
											>
												{problem.contest}-{problem.letter}
											</Link>
										</TableCell>
									</Hidden>
									<TableCell>
										<Link
											style={{color: "#20507A"}}
											rel="noopener"
											target="_blank"
											href={`https://codeforces.com/problemset/problem/${problem.contest}/${problem.letter}`}
										>
											{problem.name}
										</Link>
									</TableCell>
									<Hidden xsDown>
										<TableCell>
											{problem.difficulty}
										</TableCell>
									</Hidden>
									<Hidden xsDown>
										<TableCell>
											{problem.topics.map((t) => (
												<Chip
													size="small"
													label={t}
													style={{
														marginRight: '5px'
													}}
												/>
											))}
										</TableCell>
									</Hidden>
									<TableCell>
										{problem.status ? (
											<Button
												variant="contained"
												style={{backgroundColor: "#20507A", color: "#fff"}}
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
