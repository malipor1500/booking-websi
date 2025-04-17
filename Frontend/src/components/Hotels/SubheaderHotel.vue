<template>
  <div class="container-subheader">
    <div class="color_overlay"></div>
    <div class="row">
      <div class="column-subheader">
        <router-link :to="{path: '/hotels/istanbul'}" tag="a" exact>
<!--          <a href="">-->
            <span id="image" class="icon icon-hotel"></span>
            <p>هتل داخلی و خارجی</p>
<!--          </a>-->
        </router-link>
      </div>
      <div class="column-subheader">
        <a href="">
          <span class="icon icon-tour"></span>
          <p>تور</p>
        </a>
      </div>
      <div class="column-subheader">
        <a href="">
          <span class="icon icon-bus"></span>
          <p>اتوبوس</p>
        </a>
      </div>
      <div class="column-subheader">
        <a href="">
          <span class="icon icon-train"></span>
          <p>قطار</p>
        </a>
      </div>
      <div class="column-subheader">
        <a href="">
          <span class="icon icon-foreign_flight"></span>
          <p>پرواز خارجی</p>
        </a>
      </div>
      <div class="column-subheader">
        <a href="">
          <span class="icon icon-internal_flight"></span>
          <p>پرواز داخلی</p>
        </a>
      </div>
    </div>
    <div class="subheader-input">
      <div class="row">
        <div class="column-input" style="padding-left: 40px">
          <button class="button-common orange" style="font-family:vazirregular;font-size: 15px; width: 100%"
                  @click="search">
            جستجو
          </button>
        </div>
        <div class="column-input dropdown" v-click-outside="hidePersonSelection">
          <div class="wrap-input100 validate-input">
            <input class="input100 user" type="text" name="username" :placeholder="placeHolderPersonSelection()"
                   @click="showPersonSelection" readonly>
          </div>
          <div class="dropdown-person-selection" style="padding: 10px 0" dir="rtl" v-if="personSelection">
            <p style="color: orange; font-size: 15px; padding: 10px;">تعداد افراد را انتخاب کنید</p>
            <hr style="width: 70%; display: block; margin: 15px auto;" color="lightgray">

            <div style="padding: 10px;">
              <p style="color: gray;float: right; padding: 10px 0">بزرگسال ({{toPersianNum(12)}} سال به بالا)</p>
              <span class="add-minus" style="float: left"
                    @click="numAdults = numAdults > 0 ? numAdults - 1 : 0">-</span>
              <p style="padding: 10px; float: left">{{toPersianNum(numAdults)}}</p>
              <span class="add-minus" style="float: left" @click="numAdults = numAdults + 1">+</span>
            </div>

            <div style="padding: 10px;margin-top: 10%">
              <p style="color: gray;float: right; padding: 10px 0">کودک ({{toPersianNum(0)}} تا {{toPersianNum(12)}}
                سال)</p>
              <span class="add-minus" style="float: left"
                    @click="numChildren = numChildren > 0 ? numChildren - 1 : 0">-</span>
              <p style="padding: 10px; float: left">{{toPersianNum(numChildren)}}</p>
              <span class="add-minus" style="float: left" @click="numChildren = numChildren + 1">+</span>
            </div>
          </div>
        </div>
        <div class="column-input-calendar">
          <div class="column-input-calendar-inputs">
            <div class="wrap-input100-left validate-input">
              <input class="input100 calendar" type="text" name="username" placeholder="خروج" id="exit"
                     readonly style="cursor: pointer" v-model="exitDate">
              <date-picker format="jYYYY-jMM-jDD" element="exit" v-model="exitDate"></date-picker>
            </div>
          </div>
          <div class="column-input-calendar-inputs">
            <div class="wrap-input100-right validate-input">
              <input class="input100 calendar" type="text" name="username" placeholder="ورود" id="entrance"
                     readonly style="cursor: pointer" v-model="entranceDate">
              <date-picker format="jYYYY-jMM-jDD" element="entrance" v-model="entranceDate"></date-picker>
            </div>
          </div>
        </div>
        <div class="column-input-hotel-name dropdown" v-click-outside="hideDropdownSuggestion">
          <div class="wrap-input100 validate-input">
            <input class="input100 location-input" type="text" name="hotel" v-model="hotelCity"
                   placeholder="جستجوی مقصد یا هتل(داخلی و خارجی)" @focus="dropdownSuggestion" ref="inputCityName">
          </div>
          <div class="dropdown-location-suggestion" v-if="showDropdownSuggestion">
            <div class="topnav" direction="rtl">
              <a :class="{'active': (dropdownHotelSuggestion === 'international')}" @click="internationalSuggestion">هتل
                های خارجی</a>
              <a :class="{'active': (dropdownHotelSuggestion === 'domestic')}" @click="domesticSuggestion">هتل های
                داخلی</a>
            </div>
            <template v-for="c in filteredCities">
              <a href="#" @click="fillCityField(c)"><p align="right">{{c}}</p></a>
              <hr>
            </template>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
  import {persianNumConverter} from '../PersianNumConverter'

  let xml_json_converter = require("xml-js");
  let moment = require('moment-jalaali');

  export default {
    data() {
      return {
        entranceDate: '',
        exitDate: '',
        cities: [],
        dropdownHotelSuggestion: '',
        showDropdownSuggestion: false,
        personSelection: false,
        hotelCity: '',
        numAdults: 2,
        numChildren: 0
      }
    },
    mixins: [persianNumConverter],
    methods: {
      search() {
        let entranceDate = moment(this.entranceDate, "jYYYY-jMM-jDD");
        let exitDate = moment(this.exitDate, "jYYYY-jMM-jDD");
        // new Date(entranceDate._d);
        // new Date(exitDate._d);
        this.$router.push('/hotels/city-specific/' + this.hotelCity);
      },
      domesticSuggestion() {
        this.dropdownHotelSuggestion = 'domestic';
        console.log('getting domestic');
        this.$http.get('hotels/worldwide/domestic')
          .then(response => {
            return response.json()
          }).then(data => {
          this.cities = data;
        });
        this.$refs.inputCityName.focus();
      },
      internationalSuggestion() {
        this.dropdownHotelSuggestion = 'international';
        this.$http.get('hotels/worldwide/international')
          .then(response => {
            return response.json()
          }).then(data => {
          this.cities = data;
        });
        this.$refs.inputCityName.focus();
      },
      dropdownSuggestion() {
        this.showDropdownSuggestion = true;
        if (this.dropdownHotelSuggestion === '') {
          this.domesticSuggestion()
        }
      },
      hideDropdownSuggestion() {
        this.showDropdownSuggestion = false;
      },
      showPersonSelection() {
        this.personSelection = true;
      },
      hidePersonSelection() {
        this.personSelection = false;
      },
      placeHolderPersonSelection() {
        let adult = this.numAdults > 0 ? this.toPersianNum(this.numAdults) + ' بزرگسال' : "";
        let children = this.numChildren > 0 ? this.toPersianNum(this.numChildren) + ' کودک ' : "";
        let room = this.toPersianNum(1) + ' اتاق';
        if (this.numChildren > 0 && this.numAdults > 0)
          return adult + '، ' + children + '، ' + room;
        else if (this.numChildren === 0 && this.numAdults > 0)
          return adult + '، ' + room;
        else if (this.numChildren > 0 && this.numAdults === 0)
          return children + '، ' + room;
        else
          return room;
      },
      fillCityField(cityName) {
        this.hotelCity = cityName
      }
    },
    computed: {
      filteredCities() {
        return this.cities.filter((element) => {
          return element.match(this.hotelCity)
        });
      }
    }
  }
</script>

<style scoped>
  /* Add a black background color to the top navigation */
  .topnav {
    background-color: white;
    overflow: hidden;
  }

  /* Style the links inside the navigation bar */
  .topnav a {
    float: left;
    display: block;
    color: gray;
    width: 50%;
    text-align: center;
    padding: 4px 5px;
    text-decoration: none;
    font-size: 17px;
    border-bottom: 3px solid transparent;
  }

  .topnav a:hover {
    border-bottom: 3px solid orange;
    color: orange;
  }

  .topnav a.active {
    border-bottom: 3px solid orange;
    color: orange;
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
