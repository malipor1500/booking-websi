import SignUp from "./components/Authentication/SignUp.vue";
import SignIn from "./components/Authentication/SignIn.vue";
import TourMain from "./components/Tours/TourMain.vue";
import HotelMain from "./components/Hotels/HotelMain.vue";
import HotelList from "./components/Hotels/HotelList.vue";
import SingleHotelPage from "./components/Hotels/SingleHotelPage.vue";
import AddHotel from "./components/AddHotel.vue";
import AddRoom from "./components/AddRoom.vue";
import HotelInfo from "./components/Hotels/HotelInfo";
import EditUser from "./components/Authentication/EditUser";
import HotelsPerCity from "./components/Hotels/HotelsPerCity";

import VueRouter from "vue-router";

const routes = [
  {
    path: '/hotels', component: HotelMain, name: 'hotel-list', children: [
      {path: ':city', component: HotelList},
      {path: 'city-specific/:city', component: HotelsPerCity}
    ],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/hotel', component: SingleHotelPage, children: [
      {path: ':id', component: HotelInfo},
      {path: 'add-room/:id', component: AddRoom, name: 'add-room', meta: {isAdmin: true}},
    ],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/add-hotel', component: AddHotel, meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {path: '/tours', component: TourMain, meta: {requiresAuth: true}},
  {path: '/edit/:id', component: EditUser, name: 'editUser', meta: {requiresAuth: true}},

  {path: '/signin', component: SignIn, name: 'login'},
  {path: '/signup', component: SignUp, name: 'register'},
  {path: '*', redirect: {path: 'hotels/istanbul'}}
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('userToken');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token == null) {
      next({name: 'login'})
    } else {
      const user = JSON.parse(localStorage.getItem('userData'));
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.role === 'admin') {
          next()
        } else {
          next({path: 'hotels/istanbul'})
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
;

export default router
