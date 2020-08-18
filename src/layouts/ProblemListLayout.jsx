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

	return (
		<Fragment>
			<Typography variant="h3">Hurones {hurones[huron - 1]}</Typography>
			<ProblemList problems={problems[huron - 1]} />
		</Fragment>
	);
};

export default ProblemListLayout;
