import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      //1管理员 2学生 3老师
      role:null,
      userName:null,
      userId:null,
      token:null,
      refreshToken:null,
      img:null,
      name:null,
    },
    options:[]
  },
  getters:{
    isLogin:state=>{
      // if(["manage","student","teacher"].includes(state.user.role)) return true
      if(state.user.token != null && state.user.role != null) return true
    }
  },
  mutations: {
    setUser:(state,data)=>{
       state.user.userName=data.userName;
       state.user.userId=data.userIdStr;
       state.user.token=data.token;
       state.user.refreshToken=data.refreshToken;
    },
    setRole:(state,data)=>{
      state.user.role = data.roleType;
      state.user.img = data.imgAddress;
      state.user.name = data.realName;
      state.user.userId=data.userId;
    },
    setList:(state,data)=>{
      state.options = data;
    },
    setToken:(state,t)=>{
      state.user.token = t;
    }
    // ,setImg:(state,str)=>{
    //   state.user.img = str;
    // }
  },
  actions: {

  },
  plugins: [createPersistedState()]
})
