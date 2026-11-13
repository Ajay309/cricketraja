$(document).on("click", ".nav .nav-item", function () {
  // console.log('nav clicked', $(this))
  centerItFixedWidth($(this), $(this).parent());
});

function centerItFixedWidth(target, outer) {
  var out = $(outer);
  var tar = $(target);
  var x = out.width();
  var y = tar.outerWidth(true);
  var z = tar.index();
  var q = 0;
  var m = out.find("li");
  //Just need to add up the width of all the elements before our target.
  for (var i = 0; i < z; i++) {
    q += $(m[i]).outerWidth(true);
  }
  out.animate(
    {
      scrollLeft: Math.max(0, q - (x - y) / 2),
    },
    300
  );
}

$(window).scroll(function () {
  if ($(this).scrollTop() > 125) {
    $(".right-sidebar").addClass("sticky");
  }
  if ($(this).scrollTop() < 125) {
    $(".right-sidebar").removeClass("sticky");
  }
});

// fantsy game height issue
(function () {
  function updateAppHeight() {
    var doc = document.documentElement;
    if (!doc) {
      return;
    }
    doc.style.setProperty("--app-height", window.innerHeight + "px");
  }

  window.addEventListener("resize", updateAppHeight);
  updateAppHeight();
})();
