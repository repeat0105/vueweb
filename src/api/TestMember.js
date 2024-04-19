import axios from "axios";

export const fetch = {
    create:async () => {
        const res = await axios(process.env.VUE_APP_ALL + '/create');
        return res.data
    },

    get: async ()=>{
        const res = await axios(process.env.VUE_APP_ALL);
        return res.data
    },
    post: async (value)=>{
 
        const res = await axios.post(process.env.VUE_APP_ALL+'/insert', value);
        return res.data
    },

    put: async (value)=>{
  
        const res = await axios.put(process.env.VUE_APP_ALL+`/update`, value);
        return res.data
    },
    delete: async (num)=>{
        const res = await axios.delete(process.env.VUE_APP_ALL+`/delete?num=${num}`);
        return res.data
    },
}


export const fetchtwo = {
    
    get: async () => {
        const res = await axios(process.env.VUE_APP_ALL+ '/ipinfo');
        return res.data

    },
}