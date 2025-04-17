<template>
  <div class="container-gallery">

    <p>
      <template v-for="(b, index) in breadcrumbs">
        <a class="link-gallery" v-if="index == 0" @click="$emit('return')">{{b}} / </a>
        <a class="link-gallery" v-if="index < breadcrumbs.length - 1">{{b}} / </a>
      </template>
      {{breadcrumbs[breadcrumbs.length - 1]}}
    </p>


    <div style="display: table; float: right">
      <h2>{{name}}</h2>
    </div>
    <div style="display: table; float: right; padding:15px 15px">
      <star-rating :rating="stars" :isIndicatorActive="false" dir="rtl"
                   :star-style="{width: 15, height: 15}" v-if="stars > 0"></star-rating>
    </div>
    <br><br>
    <p style="display: inline;padding-left: 50px; color: darkgray">{{address}}</p>

    <a class="link-gallery" @click="scrollTo('hotel-map')" style="cursor: pointer">
      <span class="hotel-detail-pin"><svg xmlns:xlink="http://www.w3.org/1999/xlink" height="18px" width="14px" fill=""
                                          xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 14 18"
                                          class="svg-icon"><g id="point-of-interest" stroke="none" stroke-width="1"
                                                              fill="none" fill-rule="evenodd"><g
        id="PDP-Desktop---POI-and-amenities" transform="translate(-761.000000, -1527.000000)" fill="#2979FF"
        fill-rule="nonzero"><g id="Group-28" transform="translate(503.000000, 1315.000000)"><g id="Bitmap"
                                                                                               transform="translate(0.000000, 75.000000)"><g
        id="Group-7" transform="translate(84.000000, 67.000000)"><g id="Group-3"
                                                                    transform="translate(98.000000, 16.000000)"><g
        id="location-pin-with-price-copy-25"><path
        d="M82.2806042,71.6368316 C76.9832813,64.2315561 76,63.4715485 76,60.7499984 C76,57.0220657 79.1339948,54 83,54 C86.8660052,54 90,57.0220657 90,60.7499984 C90,63.4715485 89.0167187,64.2315561 83.7193958,71.6368316 C83.3717656,72.1210737 82.6281979,72.1210385 82.2806042,71.6368316 Z M83,64 C84.6568625,64 86,62.6568625 86,61 C86,59.3431375 84.6568625,58 83,58 C81.3431375,58 80,59.3431375 80,61 C80,62.6568625 81.3431375,64 83,64 Z"
        id="Shape-Copy-8"></path></g></g></g></g></g></g></g></svg></span>
      مشاهده مکان هتل روی نقشه
    </a>

    <div class="row-gallery">
      <div class="column-gallery-main">
        <div
          style="width: 140px; height: 65px; position: absolute; z-index: 10; background-color: whitesmoke;
                  float: right; margin-top: 48%; margin-right: 85%">
          <div class="next-prev" @click="nextImage">
            <a class="arrow right"></a>
          </div>
          <div class="next-prev" @click="prevImage">
            <a class="arrow left"></a>
          </div>
        </div>
        <img :src="$http.options.root + 'hotels/image/' + images[mainImageIndex]">
      </div>

      <template v-for="(i, index) in images">
        <div class="column-gallery" @click="mainImageIndex = index">
          <img :src="$http.options.root + 'hotels/image/' + i">
          <div class="overlay">
            <div class="text">
              <svg style="color: white" viewBox="0 0 22 13" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" fill="" width="22px" height="13px" class="svg-icon"
                   data-v-638cc802="">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Tour-Detail-[if-select-2room]---Desktop" transform="translate(-1095.000000, -1777.000000)"
                     fill="currentColor" fill-rule="nonzero">
                    <g id="Group-13" transform="translate(607.000000, 1532.000000)">
                      <path
                        d="M498.9944,245 C493.937949,245.003931 489.443175,247.501581 488.033392,251.313119 C487.988869,251.433399 487.988869,251.566591 488.033392,251.686871 C489.444349,255.501583 493.944973,257.999754 499.005624,258 C504.062076,257.996069 508.556825,255.498419 509.966608,251.686871 C510.011131,251.566591 510.011131,251.433399 509.966608,251.313119 C508.55565,247.498417 504.055052,245.000246 498.9944,245 Z M499.000164,247.080003 C501.338501,247.080003 503.250187,249.068135 503.250187,251.499995 C503.250187,253.931855 501.338501,255.919997 499.000164,255.919997 C496.661827,255.919997 494.750142,253.931855 494.750142,251.499995 C494.750142,249.068135 496.661827,247.080003 499.000164,247.080003 Z M499.000164,248.640002 C497.472481,248.640002 496.25015,249.911223 496.25015,251.499995 C496.25015,253.088767 497.472481,254.359998 499.000164,254.359998 C500.527847,254.359998 501.750179,253.088767 501.750179,251.499995 C501.750179,249.911223 500.527847,248.640002 499.000164,248.640002 Z"
                        id="Shape"></path>
                    </g>
                  </g>
                </g>
              </svg>

              مشاهده
            </div>
          </div>
        </div>
      </template>

      <div class="column-gallery"
           style="border: 1px solid black;width: 150px;height: 120px;border-radius: 10px;cursor: pointer">
        <svg style="margin-top: 40px; margin-right: 50px" viewBox="0 0 25 19" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" fill="#424242" width="35px" height="25px" class="svg-icon"
             data-v-638cc802="">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Tour-Detail-[Select-Amount-Room]---Desktop" transform="translate(-1375.000000, -1539.000000)"
               fill="#424242" fill-rule="nonzero">
              <g id="Group-13" transform="translate(607.000000, 1532.000000)">
                <path
                  d="M769.666667,7 C768.752959,7 768,7.75738661 768,8.67646862 L768,24.3235314 C768,25.2425994 768.752959,26 769.666667,26 L791.333333,26 C792.247042,26 793,25.2425994 793,24.3235314 L793,8.67646862 C793,7.75738661 792.247042,7 791.333333,7 L769.666667,7 Z M769.666667,8.11764574 L791.333333,8.11764574 C791.650706,8.11764574 791.888889,8.35722987 791.888889,8.67646862 L791.888889,20.3680993 L787.236111,16.6222537 C787.052227,16.4740259 786.771313,16.4628774 786.576388,16.595989 L782.470486,19.4337474 L776.958333,14.9457068 C776.843235,14.8511121 776.689275,14.8059424 776.541666,14.8234643 C776.454623,14.8355349 776.370554,14.8687653 776.298611,14.919512 L769.111111,19.9052542 L769.111111,8.67638479 C769.111111,8.35714605 769.349296,8.11756192 769.666667,8.11756192 L769.666667,8.11764574 Z M782.444444,10.911788 C781.223724,10.911788 780.222222,11.9191808 780.222222,13.1470795 C780.222222,14.3749782 781.223724,15.382371 782.444444,15.382371 C783.665164,15.382371 784.666666,14.3749782 784.666666,13.1470795 C784.666666,11.9191808 783.665164,10.911788 782.444444,10.911788 Z M782.444444,12.0294338 C783.064675,12.0294338 783.555555,12.5232013 783.555555,13.1470795 C783.555555,13.7709578 783.064675,14.2647253 782.444444,14.2647253 C781.824213,14.2647253 781.333333,13.7709578 781.333333,13.1470795 C781.333333,12.5232013 781.824213,12.0294338 782.444444,12.0294338 Z M776.585069,16.0721764 L782.097222,20.5601946 C782.281105,20.7084503 782.562019,20.7195989 782.756944,20.5864593 L786.854166,17.7486171 L791.888889,21.8000829 L791.888889,24.3235034 C791.888889,24.6427589 791.650706,24.8823263 791.333333,24.8823263 L769.666667,24.8823263 C769.349296,24.8823263 769.111111,24.6427589 769.111111,24.3235034 L769.111111,21.2587232 L776.585069,16.0721484 L776.585069,16.0721764 Z"
                  id="Shape"></path>
              </g>
            </g>
          </g>
        </svg>

        <p style="color: dimgray; font-size: 12px; width: 100px; margin-right: 40px">گالری تصاویر</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mainImageIndex: 0
      }
    },
    props: ['images', 'name', 'address', 'breadcrumbs', 'stars'],
    methods: {
      nextImage(){
        this.mainImageIndex++;
        if(this.mainImageIndex === this.$props.images.length)
          this.mainImageIndex = 0;
      },
      prevImage(){
        this.mainImageIndex--;
        if(this.mainImageIndex === -1)
          this.mainImageIndex = this.$props.images.length - 1;
      },
      scrollTo(id){
        const element = document.getElementById(id);
        if (element) {
          document.body.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      },
    },
    created() {
      console.log("gallery created");
      console.log(this.$props.images)
    },
    mounted() {
      console.log("gallery mounted");
    }
  }
</script>

<style scoped>
  @import '../../css/gallery.css'; /* will use url import (do not use)*/
  /*@import "../css/bootstrap.css";*/

  .container-gallery {
    padding-top: 5%;
    margin-right: 12%;
    /*padding-right: 15px;*/
    /*padding-left: 15px;*/
    /*margin-right: auto;*/
    /*margin-left: auto;*/
  }

  @media (min-width: 768px) {
    .container-gallery {
      width: 750px;
    }
  }

  @media (min-width: 992px) {
    .container-gallery {
      width: 970px;
    }
  }

  @media (min-width: 1200px) {
    .container-gallery {
      width: 1170px;
    }
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000000;
    opacity: 0.7;
    overflow: hidden;
    height: 0;
    transition: .2s ease;
    width: 150px;
    padding-top: 5px;
    border-radius: 10px;
  }

  .column-gallery:hover .overlay {
    height: 120px;
  }

  .text {
    color: white;
    font-size: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>

<style scoped>

  .next-prev {
    width: 50%;
    height: 100%;
    cursor: pointer;
    float: right;
    padding: 20px 25px;
  }

  .next-prev:hover{
    background-color: lightgray;
  }

  .arrow {
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    margin: 0 4px;
  }

  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }


  .link-gallery {
    color: dodgerblue;
    cursor: pointer
  }

  .link-gallery:hover {
    color: steelblue;
  }
</style>
