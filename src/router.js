import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import devLogin from './views/devLogin.vue'
import login from './views/login.vue'
// import home from './views/home.vue'
// import list from './views/list.vue'
// import listDetail from './views/listDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: home,
    // },
    // {
    //   path: '/list/:id',
    //   name: 'list',
    //   component: list,
    // },
    // {
    //   path: '/list/:id/pageListId/:pageListId/contentId/:contentId',
    //   // name: 'listDetail',
    //   component: listDetail,
    // },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/devLogin',
      name: 'devLogin',
      component: devLogin,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: '/index/General_overview',
      children: [
        {
          path: '/index/innovativeTeam',
          name: 'innovativeTeam',
          component: () => import(/* webpackChunkName: "innovativeTeam" */ './views/pages/innovativeTeam.vue')
        },
        {
          path: '/index/todoMsg',
          name: 'todoMsg',
          component: () => import(/* webpackChunkName: "todoMsg" */ './views/pages/todoMsg.vue')
        },
        {
          path: '/index/proData',
          name: 'proData',
          component: () => import(/* webpackChunkName: "proData" */ './views/pages/proData.vue')
        },
        {
          path: '/index/resultData',
          name: 'resultData',
          component: () => import(/* webpackChunkName: "resultData" */ './views/pages/resultData.vue')
        },
        {
          path: '/index/salonData',
          name: 'salonData',
          component: () => import(/* webpackChunkName: "salonData" */ './views/pages/salonData.vue')
        },
        {
          path: '/index/teacherList',
          name: 'teacherList',
          component: () => import(/* webpackChunkName: "teacherList" */ './views/pages/teacherList.vue')
        },
        {
          path: '/index/teacherDetail/:id',
          name: 'teacherDetail',
          component: () => import(/* webpackChunkName: "teacherDetail" */ './views/pages/teacherDetail.vue')
        },
        {
          path: '/index/teamDetail/:id',
          name: 'teamDetail',
          component: () => import(/* webpackChunkName: "teamDetail" */ './views/pages/teamDetail.vue')
        },
        {
          path: '/index/proDetail/:id',
          name: 'proDetail',
          component: () => import(/* webpackChunkName: "proDetail" */ './views/pages/proDetail.vue')
        },
        {
          path: '/index/General_overview',
          name: 'General_overview',
          component: () => import(/* webpackChunkName: "General_overview" */ './views/pages/General_overview.vue')
        },
        {
          path: '/index/Team_Data',
          name: 'Team_Data',
          component: () => import(/* webpackChunkName: "Team_Data" */ './views/pages/Team_Data.vue')
        },
        {
          path: '/index/Data_collection',
          name: 'Data_collection',
          component: () => import(/* webpackChunkName: "Data_collection" */ './views/pages/Data_collection.vue')
        },
        {
          path: '/index/Ttem_Pandect',
          name: 'Ttem_Pandect',
          component: () => import(/* webpackChunkName: "Ttem_Pandect" */ './views/pages/Ttem_Pandect.vue')
        },
        {
          path: '/index/assignWork',
          name: 'assignWork',
          component: () => import(/* webpackChunkName: "assignWork" */ './views/pages/assignWork.vue')
        },
        {
          path: '/index/joinTeam',
          name: 'joinTeam',
          component: () => import(/* webpackChunkName: "joinTeam" */ './components/joinTeam.vue')
        },
        {
          path: '/newTeam',
          name: 'newTeam',
          component: () => import(/* webpackChunkName: "newTeam" */ './components/newTeam.vue')
        },
        {
          path: '/editTeam/:id',
          name: 'editTeam',
          component: () => import(/* webpackChunkName: "editTeam" */ './components/editTeam.vue')
        },
        {
          path: '/editTeam_ts/:id',
          name: 'editTeam_ts',
          component: () => import(/* webpackChunkName: "editTeam_ts" */ './components/editTeam_ts.vue')
        },
        {
          path: '/newPro',
          name: 'newPro',
          component: () => import(/* webpackChunkName: "newPro" */ './components/newPro.vue')
        },
        {
          path: '/newPro1',
          name: 'newPro1',
          component: () => import(/* webpackChunkName: "newPro1" */ './components/newPro1.vue')
        },
        {
          path: '/editPro/:id',
          name: 'editPro',
          component: () => import(/* webpackChunkName: "editPro" */ './components/editPro.vue')
        },
        {
          path: '/editPro_ts/:id',
          name: 'editPro_ts',
          component: () => import(/* webpackChunkName: "editPro_ts" */ './components/editPro_ts.vue')
        },
        {
          path: '/teacherManage',
          name: 'teacherManage',
          component: () => import(/* webpackChunkName: "teacherManage" */ './components/teacherManage.vue')
        },
        {
          path: '/addTeacher',
          name: 'addTeacher',
          component: () => import(/* webpackChunkName: "addTeacher" */ './components/addTeacher.vue')
        },
        {
          path: '/editTeacher/:id',
          name: 'editTeacher',
          component: () => import(/* webpackChunkName: "editTeacher" */ './components/editTeacher.vue')
        },
        {
          path: '/checkGrade',
          name: 'checkGrade',
          component: () => import(/* webpackChunkName: "checkGrade" */ './components/checkGrade.vue')
        },
        {
          path: '/addWork',
          name: 'addWork',
          component: () => import(/* webpackChunkName: "addWork" */ './components/addWork.vue')
        },
        {
          path: '/checkWork',
          name: 'checkWork',
          component: () => import(/* webpackChunkName: "checkWork" */ './components/checkWork.vue')
        },
        {
          path:'/topicManage',
          name:'topicManage',
          component:() => import(/* webpackChunkName: "topicManage" */ './components/topicManage.vue')
        },
        {
          path:'/topicTask',
          name:'topicTask',
          component:() => import(/* webpackChunkName: "topicTask" */ './components/topicTask.vue')
        },
        {
          path:'/topicDetail_student',
          name:'topicDetail_student',
          component:() => import(/* webpackChunkName: "topicDetail_student" */ './components/topicDetail_student.vue')
        },
        {
          path:'/topicDetail_teacher',
          name:'topicDetail_teacher',
          component:() => import(/* webpackChunkName: "topicDetail_teacher" */ './components/topicDetail_teacher.vue')
        },
        {
          path: '/index/belongWorkshop',
          name: 'belongWorkshop',
          component: () => import(/* webpackChunkName: "belongWorkshop" */ './views/pages/belongWorkshop.vue')
        },
        {
          path: '/index/belongPro',
          name: 'belongPro',
          component: () => import(/* webpackChunkName: "belongPro" */ './views/pages/belongPro.vue')
        },
        {
          path:'/workshopDetail/:id',
          name:'workshopDetail',
          component:() => import(/* webpackChunkName: "workshopDetail" */ './components/workshopDetail.vue')
        },
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
  ]
})
