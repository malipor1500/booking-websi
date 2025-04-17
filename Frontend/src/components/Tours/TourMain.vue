<template>
  <div>
    <SubheaderTour></SubheaderTour>
    <Tour></Tour>
  </div>
</template>

<script>
  import SubheaderTour from "./SubheaderTour";
  import Tour from './Tour'
  export default {
    name: "TourMain",
    components: {
      SubheaderTour,
      Tour
    }
  }
</script>

<style scoped>

</style>
