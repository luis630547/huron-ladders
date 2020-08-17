import React, { Fragment } from "react";
import { TableContainer, Paper, Table, TableHead, TableBody,Button, TableRow, TableCell, Link, LinearProgress } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';

const ProblemList = ({ problems, isLoading }) => {
    
    return (
        <Fragment>
            <TableContainer component={Paper} style={{marginTop: "1rem"}}>
                {isLoading && <LinearProgress />}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Key</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {problems.map((problem, id) => (
                        <TableRow key={id}>
                            <TableCell>{id+1}</TableCell>
                            <TableCell><Link href={`https://codeforces.com/problemset/problem/${problem.contest}/${problem.letter}`}>{problem.contest}-{problem.letter}</Link></TableCell>
                            <TableCell><Link href={`https://codeforces.com/problemset/problem/${problem.contest}/${problem.letter}`}>{problem.name}</Link></TableCell>
                            <TableCell>{problem.status ? (<Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                rel="noopener"
                                                                target="_blank"
                                                                href={`https://codeforces.com/contest/${problem.contest}/submission/${problem.status}`}
                                                                startIcon={<DoneIcon />}
                                                            >
                                                                {problem.status}
                                                            </Button>) : '-'}</TableCell>
                        </TableRow>
                    ))} 
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default ProblemList;