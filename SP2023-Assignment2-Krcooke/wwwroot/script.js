var len;
var results = '';
var images = ['watr.webp', 'san.webp'];
var index = 0;

update();
runClock();

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
    };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "78e5ffac6d77413ba4c63061d7d9fe97");
      },
      type: "GET",
  }).done(function (data) {
      len = data.webPages.value.length;
      results = '';
      for (i = 0; i < len; i++) {
          results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }
  }).then(function () {
      $('#searchResults').html(results);
      $('#searchResults').dialog({
          width: "100%",
          position: { my: "top", at: "bottom", of: "#Bing" }
      });
  }).fail(function () {
      alert("error");
  });
}

function sadBingSearch() {
    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/news/search?',
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "78e5ffac6d77413ba4c63061d7d9fe97");
        },
        data: {
            "q": $("#query").val() + " Tragic",
            "count": "1",
            "offset": "0",
            "mkt": "en-us",
            "safeSearch": "Moderate",
            "freshness": "Week",
            "sortBy": "Relevance"
        },
        type: "GET",
    }).done(function (data) {
        len = data.value.length;
        for (i = 0; i < len; i++) {
            window.open(data.value[i].url);
        }
    }).fail(function () {
        alert("error");
    });
}

$("h2").click(function () {
    buildImage();
    changeImage();
});

function buildImage() {
    document.getElementById('body').style.backgroundImage = 'url(' + images[index] + ')';
}

function changeImage() {
    index++;
    if (index >= images.length) index = 0;
    document.getElementById('body').style.backgroundImage = 'url(' + images[index] + ')';
}

$('.time').hide();

$('.TimeButton').on('click', function () {
    $('#time').toggle()
    $('#time').dialog();
});

function twoDigits(val) {
    val = val + "";
    if (val.length < 2) {
        val = "0" + val;
    }
    return val;
}
function update() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    if (hours > 12) { hours = hours - 12 }
    if ($('#time').is(':visible')) {
        var str = '<h2>' + (hours) + ":" + twoDigits(minutes) + '</h2>';
        document.getElementById('time').innerHTML = str;
    }
}
function runClock() {
    var now = new Date();
    var timeToNextTick = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(function () {
        update();
        runClock();
    }, timeToNextTick);
}