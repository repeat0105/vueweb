import axios from "axios";

export const fetch = {
  post: async (value) => {

    const res = await axios.post(
      process.env.VUE_APP_REPLY_URL + "/insert",
      value
    );
    return res.data;
  },

  get: async () => {
    const res = await axios(process.env.VUE_APP_REPLY_URL);
    return res.data;
  },
  put: async (value) => {

    const res = await axios.put(
      process.env.VUE_APP_REPLY_URL + `/update`,
      value
    );
    return res.data;
  },
  delete: async (num) => {
    const res = await axios.delete(
      process.env.VUE_APP_REPLY_URL + `/delete?num=${num}`
    );
    return res.data;
  },
};
