import create from 'zustand';
import data from './db.json';
import axios from 'axios';
const { basicos, intermedios, avanzados } = data;

export const useUserStore = create((set) => ({
	user: {},
	error: false,
	fetchUser: async (handle) => {
		try {
			set({ user: {} });
			const response = await axios(
				`https://codeforces.com/api/user.info?handles=${handle}`
			);
			set({ user: response.data.result[0] });
		} catch (error) {
			set({ error: true });
		}
	}
}));

export const useProblemStore = create((set, get) => ({
	basicos,
	intermedios,
	avanzados,
	total: 0,
	totalBasicos: 0,
	totalIntermedios: 0,
	totalAvanzados: 0,
	error: false,
	fetchSolvedProblems: async (handle) => {
		set({ total: 0 })

		let cleared = [ ...basicos ];
		cleared.forEach((p) => {
			p.status = 0;
		});
		set({ basicos: cleared });

		cleared = [ ...intermedios ];
		cleared.forEach((p) => {
			p.status = 0;	
		});
		set({ intermedios: cleared });

		cleared = [ ...avanzados ];
		cleared.forEach((p) => {
			p.status = 0;
		});
		set({ avanzados: cleared });

		try {
			let totalProblemsSolved = 0;
			const response = await axios(
				`https://codeforces.com/api/user.status?handle=${handle}`
			);
			const solved = response.data.result.filter(
				(s) => s.verdict === 'OK'
			);

			let newBasicos = [ ...basicos ];
			newBasicos.forEach((problem) => {
				const solution = solved.find(
					(s) =>
						s.problem.contestId === problem.contest &&
						s.problem.index === problem.letter
				);
				if (solution && solution.verdict === 'OK') {
					problem.status = solution.id;
					totalProblemsSolved++;
				}
			});
			set({ basicos: newBasicos });
			set({ totalBasicos: totalProblemsSolved })

			totalProblemsSolved = 0;

			let newIntermedios = [ ...intermedios ];
			newIntermedios.forEach((problem) => {
				const solution = solved.find(
					(s) =>
						s.problem.contestId === problem.contest &&
						s.problem.index === problem.letter
				);
				if (solution && solution.verdict === 'OK') {
					problem.status = solution.id;
					totalProblemsSolved++;
				}
			});
			set({ intermedios: newIntermedios });
			set({ totalIntermedios: totalProblemsSolved });

			totalProblemsSolved = 0;

			let newAvanzados = [ ...avanzados ];
			newAvanzados.forEach((problem) => {
				const solution = solved.find(
					(s) =>
						s.problem.contestId === problem.contest &&
						s.problem.index === problem.letter
				);
				if (solution && solution.verdict === 'OK') {
					problem.status = solution.id;
					totalProblemsSolved++;
				}
			});
			set({ avanzados: newAvanzados });
			set({ totalAvanzados: totalProblemsSolved });

			set({ total: get().totalBasicos + get().totalIntermedios + get().totalAvanzados })
			console.log(get().total);
		} catch (error) {
			set({ error: true });
		}
	}
}));
