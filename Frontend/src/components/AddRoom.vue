<template>
  <div class="contact1">
    <form class="contact1-form validate-form" @submit="checkForm" enctype="multipart/form-data" method="POST">
      <div class="row" v-if="errors.length" dir="ltr">
        <ul>
          <li v-for="error in errors" class="alert alert-danger">{{ error }}</li>
        </ul>
      </div>
      <div class="row">
        <div class="wrap-input1 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <input class="input1" style="font-family: vazirregular" type="text" name="name"
                 placeholder="نام اتاق" v-model="roomName">
          <span class="shadow-input1"></span>
        </div>
      </div>

      <div class="row">
        <div class="boxes">
          <input type="checkbox" id="box-1" v-model="breakfast">
          <label for="box-1"><p style="color: gray">اتاق دارای صبحانه می باشد.</p></label>
        </div>
      </div>

      <div class="row">
        <p style="color: gray; font-size: 15px; padding: 10px;">تعداد افراد را انتخاب کنید</p>
        <hr style="width: 100%; display: block; margin: 15px auto;" color="lightgray">

        <div style="padding: 10px;">
          <p style="color: gray;float: right; padding: 10px 0">بزرگسال ({{toPersianNum(12)}} سال به بالا)</p>
          <span class="add-minus" style="float: left"
                @click="numAdults = numAdults > 0 ? numAdults - 1 : 0">-</span>
          <p style="padding: 10px; float: left">{{toPersianNum(numAdults)}}</p>
          <span class="add-minus" style="float: left" @click="numAdults = numAdults + 1">+</span>
        </div>

        <div style="padding: 10px;margin-top: 10%">
          <p style="color: gray;float: right; padding: 1px 1px">کودک ({{toPersianNum(0)}} تا {{toPersianNum(12)}}
            سال)</p>
          <span class="add-minus" style="float: left"
                @click="numChildren = numChildren > 0 ? numChildren - 1 : 0">-</span>
          <p style="padding: 10px; float: left">{{toPersianNum(numChildren)}}</p>
          <span class="add-minus" style="float: left" @click="numChildren = numChildren + 1">+</span>
        </div>
      </div>

      <div class="container-contact1-form-btn">
        <button class="blue btn-submit-code" type="submit">ثبت</button>
      </div>

    </form>
  </div>
</template>

<script>
  import {persianNumConverter} from './PersianNumConverter'

  export default {
    data() {
      return {
        roomName: '',
        breakfast: false,
        numAdults: 0,
        numChildren: 0,
        errors: []
      }
    },
    mixins: [persianNumConverter],
    methods: {
      enableSignin() {
        this.$emit('signin')
      },
      checkForm: function (e) {
        this.errors = [];
        if (!this.roomName) {
          this.errors.push("Room Name required!")
        }
        if (this.numAdults === 0 && this.numChildren === 0) {
          this.errors.push("Add some person!")
        }

        if (this.errors.length === 0) {
          let hotelID = this.$route.params.id;
          console.log(hotelID);
          let room = {
            hotelID: hotelID,
            name: this.roomName,
            breakfast: this.breakfast,
            adults: this.numAdults,
            children: this.numChildren
          };
          this.$http.post('rooms', room)
            .then(response => {
              console.log(response);
              alert("Room added successfully!")
            });
        }
        e.preventDefault();
      }
    }
  }
</script>

<style scoped>
  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }

  .custom-file-input::before {
    content: 'عکس های هتل را انتخاب کنید';
    font-family: vazirregular;
    display: inline-block;
    color: white;
    border: 1px solid #2F5BB7;
    background: -webkit-linear-gradient(top, #4C8FFB, #2F5BB7);
    background: -moz-linear-gradient(top, #4C8FFB, #2F5BB7);
    background: -ms-linear-gradient(top, #4C8FFB, #2F5BB7);
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 10pt;
    text-align: center;
  }

  .custom-file-input:hover::before {
    border-color: black;
  }

  .custom-file-input:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }

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

  .alert-info {
    cursor: pointer;
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
  }

  .alert-info hr {
    border-top-color: #abdde5;
  }

  .alert-info:hover {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }


  .add-minus {
    box-sizing: border-box;
    color: rgb(255, 165, 0);
    cursor: pointer;
    direction: rtl;
    display: inline-block;
    height: 30px;
    text-align: center;
    text-decoration: none solid rgb(255, 165, 0);
    text-size-adjust: 100%;
    width: 30px;
    column-rule-color: rgb(255, 165, 0);
    perspective-origin: 15px 15px;
    transform-origin: 15px 15px;
    caret-color: rgb(255, 165, 0);
    border: 1px solid rgb(255, 165, 0);
    border-radius: 100%;
    font: 300 15.4px / 30px IranSans, sans-serif;
    outline: rgb(255, 165, 0) none 0px;
    padding: 1px 0px 0px;
    transition: all 0.15s ease 0s;
  }

  /*.add-minus*/

  .add-minus:after {
    box-sizing: border-box;
    color: rgb(255, 165, 0);
    cursor: pointer;
    direction: rtl;
    text-align: center;
    text-decoration: none solid rgb(255, 165, 0);
    text-size-adjust: 100%;
    column-rule-color: rgb(255, 165, 0);
    caret-color: rgb(255, 165, 0);
    border: 0px none rgb(255, 165, 0);
    font: 300 15.4px / 30px IranSans, sans-serif;
    outline: rgb(255, 165, 0) none 0px;
  }

  /*.add-minus:after*/

  .add-minus:before {
    box-sizing: border-box;
    color: rgb(255, 165, 0);
    cursor: pointer;
    direction: rtl;
    text-align: center;
    text-decoration: none solid rgb(255, 165, 0);
    text-size-adjust: 100%;
    column-rule-color: rgb(255, 165, 0);
    perspective-origin: 0px 0px;
    transform-origin: 0px 0px;
    caret-color: rgb(255, 165, 0);
    border: 0px none rgb(255, 165, 0);
    font: 300 15.4px / 30px IranSans, sans-serif;
    outline: rgb(255, 165, 0) none 0px;
  }

  .add-minus:hover {
    background-color: rgb(255, 165, 0);
  }

</style>
