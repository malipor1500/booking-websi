<template>
  <div id="hotel-reserve" class="container container-reserve">
    <div class="row col-sm-3 offset-sm-9" style="margin-bottom: 30px; padding: 0 0">
      <div style="border-bottom: 2px solid orange;padding: 5px 0px">
        <svg viewBox="0 0 32 26" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" fill="" width="32px" height="26px" class="svg-icon"
             data-v-04070e6b="">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="International-Hotel---PDP---more-than-1-room---Desktop"
               transform="translate(-1369.000000, -2716.000000)" fill="currentColor" fill-rule="nonzero"
               stroke="#242424" stroke-width="0.5">
              <g id="Group-37" transform="translate(500.000000, 2713.000000)">
                <g id="Group-8" transform="translate(759.000000, 0.000000)">
                  <path
                    d="M111,27.7916667 L111,9 C111,6.25 113.25,4 116,4 L136,4 C138.75,4 141,6.25 141,9 L141,17.75 C141,20.5 138.75,22.75 136,22.75 L117.541667,22.75 L111,27.7916667 Z M116,5.66666667 C114.166667,5.66666667 112.666667,7.16666667 112.666667,9 L112.666667,24.375 L116.958333,21.0833333 L136,21.0833333 C137.833333,21.0833333 139.333333,19.5833333 139.333333,17.75 L139.333333,9 C139.333333,7.16666667 137.833333,5.66666667 136,5.66666667 L116,5.66666667 Z M125.166667,8.82142857 L126.833333,8.82142857 L126.833333,15.3214286 L125.166667,15.3214286 L125.166667,8.82142857 Z M125.166667,16.7380952 L126.833333,16.7380952 L126.833333,18.8214286 L125.166667,18.8214286 L125.166667,16.7380952 Z"
                    id="Combined-Shape"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <h6 style="padding: 0 2px; display: inline"><b>نکات ضروری</b></h6>
      </div>
    </div>
    <p style="font-size: 12px">{{text}}</p>
  </div>

</template>


<script>
  export default {
    props: ['text']
  }
</script>

<style src="../../css/bootstrap.css" scoped></style>

<style scoped>
  .container-reserve {
    margin-top: 5%;
    border: 40px solid whitesmoke;
    margin-right: 10%;
    width: 70%;
    /*height: 200px;*/
    background-color: whitesmoke;
  }

</style>
