import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import ProblemList from '../components/ProblemList';

// import zustand problems
import { useProblemStore } from '../zustand';

const ProblemListLayout = ({ huron }) => {
	const hurones = [ 'Básicos', 'Intermedios', 'Avanzados' ];
	const problems = useProblemStore((state) => [
		state.basicos,
		state.intermedios,
		state.avanzados
	]);
	const totals = useProblemStore((state) => [
		state.totalBasicos,
		state.totalIntermedios,
		state.totalAvanzados
	])
	

	return (
		<Fragment>
			<Typography variant="h3">Hurones {hurones[huron - 1]}</Typography>
			<Typography variant="h6">Problemas resueltos: {totals[huron - 1]}/{problems[huron - 1].length}</Typography>
			<ProblemList problems={problems[huron - 1]} />
		</Fragment>
	);
};

export default ProblemListLayout;
