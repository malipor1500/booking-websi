<template>
  <div class="hotel">
    <div class="row">
      <template v-if="hotelList.length > 0">
        <template v-for="hotel in hotelList">
          <div class="column" style="cursor: pointer" @click="gotoHotelPage(hotel._id)">
            <div class="card">
              <img :src="$http.options.root + 'hotels/image/' + hotel.images[0]">
              <div class="container-card">
                <div class="sub-card">
                  <star-rating :rating="hotel.stars" :isIndicatorActive="false" dir="ltr"
                               :star-style="{width: 15, height: 15}"></star-rating>
                </div>
                <div class="sub-card" style="float:right">
                  <p>{{hotel.name}}</p>
                </div>
                <hr style="width: 100%">
                <div class="sub-card">
                  <button class="button-common blue"
                          style="font-family:vazirregular;font-size: 12px;margin-top: 10%">
                    مشاهده و رزرو
                  </button>
                </div>
                <div class="sub-card" style="float:right">
                  <p>شروع قیمت از</p>
                  <p>{{toPersianNum(1000)}} ریال</p>
                </div>
              </div>

            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <h4 style="margin-right: 45%;">هیچ رکوردی یافت نشد!</h4>
      </template>
    </div>

  </div>
</template>

<script>
  import {persianNumConverter} from '../PersianNumConverter'

  export default {
    data() {
      return {
        cityName: this.$route.params.city,
        hotelList: []
      }
    },
    watch: {
      '$route'(to, from) {
        this.cityName = to.params.city;
        this.getCityHotels();
      }
    },
    mixins: [persianNumConverter],
    methods: {
      getCityHotels() {
        this.$http.get('hotels/' + this.cityName)
          .then(response => {
            return response.json()
          }).then(data => {
          this.hotelList = data;
          console.log(this.hotelList);
          console.log(this.$http.options.root + 'hotels/image/' + this.hotelList[0].images[0])
        });
      },
      redirectTo(cityName) {
        this.$router.push('/hotels/' + cityName);
      },
      gotoHotelPage(id) {
        this.$router.push('/hotel/' + id)
      }
    },
    created() {
      this.cityName = this.$route.params.city;
      this.getCityHotels();
    }
  }
</script>
