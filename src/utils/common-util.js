import { CONSTANTS } from '../constants.js';
import lzString from 'lz-string';

/**
 * 로컬 스토리지 저장
 * @param {string} key
 * @param {string | object} value
 */
const setLocalStorage = (key, value) => {
	if (typeof key === 'string') {
		if (typeof value === 'object') {
			value = makeJson(value);
		}
		const compData = lzString.compressToUTF16(value);
		window.localStorage.setItem(key, compData);
	} else {
		console.error(CONSTANTS.KEY_LIST.ALERT_LIST.INVALID_PARAM);
	}
};

/**
 * 로컬 스토리지에서 데이터 불러오기
 * @param {string} key
 * @returns {undefined|string}
 */
const getLocalStorage = key => {
	if (typeof key === 'string') {
		const compData = window.localStorage.getItem(key);
		return lzString.decompressFromUTF16(compData);
	} else {
		console.error(CONSTANTS.KEY_LIST.ALERT_LIST.INVALID_PARAM);
		return undefined;
	}
};

/**
 * json 형태 만들기
 * @param {any} value
 * @returns {string}
 */
const makeJson = value => {
	return JSON.stringify(value);
};

/**
 * 원래 형태로 복구
 * @param {string} value
 * @returns {any}
 */
const parseJson = value => {
	if (typeof value === 'string') {
		return JSON.parse(value);
	} else {
		console.error(CONSTANTS.KEY_LIST.ALERT_LIST.INVALID_PARAM);
		return undefined;
	}
};

/**
 * 데이터 빈값 체크
 * @param {object} form
 * @returns {boolean}
 */
const checkForm = form => {
	if (form) {
		for (let item in form) {
			if (form[item] === '' || form[item] === undefined || form[item] === null) {
				return false;
			}
		}
	}
	return true;
};

/**
 * image url 불러오기
 * @param {string} url
 * @returns {string}
 */
const getImageUrl = url => {
	//todo file-server url 연결
	return 'assets/image/profile.jpeg';
};

export default {
	getLocalStorage,
	setLocalStorage,
	makeJson,
	parseJson,
	checkForm,
	getImageUrl,
};
