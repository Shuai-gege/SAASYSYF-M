const eventInfo = {
  state: {
    oEventInfo: null,
  },

  mutations: {
    SET_EVENT: (state, value) => {
      state.oEventInfo = value;
    },
    SET_EVENT_USER: (state, user) => {
      state.oEventInfo.assignerId = user.id;
      state.oEventInfo.userName = user.name;
    },
    SET_EVENT_EQUIP: (state, equip) => {
      state.oEventInfo.aDevice = equip;
    },
  },

  actions: {
    setEvent({ commit }, value) {
      commit("SET_EVENT", value);
    },
    setEventUser({ commit }, value) {
      commit("SET_EVENT_USER", value);
    },
    setEventEquip({ commit }, value) {
      commit("SET_EVENT_EQUIP", value);
    },
    //用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userApi
          .getInfo({
            token: state.token,
          })
          .then((res) => {
            if (res.result) {
              commit("SET_USER_INFO", res.result.userInfo);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        userApi
          .logOut({
            token: state.token,
          })
          .then(() => {
            commit("SET_TOKEN", "");
            Storage.cle();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
export default eventInfo;
