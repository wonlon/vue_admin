import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from './../views/login/index'
import Package from './../views/package/package'
import Dashboard from './../views/dashboard/dashboard'
import Organization from './../views/organization/org'
import OnlineTerminal from './../views/onlineTerminal/onlineTerminal'
import LevelTerminal from './../views/levelTerminal/levelTerminal'
import VersionTerminal from './../views/versionTerminal/versionTerminal'
import Media from './../views/media/media'
import RegisterMonth from './../views/registerMonth/registerMonth'
import RegisterDay from './../views/registerDay/registerDay'
import OrgLoginDay from './../views/orgLoginDay/orgLoginDay'
import UserLogin from './../views/userLogin/userLogin'
import NewUser from './../views/newUser/newUser'
import License from './../views/License/license'
import Order from './../views/order/order'
import Test from './../views/test/test'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/package',
    name: 'Package',
    component: Package
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/organization',
    name: 'organization',
    component: Organization
  },
  {
    path: '/levelTerminal',
    name: 'levelTerminal',
    component: LevelTerminal
  },
  {
    path: '/onlineTerminal',
    name: 'onlineTerminal',
    component: OnlineTerminal
  },
  {
    path: '/versionTerminal',
    name: 'versionTerminal',
    component: VersionTerminal
  },
  {
    path: '/media',
    name: 'media',
    component: Media
  },
  {
    path: '/registerMonth',
    name: 'registerMonth',
    component: RegisterMonth
  },
  {
    path: '/registerDay',
    name: 'registerDay',
    component: RegisterDay
  },
  {
    path: '/orgLoginDay',
    name: 'orgLoginDay',
    component: OrgLoginDay
  },
  {
    path: '/userLogin',
    name: 'userLogin',
    component: UserLogin
  },
  {
    path: '/newUser',
    name: 'newUser',
    component: NewUser
  },
  {
    path: '/license',
    name: 'license',
    component: License
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
];


export const asyncRoutes = [

]

const createRouter = () => new Router({
    mode:'history',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router