import { fetch } from "@/api/ReplyServerboard";

export const replyBoard = {
  namespaced: true,
  state: {
    replydata: [],
  },
  getters: {},
  mutations: {
    async postDatareply(state, value) {

      await fetch.post(value);
      const res = await fetch.get();
      const ressort = res.sort((a, b) => {
        return b.num - a.num;
      });
      state.replydata = ressort;
    },

    async getDatareply(state) {
      const res = await fetch.get();
      const ressort = res.sort((a, b) => {
        return b.num - a.num;
      });
      state.replydata = ressort;
    },
    async setDatareply(state, value) {

      // console.log("state", state, "value", value);

      await fetch.put(value);
      const res = await fetch.get();
      const ressort = res.sort((a, b) => {
        return b.num - a.num;
      });
      state.replydata = ressort;
      const data = [...state.replydata];


      const set = data.map((obj) => {

        if (obj.num == value.num) {
          obj.replyboardnumtwo = value.replyboardnumtwo;
          obj.replyboardcontent = value.replyboardcontent;
        }
        return obj;
      });
      state.replydata = set;
    },

    async delDatareply(state, num) {

      await fetch.delete(num);

      const data = [...state.replydata];
      const set = data.filter((obj) => obj.num != num);
      state.replydata = set;
    },
  },
};
