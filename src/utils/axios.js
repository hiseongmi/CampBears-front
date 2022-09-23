import axios from 'axios';
// import { useStore } from 'vuex';
// import { STORE_TYPE } from '../store/index.js';
import { CONSTANTS } from '../constants.js';

// const store = useStore();

const axiosInstance = axios.create({
	baseURL: CONSTANTS.API_URL,
	timeout: 1000,
	headers: { 'contents-type': 'Json' },
});

// axiosInstance.interceptors.request.use(
// 	() => {
// 		store.commit(STORE_TYPE.isLoading, true);
// 		console.log('pending..');
// 	},
// 	e => {
// 		if (CONSTANTS.DEVELOP) console.error(e);
// 	},
// );
//
// axiosInstance.interceptors.response.use(
// 	() => {
// 		store.commit(STORE_TYPE.isLoading, false);
// 		console.log('complete');
// 	},
// 	e => {
// 		if (CONSTANTS.DEVELOP) console.error(e);
// 	},
// );

export const apiClient = async (url, data) => {
	return await axiosInstance
		.post(url, data)
		.then(res => {
			if (res.status === 200) {
				return res.data;
			} else {
				return undefined;
			}
		})
		.catch(e => {
			// throw e
			console.error(e);
		});
};
