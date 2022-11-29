import { createStore, useStore } from "vuex";
import { apiClient } from "../utils/axios.js";

export const STORE_TYPE = {
  isLoading: "isLoading",
  popupType: "popupType",
  loginUserIdx: "loginUserIdx",
  contentData: "contentData",
  commentIdx: "commentIdx",
  campInfo: "campInfo",
  sideBar: "sideBar",
  detailData: "detailData",
};

export const POPUP_TYPE = {
  NONE: "NONE",
  WRITE_BOARD: "WRITE_BOARD",
  DETAIL_SCREEN: "DETAIL_SCREEN",
  REPORT: "REPORT",
  UPDATE: "UPDATE",
  PRODUCT_DETAIL: "PRODUCT_DETAIL",
  PRODUCT_WRITE: "PRODUCT_WRITE",
  DETAIL_CAMPING: "DETAIL_CAMPING",
};

const store = createStore({
  state: {
    isLoading: false,
    popupType: POPUP_TYPE.NONE,
    loginUserIdx: "",
    contentData: [],
    commentIdx: "",
    popupList: [],
    campInfo: undefined,
    sideBar: false,
    detailData: [],
  },
  mutations: {
    /**
     * @param {store} state
     * @param {boolean} value
     */
    isLoading(state, value) {
      state.isLoading = value;
    },
    /**
     * @param {store} state
     * @param {POPUP_TYPE} value
     */
    popupType(state, value) {
      state.popupType = value;
    },
    /**
     * @param {store} state
     * @param {string} value
     */
    loginUserIdx(state, value) {
      state.loginUserIdx = value;
    },
    /**
     *
     * @param {store} state
     * @param {string} value
     */
    contentData(state, value) {
      state.contentData = value;
    },
    /**
     *
     * @param {store} state
     * @param {string} value
     */
    commentIdx(state, value) {
      state.commentIdx = value;
    },
    campInfo(state, value) {
      state.campInfo = value;
    },
    sideBar(state, value) {
      state.sideBar = value;
    },
    detailData(state, value) {
      state.detailData = value;
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
// const _store = useStore();

export const getStore = () => {
  return store;
};
