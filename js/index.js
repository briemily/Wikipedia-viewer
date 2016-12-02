$(document).ready(function() {
  $("#results").hide();

  var url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&search=";
  var searchContent;
  var tag = "&limit=10&format=json";
  var ani = true;

  function getInfo() {
    var apiURL = url + searchContent + tag;

    $.getJSON(apiURL, function(json) {
      if (ani === true) {
        $("#searchBar").animate({
          'margin-top': "-=18%"
        });
        ani = false;
      }

      $("#results").show(100);

      var title = "";
      var data = "";
      var link = "";

      for (i = 0; i < json[1].length; i++) {
        title = "#title" + [i + 1];
        data = "#data" + [i + 1];
        link = "#link" + [i + 1];

        $(title).html(json[1][i]);
        $(data).html(json[2][i]);
        $(link).attr("href", json[3][i]);
      }
    });
  }

  $("#searchBtn").click(function() {
    searchContent = document.getElementById("searchInput").value;
    getInfo();
  });

  $('#searchInput').keypress(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      searchContent = document.getElementById("searchInput").value;
      getInfo();
    }
  });

});