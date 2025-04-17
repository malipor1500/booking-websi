<template>
  <div id="hotel-map" class="container"
       style="width: 70%; height: 400px; position: relative; margin-right: 12%; margin-top: 5%; z-index: 0">
    <div class="row col-sm-3 offset-sm-9" style="margin: 30px 0; padding: 0 0">
      <div style="border-bottom: 2px solid orange;padding: 5px 0px">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" height="32px" width="32px" fill=""
             xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" class="svg-icon">
          <defs></defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-220.000000, -1182.000000)" fill="currentColor" fill-rule="nonzero">
              <g transform="translate(200.000000, 1105.000000)">
                <g transform="translate(20.000000, 77.000000)">
                  <g>
                    <g>
                      <path
                        d="M13,6 C13,3.23857625 10.7614237,1 8,1 C5.23857625,1 3,3.23857625 3,6 C3,7.75445641 4.65668391,10.6328469 8,14.4887079 C11.3433161,10.6328469 13,7.75445641 13,6 Z M8,16 C4,11.5424723 2,8.209139 2,6 C2,2.6862915 4.6862915,0 8,0 C11.3137085,0 14,2.6862915 14,6 C14,8.209139 12,11.5424723 8,16 Z M8,9 C6.35090988,9 5,7.66130472 5,5.99990298 C5,4.338653 6.35095133,3 8,3 C9.64904867,3 11,4.338653 11,5.99990298 C11,7.66130472 9.64909012,9 8,9 Z M8,8 C9.10166665,8 10,7.10416857 10,5.99990298 C10,4.89580222 9.10163845,4 8,4 C6.89836155,4 6,4.89580222 6,5.99990298 C6,7.10416857 6.89833335,8 8,8 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <h5 style="padding: 0 2px; display: inline"><b>موقعیت مکانی</b></h5>
      </div>
    </div>

    <div id="mapid"
         class="row col-sm-12 leaflet-container leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag"
         style="width: 100%; height: 100%"
         tabindex="0">
      <div class="leaflet-pane leaflet-map-pane" style="transform: translate3d(0px, 0px, 0px);">
        <div class="leaflet-pane leaflet-tile-pane">
          <div class="leaflet-layer " style="z-index: 1; opacity: 1;">
            <div class="leaflet-tile-container leaflet-zoom-animated"
                 style="z-index: 18; transform: translate3d(0px, 0px, 0px) scale(1);"><img alt="" role="presentation"
                                                                                           src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/12/2046/1361?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                                                                                           class="leaflet-tile leaflet-tile-loaded"
                                                                                           style="width: 512px; height: 512px; transform: translate3d(-200px, -347px, 0px); opacity: 1;"><img
              alt="" role="presentation"
              src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/12/2047/1361?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
              class="leaflet-tile leaflet-tile-loaded"
              style="width: 512px; height: 512px; transform: translate3d(312px, -347px, 0px); opacity: 1;"><img alt=""
                                                                                                                role="presentation"
                                                                                                                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/12/2046/1362?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                                                                                                                class="leaflet-tile leaflet-tile-loaded"
                                                                                                                style="width: 512px; height: 512px; transform: translate3d(-200px, 165px, 0px); opacity: 1;"><img
              alt="" role="presentation"
              src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/12/2047/1362?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
              class="leaflet-tile leaflet-tile-loaded"
              style="width: 512px; height: 512px; transform: translate3d(312px, 165px, 0px); opacity: 1;"></div>
          </div>
        </div>
        <div class="leaflet-pane leaflet-shadow-pane"></div>
        <div class="leaflet-pane leaflet-overlay-pane"></div>
        <div class="leaflet-pane leaflet-marker-pane"></div>
        <div class="leaflet-pane leaflet-tooltip-pane"></div>
        <div class="leaflet-pane leaflet-popup-pane"></div>
        <div class="leaflet-proxy leaflet-zoom-animated"
             style="transform: translate3d(1.04805e+06px, 697379px, 0px) scale(4096);"></div>
      </div>
      <div class="leaflet-control-container">
        <div class="leaflet-top leaflet-left">
          <div class="leaflet-control-zoom leaflet-bar leaflet-control"><a class="leaflet-control-zoom-in" href="#"
                                                                           title="Zoom in" role="button"
                                                                           aria-label="Zoom in">+</a><a
            class="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out">−</a></div>
        </div>
        <div class="leaflet-top leaflet-right"></div>
        <div class="leaflet-bottom leaflet-left"></div>
        <div class="leaflet-bottom leaflet-right">
          <div class="leaflet-control-attribution leaflet-control"><a href="https://leafletjs.com"
                                                                      title="A JS library for interactive maps">Leaflet</a>
            | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a
              href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a
              href="https://www.mapbox.com/">Mapbox</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // location of akgun istanbul 41.022998, 28.930612
    props: ['location', 'hotelName'],
    watch: {
      location() {
        let x = this.$props.location.x;
        let y = this.$props.location.y;

        var mymap = L.map('mapid').setView([x, y], 10);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 18,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1
        }).addTo(mymap);
        var marker = L.marker([x, y]).addTo(mymap);
        marker.bindPopup("<b>The location of " + this.$props.hotelName + " hotel</b>").openPopup();
      }
    }
  };
</script>
<style scoped src="../../css/bootstrap.css">
</style>
