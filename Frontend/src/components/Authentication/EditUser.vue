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
        <!--				<span class="contact1-form-title">-->
        <!--					<div class="row">-->
        <!--                            <div class="column-signin" style="padding: 10px">-->
        <!--                                <button class="btn-signin btn-signin-active" style="width: 100%">-->
        <!--                                    <span class="icon icon-sms"></span>-->
        <!--                                    <p>ثبت نام</p>-->
        <!--                                </button>-->
        <!--                            </div>-->

        <!--                            <div class="column-signin" style="padding: 10px">-->
        <!--                                <button class="btn-signin btn-signin-deactive" type="submit" @click="gotoSignin"-->
        <!--                                        style="width: 100%">-->
        <!--                                    <span class="icon icon-letter"></span>-->
        <!--                                    <p>ورود</p>-->
        <!--                                </button>-->
        <!--                            </div>-->
        <!--                        </div>-->
        <!--				</span>-->

        <div class="row" v-if="errors.length" dir="ltr">
          <ul>
            <li v-for="error in errors" class="alert alert-danger">{{ error }}</li>
          </ul>
        </div>
        <div class="row">
          <div class="column-signin">
            <div class="wrap-input1 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input class="input1" style="font-family: vazirregular" type="text" name="phone"
                     placeholder="تلفن همراه (الزامی)" v-model="phone">
              <span class="shadow-input1"></span>
            </div>
          </div>

          <div class="column-signin">
            <div class="wrap-input1 validate-input" data-validate="Name is required">
              <input class="input1" style="font-family: vazirregular" type="text" name="email"
                     placeholder="ایمیل (الزامی)" v-model="email">
              <span class="shadow-input1"></span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="column-signin">
            <div class="wrap-input1 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input class="input1" style="font-family: vazirregular" type="password" name="confirmPass"
                     placeholder="تکرار رمز عبور (الزامی)" v-model="confirmPass">
              <span class="shadow-input1"></span>
            </div>
          </div>
          <div class="column-signin">
            <div class="wrap-input1 validate-input" data-validate="Name is required">
              <input class="input1" style="font-family: vazirregular" type="password" name="pass" v-model="password"
                     placeholder="رمز عبور (الزامی)">
              <span class="shadow-input1"></span>
            </div>
          </div>
        </div>

        <div class="boxes">
          <input type="checkbox" id="box-1">
          <label for="box-1"><p style="color: dodgerblue">قوانین و مقررات سفرهای علی بابا</p>را می پذیرم.</label>

          <input type="checkbox" id="box-2" checked>
          <label for="box-2">مایل به دریافت خبرها و ایمیل های علی بابا هستم.</label>
        </div>

        <div class="container-contact1-form-btn">
          <button class="blue btn-submit-code" type="submit">ثبت نام</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        phone: '',
        password: '',
        confirmPass: '',
        errors: []
      }
    },
    methods: {
      gotoSignin() {
        this.$router.push('/signin');
      },
      checkForm: function (e) {
        this.errors = [];

        if (!this.email) {
          this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
          this.errors.push('Invalid email address.');
        }
        if (!this.phone) {
          this.errors.push("phone required.");
        }

        if (!this.password) {
          this.errors.push("Password required.");
        } else {
          if (!this.confirmPass) {
            this.errors.push("Confirm your password.")
          } else {
            if (this.password !== this.confirmPass) {
              this.errors.push("Password and its confirm does not match")
            }
          }
        }

        if (!this.errors.length) {
          const userOld = JSON.parse(localStorage.getItem('userData'));
          let user = {
            email: this.email,
            phone: this.phone,
            password: this.password,
            role: userOld.role
          };
          let userID = this.$route.params.id;
          this.$http.put('user/edit/' + userID, user)
            .then(response => {
              console.log(response);
              localStorage.removeItem('userToken');
              localStorage.removeItem('userData');
              this.$router.push({name: 'login'});
              alert("User edited successfully!");
            }).catch(err => {
            alert(err);
            this.errors.push(err.body)
          });
        }

        e.preventDefault();
      },
      validEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
