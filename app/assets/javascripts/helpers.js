
// TODO-JW: LayerHelpers might want to become a richer set of functions
// for dealing with individual points / layers
LayerHelpers = {
  onLayerAdd: function(e) {
    LayerHelpers.changeMarkerIcon(e.layer)
  },

  changeMarkerIcon: function(marker) {
    if(marker.feature){
      marker.setIcon(L.icon(marker.feature.properties.icon));
      var popupContent = '<img class ="pop-up" src=' + marker.feature.properties.image + '>'
      marker.bindPopup(popupContent, {
        closeButton: true
      });
    }    
  }
}

FormHelpers = {
  getSelectedSpeed: function() {
    var speed = $('#speed')[0].options[$('#speed')[0].selectedIndex].value
    return speed
  },

  getStartTime: function() {
    var startTime = $('#start_time')[0].options[$('#start_time')[0].selectedIndex].value
    return startTime
  },

  playbackSpeed: function(){
    var millisecondsPerInstagramHour = 1000.0 * FormHelpers.getSelectedSpeed()
    return (millisecondsPerInstagramHour / 3600)
  },

  mapStartTime: function() {
    var unixSelectedDate = 1383202800
    var unixStartHour = 36 * FormHelpers.getStartTime()
    return unixSelectedDate + unixStartHour
  },

  disableForm: function() {
    $('#submit_button').attr('disabled', 'disabled')
    $('#speed').attr('disabled', 'disabled')
    $('#start_time').attr('disabled', 'disabled')
    $('#end_time').attr('disabled', 'disabled')
  },

  enableForm: function() {
    $('#submit_button').removeAttr('disabled')
    $('#speed').removeAttr('disabled')
    $('#start_time').removeAttr('disabled')
    $('#end_time').removeAttr('disabled')    
  }  
}
