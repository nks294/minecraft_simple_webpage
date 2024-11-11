import $ from 'jquery';

const firefly = () => {
  if (!$.firefly) {
    $.firefly = {};
  }

  var b = {
    total: 10,
    ofTop: 0,
    ofLeft: 0,
    on: "body",
    twinkle: 0.2,
    minPixel: 1,
    maxPixel: 2,
    color: "#fff",
    namespace: "jqueryFireFly",
    zIndex: Math.ceil(20 * Math.random()) - 1,
    borderRadius: "50%",
    _paused: false,
  };

  $.firefly.settings = b;

  $.firefly.create = function (b) {
    const spark = $('<div>').hide();
    spark.addClass($.firefly.settings.namespace);
    $.firefly.settings._onSparkID++;

    if ($.firefly.settings.on === 'body') {
      $(document.body).append(spark);
    } else {
      $($.firefly.settings.on).append(spark);
    }

    spark.css({
      position: 'absolute',
      width: b,
      height: b,
      'background-color': $.firefly.settings.color,
      'z-index': $.firefly.settings.zIndex,
      'border-radius': $.firefly.settings.borderRadius,
      top: $.firefly.offsetTop + $.firefly.random($.firefly.eleHeight - 50),
      left: $.firefly.offsetLeft + $.firefly.random($.firefly.eleWidth - 50),
      'pointer-events': 'none',
    }).show();

    return spark;
  };

  $.firefly.fly = function (b) {
    $(b).animate(
      {
        top: $.firefly.offsetTop + $.firefly.random($.firefly.eleHeight - 50),
        left: $.firefly.offsetLeft + $.firefly.random($.firefly.eleWidth - 50),
        opacity: $.firefly.opacity($.firefly.settings.twinkle),
      },
      {
        duration: 2000 * ($.firefly.random(10) + 5),
        done: function () {
          if (!$.firefly.settings._paused) {
            $.firefly.fly(b);
          }
        },
      }
    );
  };

  $.firefly.randomPixel = function (a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  };

  $.firefly.random = function (a) {
    return Math.ceil(Math.random() * a) - 1;
  };

  $.firefly.opacity = function (a) {
    const op = Math.random();
    return op < a ? 0 : 1;
  };

  $(window).resize(function () {
    if ($.firefly.settings.on !== 'body') {
      const offset = $($.firefly.settings.on).offset();
      $.firefly.offsetTop = offset.top;
      $.firefly.offsetLeft = offset.left;
      $.firefly.eleHeight = $($.firefly.settings.on).height();
      $.firefly.eleWidth = $($.firefly.settings.on).width();
    } else {
      $.firefly.offsetTop = 0;
      $.firefly.offsetLeft = 0;
      $.firefly.eleHeight = $(document.body).height();
      $.firefly.eleWidth = $(document.body).width();
    }
  }).trigger('resize');

  for (let i = 0; i < $.firefly.settings.total; i++) {
    const pixelSize = $.firefly.randomPixel($.firefly.settings.minPixel, $.firefly.settings.maxPixel);
    const spark = $.firefly.create(pixelSize);
    $.firefly.fly(spark);
  }
};

export default firefly;
