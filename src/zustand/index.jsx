import create from 'zustand';
import data from './db.json';
import axios from 'axios';
const { basicos, intermedios, avanzados } = data;

export const useUserStore = create((set, get) => ({
	user: {},
	error: false,
	fetchUser: async (handle) => {
		try {
			set({ user: {} });
			const response = await axios(
				`https://codeforces.com/api/user.info?handles=${handle}`
			);
			set({ user: response.data.result[0] });
			console.log(get().user);
		} catch (error) {
			set({ error: true });
		}
	}
}));

export const useProblemStore = create((set) => ({
	basicos,
	intermedios,
	avanzados,
	error: false,
	fetchSolvedProblems: async (handle) => {
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
				}
			});
			set({ basicos: newBasicos });

			let newIntermedios = [ ...intermedios ];
			newIntermedios.forEach((problem) => {
				const solution = solved.find(
					(s) =>
						s.problem.contestId === problem.contest &&
						s.problem.index === problem.letter
				);
				if (solution && solution.verdict === 'OK') {
					problem.status = solution.id;
				}
			});
			set({ intermedios: newIntermedios });

			let newAvanzados = [ ...avanzados ];
			newAvanzados.forEach((problem) => {
				const solution = solved.find(
					(s) =>
						s.problem.contestId === problem.contest &&
						s.problem.index === problem.letter
				);
				if (solution && solution.verdict === 'OK') {
					problem.status = solution.id;
				}
			});
			set({ avanzados: newAvanzados });
			console.log(basicos, intermedios, avanzados);
		} catch (error) {
			set({ error: true });
		}
	}
}));
