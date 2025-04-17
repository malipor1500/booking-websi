<template>
  <div style="scroll-behavior: smooth">
    <hotel-gallery :stars="stars" :images="imageGallery" :address="address" :name="hotelName" :breadcrumbs="breadcrumbs"
                   @return="$emit('return')"></hotel-gallery>
    <hotel-menubar @fixMenubar="ontoggleMenubar"></hotel-menubar>
    <hotel-map :location="location" :hotelName="hotelName"></hotel-map>
    <hotel-facilities :facilities="facilities"></hotel-facilities>
    <hotel-reserve :id="ID"></hotel-reserve>
    <hotel-essentials :text="warnings"></hotel-essentials>
  </div>
</template>

<script>
  import HotelGallery from "./HotelGallery";
  import HotelFacilities from "./HotelFacilities";
  import HotelReserve from './HotelReserve'
  import HotelMenubar from './HotelMenubar'
  import HotelMap from './HotelMap'
  import HotelEssentials from "./HotelEssentials";

  export default {
    data() {
      return {
        ID: '',
        imageGallery: [],
        facilities: {},
        hotelName: '',
        address: '',
        location: {},
        breadcrumbs: [],
        stars: 0,
        warnings: ''
      }
    },
    components: {
      hotelGallery: HotelGallery,
      hotelFacilities: HotelFacilities,
      hotelReserve: HotelReserve,
      hotelMenubar: HotelMenubar,
      hotelMap: HotelMap,
      hotelEssentials: HotelEssentials
    },
    watch: {
      '$route'(to, from) {
        this.ID = to.params.id;
        this.getHotel();
      }
    },
    methods: {
      ontoggleMenubar(flag) {
        this.$emit('onfixMenubar', flag);
      },
      getHotel(){
        this.$http.get('hotels/hotel/' + this.ID)
          .then(response => {
            return response.json()
          }).then(data => {
          console.log("Hotel data");
          console.log(data);
          console.log(data.stars);


          this.imageGallery = data.images;
          this.facilities = data.facilities[0];
          this.address = data.address;
          this.hotelName = data.name;
          this.warnings = data.warnings
          // this.stars = data.stars;
          // this.location = data.loc;
          // this.breadcrumbs = data.breadcrumbs;
        });
      }
    },
    created() {
      this.ID = this.$route.params.id;
      this.getHotel();
    }
  }
</script>

<style src="../../css/bootstrap.css" scoped></style>
