<template>
  <div class="container-subheader">
    <div class="color_overlay"></div>
    <div class="row">
      <div class="column-subheader">
        <a href="">
          <span id="image" class="icon icon-hotel"></span>
          <p>هتل داخلی و خارجی</p>
        </a>
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
        <div class="column-input">
          <div class="wrap-input100 validate-input">
            <input class="input100 user" type="text" name="username" placeholder="2 بزگسال، 1 اتاق">
          </div>
        </div>
        <div class="column-input">
          <div class="wrap-input100 validate-input">
            <input class="input100 calendar" type="text" name="username" placeholder="زمان تور" id="tour-schedule"
                   readonly style="cursor: pointer">
            <date-picker element="tour-schedule" v-model="tourDate"></date-picker>
          </div>
        </div>
        <div class="column-input-location">
          <div class="column-input-location-inputs">
            <div class="wrap-input100-left validate-input">
              <input class="input100 location-input" type="text" name="username" placeholder="مقصد">
            </div>
          </div>
          <div class="column-input-location-inputs">
            <div class="wrap-input100-right validate-input">
              <input class="input100 location-input" type="text" name="username" placeholder="مبدا">
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        tourDate: ''
      }
    },
    methods: {
      search() {
        console.log(this.tourDate)
      }
    }
  }
</script>
