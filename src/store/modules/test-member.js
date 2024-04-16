import { fetch } from "@/api/TestMember";
import { fetchtwo } from "@/api/TestMember";

export const testMember = {
  namespaced: true,
  state: {
    data: [],
    ipinfo: "",
  },
  getters: {},
  mutations: {
    async getData(state) {
      const res = await fetch.get();

      const ressort = res.sort((a, b) => {
        return b.num - a.num;
      });
      state.data = ressort;
    },
    async postData(state, value) {

      await fetch.post(value);
      const res = await fetch.get();
      const ressort = res.sort((a, b) => {
        return b.num - a.num;
      });
      state.data = ressort;
   
    },
    async setData(state, value) {

      await fetch.put(value);
      const res = await fetch.get();
      const ressort = res.sort((a, b) => {
        return b.num - a.num;
      });
      state.data = ressort;
      const data = [...state.data];

      const set = data.map((obj) => {
        if (obj.num == value.num) {
          obj.name = value.name;
          obj.email = value.email;
        }
        return obj;
      });
      state.data = set;
    },

    async delData(state, num) {

      await fetch.delete(num);

      const data = [...state.data];
      const set = data.filter((obj) => obj.num != num);
      state.data = set;
    },

    async ipData(state) {
      let serveripinfo = await fetchtwo.get();
      state.ipinfo = serveripinfo;
    },
  },
  actions: {},
};
