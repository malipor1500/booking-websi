<template>
  <div style="background-color: whitesmoke" id="main-container">
    <navbar-menu :fix="fixMenubar"></navbar-menu>
    <router-view></router-view>
<!--    <hotel-list v-if="mainPage" @show-hotel="showHotelData"></hotel-list>-->
<!--    <signup v-if="signupPage" @signin="enableSignIn"></signup>-->
<!--    <signin v-if="signinPage" @signup="enableSignUp"></signin>-->
<!--    <single-hotel-page v-if="showHotel" :ID="hotelID" @onfixMenubar="ontoggleMenubar" @return="enableMainpage"></single-hotel-page>-->
<!--    <hotel-owner></hotel-owner>-->
<!--    <add-room></add-room>-->
    <footers></footers>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import Tour from './components/Tours/Tour.vue'
  import HotelList from './components/Hotels/HotelList.vue'
  import SignUp from './components/Authentication/SignUp'
  import SignIn from './components/Authentication/SignIn'
  import SubheaderTour from './components/Tours/SubheaderTour'
  import SubheaderHotel from './components/Hotels/SubheaderHotel'
  import SingleHotelPage from "./components/Hotels/SingleHotelPage"
  import AddHotel from "./components/AddHotel";
  import AddRoom from "./components/AddRoom";

  export default {
    name: 'app',
    data() {
      return {
        // mainPage: true,
        // signinPage: false,
        // signupPage: false,
        // showHotel: false,
        fixMenubar: true,
        hotelID: -1
      }
    },
    components: {
      navbarMenu: Header,
      footers: Footer,
      tour: Tour,
      hotelList: HotelList,
      signup: SignUp,
      signin: SignIn,
      subheaderTour: SubheaderTour,
      subheaderHotel: SubheaderHotel,
      singleHotelPage: SingleHotelPage,
      hotelOwner: AddHotel,
      addRoom: AddRoom
    },
    methods: {
      // enableMainpage(){
      //   this.signinPage = false;
      //   this.signupPage = false;
      //   this.mainPage = true;
      //   this.showHotel = false;
      // },
      // enableSignIn() {
      //   this.signinPage = true;
      //   this.signupPage = false;
      //   this.mainPage = false;
      //   this.showHotel = false;
      // },
      // enableSignUp() {
      //   this.signupPage = true;
      //   this.signinPage = false;
      //   this.mainPage = false;
      //   this.showHotel = false;
      // },
      // showHotelData(id) {
      //   this.hotelID = id;
      //   this.signupPage = false;
      //   this.signinPage = false;
      //   this.mainPage = false;
      //   this.showHotel = true;
      // },
      ontoggleMenubar(flag){
        this.fixMenubar = flag;
      }
    },
    // created(){
      // this.$router.push('/hotels/istanbul')
      // this.$router.push('/tours')
    // }
  }
</script>
