<template>
  <header style="width: 100%" :style="{'position': fix ? 'fixed' : 'static'}">
    <div class="logo-container">
      <a class="logo" href="/"><img src="../images/logo.jpg" alt="logo" style="width: 180px; height: 60px"></a>
      <!--        <a class="logo" href="/"><img src="images/alibaba_logo2.svg" alt="logo" style="width: 100px; height: 40px"></a>-->
    </div>
    <nav>
      <ul class="nav__links__right">
        <li>
          <div class="dropdown" v-click-outside="clickOutsideFlight">
            <a class="dropbtn" @click="flightDropDown = !flightDropDown">
              <!--                        <i class="fa fa-caret-down"></i>-->
              <span class="nav-icon nav-flight"></span>
              هواپیما
            </a>
            <div class="dropdown-content" v-if="flightDropDown">
              <a href="#"><p align="right">پرواز داخلی</p></a>
              <hr>
              <a href="#"><p align="right">پروار خارجی</p></a>
            </div>
          </div>
        </li>
        <li class="navbar-items">
          <a href="">
            <span class="nav-icon nav-train"></span>
            <a href="#">قطار</a>
          </a>
        </li>
        <li class="navbar-items">
          <a href="">
            <span class="nav-icon nav-bus"></span>
            <a href="#">اتوبوس</a>
          </a>
        </li>
        <li class="navbar-items">
          <a href="">
            <span class="nav-icon nav-tour"></span>
            <a href="#">تور</a>
          </a>
        </li>
        <!--        <li class="navbar-items">-->
        <!--          <a href="">-->
        <!--            <span class="nav-icon nav-hotel"></span>-->
        <!--            <a href="#">هتل</a>-->
        <!--          </a>-->
        <!--        </li>-->

        <router-link :to="{path: '/hotels/istanbul'}" tag="li" class="navbar-items" exact>
          <a href="">
            <span class="nav-icon nav-hotel"></span>
            <a href="#">هتل</a>
          </a>
        </router-link>


      </ul>

      <ul class="nav__links__left">
        <li>
          <button class="btn-peigiri">پیگیری خرید</button>
        </li>
        <li>
          <button class="btn-peigiri" v-if="loggedIn" @click="logout">خروج</button>
        </li>

        <li>
          <div class="dropdown dropdown-signin" v-click-outside="clickOutsideSignIn">
            <a class="dropbtn" @click="signInDropDown = !signInDropDown">
              ورود - ثبت نام
              <span class="nav-icon nav-sing-in"></span>
            </a>
            <div class="dropdown-content dropdown-content-signin" v-if="signInDropDown">
              <div class="row">
                <div class="column-signin" style="padding: 10px">
                  <button class="btn-signin" style="width: 100%" @click="gotoSignUp">
                    <span class="icon icon-sms"></span>
                    <p>ثبت نام</p>
                  </button>
                </div>

                <div class="column-signin" style="padding: 10px">
                  <button class="btn-signin" style="width: 100%" @click="gotoSignIn">
                    <span class="icon icon-letter"></span>
                    <p>ورود</p>
                  </button>
                </div>
              </div>
              <div style="margin-right: 5%;margin-bottom: 5%;margin-top: 5%;">

                <p style="padding: 10px">آدرس ایمیل حساب کاربری خود در علی‌بابا را وارد کنید تا کد تایید به
                  شماره همراه متصل به حساب کاربری شما ارسال شود.</p>

                <input class="input-signin" type="text" placeholder="ایمیل خود را وارد کنید">

                <button class="blue btn-submit-code">ارسال کد تایید</button>

                <div class="password-retrieve">
                  <a href="">
                    <p align="center">بازیابی رمز عبور</p>
                  </a>
                </div>

                <button class="green btn-submit-code">ثبت نام</button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="dropdown" v-click-outside="clickOutsidePhone">
            <a class="dropbtn" @click="phoneDropDown = !phoneDropDown">
              <!--                        <i class="fa fa-caret-down"></i>-->
              021 - 43900000
              <span class="nav-icon nav-phone"></span>
            </a>
            <div class="dropdown-content" style="min-width: 200px" v-if="phoneDropDown">
              <p align="center"> پشتیبانی<b style="color: orange;">24</b> ساعته </p>
              <a href=""><p align="center" style="font-size: 15px">43900000 <b style="color: orange"> - </b>
                021</p></a>
              <a href=""><p align="center" style="font-size: 15px">49275000 <b style="color: orange"> - </b>
                021</p></a>
              <hr color="orange">

              <a href="#"><p align="right">راهنمای خرید بلیط</p></a>
              <hr>
              <a href="#"><p align="right">راهنمای استرداد بلیط</p></a>
              <hr>
              <a href="#"><p align="right">تماس با ما</p></a>
              <hr>
              <a href="#"><p align="right">قوانین و مقررات</p></a>
              <hr>
              <a href="#"><p align="right">اطلاعات فرودگاهی</p></a>
            </div>
          </div>
        </li>

      </ul>


    </nav>
    <!--    <a class="cta" href="#">Contact</a>-->


  </header>

</template>

<script>

  import router from "../router";
  import EventHandler from './EventHandler'

  export default {
    data() {
      return {
        flightDropDown: false,
        signInDropDown: false,
        phoneDropDown: false,
        loggedIn: localStorage.getItem('userToken') != null
      }
    },
    props: ['fix'],
    methods: {
      clickOutsideFlight(event) {
        if (this.flightDropDown)
          this.flightDropDown = false
      },
      clickOutsideSignIn(event) {
        if (this.signInDropDown)
          this.signInDropDown = false
      },
      clickOutsidePhone(event) {
        if (this.phoneDropDown)
          this.phoneDropDown = false
      },
      gotoSignIn() {
        this.$router.push('/signin')
      },
      gotoSignUp() {
        this.$router.push('/signup')
      },
      logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        this.$router.push({name: 'login'});
        this.loggedIn = false;
      }
    },
    mounted() {
      EventHandler.$on('login', status => {
        this.loggedIn = true;
      });
    }
  }
</script>
