import { createStore, useStore } from "vuex";

const store = createStore({
	state: {
		isLoading: false,
	},
	mutations: {
		isLoading(state, value) {
			//value : boolean;
			state.isLoading = value;
		},
	},
});

export default store;
//
// export default createStore({
// 	state: {
// 		isLoading: false,
// 	},
// 	mutations: {
// 		isLoading(value) {
// 			//value : boolean;
// 			state.boardDetail = value;
// 		},
// 	},
// });
const _store = useStore();

export const getStore = () => {
	if (_store) return store;
	return useStore();
};

export const STORE_TYPE = {
	isLoading: "isLoading",
};
