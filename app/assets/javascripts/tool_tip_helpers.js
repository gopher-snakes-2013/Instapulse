ToolTipHelper = {
  bindToolTipForLayer: function(layer){
    layer.on('click', function(e) {
      e.layer.unbindPopup(); // prevent MapBox default behavior
      ToolTipHelper.addToolTip(ToolTipHelper.buildFeedPhoto(e.layer.feature))
    })
  },

  addToolTip: function(html){
    $(".pop-up").on('click', function(e){
      $("#feed-container").append(html)
      $("#feed-title").remove()
    })
  },
  
  buildFeedPhoto: function(feature){
    return '<div class="feed-photo">' + '<a href="' + feature.properties.link_url + '">' + '<img src="' + feature.properties.image + '"/>' + '</a>' + '<p>' + feature.properties.caption + '</p>' + '</div>'
  },
}