<template>
  <div class="container container-hotel-menubar" dir="rtl" id="hotel-menubar">
    <div class="topnav" direction="rtl" style="">
      <a :class="{'active': whichLink === 'hotel-map'}" @click="scrollTo('hotel-map')" style="cursor: pointer">موقعیت
        مکانی</a>
      <a :class="{'active': whichLink === 'hotel-facilities'}" @click="scrollTo('hotel-facilities')" style="cursor: pointer">امکانات
        هتل</a>
      <a :class="{'active': whichLink === 'hotel-reserve'}" @click="scrollTo('hotel-reserve')" style="cursor: pointer">اتاق های
        موجود</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sticked: false,
        sticky: 0,
        whichLink: 'hotel-map'
      };
    },
    methods: {
      scrollTo(id) {
        this.whichLink = id;
        const element = document.getElementById(id);
        if (element) {
          document.body.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      },
      handleScroll() {
        let navbar = document.getElementById("hotel-menubar");

        if (!this.sticked) {
          let sticky = navbar.offsetTop - navbar.offsetHeight;
          this.sticky = sticky;

          if (document.body.scrollTop >= sticky) {
            this.sticked = true;
            navbar.classList.add("sticky");
            this.$emit('fixMenubar', false)
          }
        } else if (document.body.scrollTop <= this.sticky) {
          navbar.classList.remove("sticky");
          this.sticked = false;
          this.$emit('fixMenubar', true)
        }
      }
    },
    created() {
      document.body.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      document.body.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>

<style scoped>
  .container-hotel-menubar {
    padding: 0px;
    background-color: lightgray;
    width: 70%;
    margin-right: 12%;
    margin-top: 5%;
    z-index: 10
  }

  .sticky {
    position: fixed;
    top: 0;
    margin-top: 0;
    /*width: 100%;*/
  }

  /* Add a black background color to the top navigation */
  .topnav {
    padding-right: 30px;
    padding-top: 10px;
    background-color: inherit;
    overflow: hidden;
  }

  /* Style the links inside the navigation bar */
  .topnav a {
    float: right;
    display: block;
    color: dimgray;
    width: 15%;
    height: 50px;
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
    color: black;
  }

</style>
