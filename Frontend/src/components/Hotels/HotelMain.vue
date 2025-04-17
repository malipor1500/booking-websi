<template>
  <div>
    <SubheaderHotel></SubheaderHotel>
    <router-view></router-view>
  </div>
</template>

<script>
  import SubheaderHotel from "./SubheaderHotel";
  import HotelList from "./HotelList";


  export default {
    name: "HotelMain",
    components: {
      SubheaderHotel,
      HotelList
    }
  }
</script>

<style scoped>

</style>
