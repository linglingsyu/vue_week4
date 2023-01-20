import { createPinia } from 'pinia';

// 創建 pinia
const pinia = createPinia();

export default pinia;




import { defineStore } from "pinia";
import { API } from '@/helpers/api.js'

export const menuStore=defineStore('menuStore',{
    state:()=>({  }),
    getters:{  },
    actions:{  },
})



