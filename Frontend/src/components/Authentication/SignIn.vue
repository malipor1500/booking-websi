<template>
  <div class="contact1">
    <div class="container-contact1">
      <div class="contact1-pic" data-tilt>
        <b style="margin-right: -40px;color: black">نکاتی برای امنیت بیشتر</b>
        <ul style="margin-top: 40px; color: black">
          <li>
            نام کاربری و رمز خود را در اختیار سایرین قرار ندهید.
          </li>
          <li>
            از رمز عبوری استفاده کنید که حدس زدن آن برای دیگران غیرممکن باشد.
          </li>
          <li>
            پس از خرید بلیط در فضاهای اشتراکی مثل کافی‌نت‌ها، حتما از حساب خود خارج شوید.
          </li>
        </ul>
      </div>

      <form class="contact1-form validate-form" @submit="checkForm">
				<span class="contact1-form-title">
					<div class="row">
                            <div class="column-signin" style="padding: 10px">
                                <button type="submit" @click="gotoSignup" class="btn-signin btn-signin-deactive"
                                        style="width: 100%">
                                    <span class="icon icon-sms"></span>
                                    <p>ثبت نام</p>
                                </button>
                            </div>

                            <div class="column-signin" style="padding: 10px">
                                <button class="btn-signin btn-signin-active" style="width: 100%">
                                    <span class="icon icon-letter"></span>
                                    <p>ورود</p>
                                </button>
                            </div>
                        </div>
				</span>

        <div class="row" v-if="errors.length" dir="ltr">
          <ul>
            <li v-for="error in errors" class="alert alert-danger">{{ error }}</li>
          </ul>
        </div>
        <div class="wrap-input1 validate-input" data-validate="Name is required">
          <input class="input1" style="font-family: vazirregular" type="text" name="name"
                 placeholder="ایمیل خود را وارد کنید" v-model="email">
          <span class="shadow-input1"></span>
        </div>

        <div class="wrap-input1 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <input class="input1" style="font-family: vazirregular" type="password" v-model='password' name="password"
                 placeholder="رمز عبور خود را وارد کنید">
          <span class="shadow-input1"></span>
        </div>

        <div class="container-contact1-form-btn">
          <button class="blue btn-submit-code" type="button" @click="editUser">ویرایش اطلاعات</button>

          <!--          <div class="password-retrieve">-->
          <!--            <a href="">-->
          <!--              <p align="center">بازیابی رمز عبور</p>-->
          <!--            </a>-->
          <!--          </div>-->

          <button class="green btn-submit-code" type="submit">ورود</button>


        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import EventHandler from "../EventHandler";
  import jwtDecode from 'jwt-decode';

  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: [],
      }
    },
    methods: {
      gotoSignup() {
        this.$router.push('/signup');
      },
      formValidation(){
        this.errors = [];
        if (!this.email) {
          this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
          this.errors.push('Invalid email address.');
        }
        if (!this.password) {
          this.errors.push("Password required.");
        }
      },
      editUser() {
        this.formValidation();
        if(!this.errors.length){
          let user = {
            email: this.email,
            password: this.password
          };
          this.$http.post('user/login', user)
            .then(response => {
              localStorage.setItem('userToken', response.data);
              localStorage.setItem('userData', JSON.stringify(jwtDecode(response.data)));
              let user = jwtDecode(response.data);
              EventHandler.$emit('login', 'loggedIn');
              this.email = '';
              this.password = '';
              this.$router.push({name: 'editUser', params: {id: user._id}})
            }).catch(err => {
            console.log(err);
            this.errors.push(err.body)
          });
        }
      },
      checkForm(e) {
        this.formValidation();
        if (!this.errors.length) {
          let user = {
            email: this.email,
            password: this.password
          };
          this.$http.post('user/login', user)
            .then(response => {
              localStorage.setItem('userToken', response.data);
              localStorage.setItem('userData', JSON.stringify(jwtDecode(response.data)));
              EventHandler.$emit('login', 'loggedIn');
              this.email = '';
              this.password = '';
              this.$router.push('/hotels/istanbul')
            }).catch(err => {
            console.log(err);
            this.errors.push(err.body)
          });
        }
        e.preventDefault();
      },
      validEmail: function (email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    }
  }
</script>

<style scoped>
  .alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  .alert-danger hr {
    border-top-color: #f1b0b7;
  }
</style>
