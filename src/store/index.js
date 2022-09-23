import { createStore } from 'vuex';

export default createStore({
	state: {
		isLoading: false,
	},
	getters: {
		isLoading() {
			return state.boardDetail;
		},
	},
	mutations: {
		isLoading(value) {
			//value : boolean;
			state.boardDetail = value;
		},
	},
});

export const STORE_TYPE = {
	isLoading: 'isLoading',
};
