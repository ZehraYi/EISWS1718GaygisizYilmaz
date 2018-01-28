var appState= {};
var map;
var currentResults;


function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
      appState.myLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
          };

          appState.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: appState.myLocation
          });

          appState.myLocationMarker = new google.maps.Marker({
              position: appState.myLocation,
              map: appState.map
          });
        });
      }

var appFunction= {
  chooseLocation: function(element){
    var choisenLocationId = $(element.target).attr("id");
    var choisenLocation;
    for(var i = 0; i < currentResults.locations.length; i++) {
      if(currentResults.locations[i].attributes.OBJECTID == choisenLocationId) {
        choisenLocation = currentResults.locations[i];
        break;
      }
    }

    $('#chooseLocationSection').show();
    $('#chooseLocationSection h3').text(choisenLocation.attributes.NAME_LANG);
    $('#locationPreis').text(choisenLocation.preis);
  },
  chooseDj: function(element){
    var choisenDjId = $(element.target).attr("id");
    var choisenDj;
    for(var i = 0; i < currentResults.dj.length; i++) {
      if(currentResults.dj[i].id == choisenDjId) {
        choisenDj = currentResults.dj[i];
        break;
      }
    }

    $('#choosenDjSection').show();
    $('#choosenDjSection h3').text(choisenDj.vorName);
    $('#DjPreis').text(choisenDj.preis);
  },
  chooseCaterer: function(element){
    var choisenCatererId = $(element.target).attr("id");
    var choisenCaterer;
    for(var i = 0; i < currentResults.caterer[0].value.length; i++) {
      if(currentResults.caterer[0].value[i].id == choisenCatererId) {
        choisenCaterer = currentResults.caterer[0].value[i];
        break;
      }
    }

    $('#choosenCatererSection').show();
    $('#choosenCatererSection h3').text(choisenCaterer.vorName);
    $('#CatererPreis').text(choisenCaterer.preis);
  },
  initMap : function() {
      navigator.geolocation.getCurrentPosition(function(position) {
          appState.myLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

          appState.map = new google.maps.Map(document.getElementById('map'), {
              zoom: 12,
              center: appState.myLocation
          });

          appState.myLocationMarker = new google.maps.Marker({
              position: appState.myLocation,
              map: appState.map
          });

          loadLoactionsFromKoeln(function(locations){
            appState.koelnLocations = locations;
            appState.koelnLocationMarkers = defineMarkers(locations);
            var markersToSet = [];
            appState.koelnLocationMarkers.forEach(function(marker){
              markersToSet.push(marker);
            });
            setMapOnAll(appState.map, markersToSet);
          });
      })
  },
  sendEventPlan : function(){
    var budget = document.getElementById("budget").value;
    var personNumber = document.getElementById("personNumber").value;
    var genre = document.getElementById("dropdownMenu").value;
    var request = "http://localhost:8080/sugession?userInput=" +budget+"&genre="+genre;

    $.getJSON(request).done(function(result){
      console.log(result);
      currentResults = result;
      var section = [];
      section[0] = document.getElementById('section1');
      section[1] = document.getElementById('section2');
      section[2] = document.getElementById('section3');

      for(l=0; l<section.length;l++){
        switch(section[l]){
          case section[0]:
              for(i=0; i<result.locations.length ;i++){
                var newlocationdiv = document.createElement("div");
                newlocationdiv.setAttribute('class', 'col-md-12');
                newlocationdiv.className += ' col-md-6';
                var thumbnail = document.createElement("div");
                thumbnail.setAttribute('class', 'thumbnail');
                newlocationdiv.appendChild(thumbnail);

                var caption = document.createElement("div");
                caption.setAttribute('class', 'caption');
                thumbnail.appendChild(caption);

                var header = document.createElement('h3');
                var headerContent = document.createTextNode(result.locations[i].attributes.NAME_LANG);
                header.appendChild(headerContent);
                caption.appendChild(header);

                var imgDiv = document.createElement("div");
                imgDiv.setAttribute('class', 'col-3');
                var img = document.createElement("img");
                img.setAttribute("src", "https://www.seegebiet-mansfelder-land.de/de/datei/zuschneiden/200x200/id/6472,1166/B%C3%BCrgersaal-17.JPG");
                imgDiv.appendChild(img);

                var descriptionDiv = document.createElement("div");
                descriptionDiv.setAttribute('class', 'col-9');
                var descriptions = ["Beschreibung:", "Adresse:", "Preis:"];
                var locationcontent = ["At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum", result.locations[i].attributes.ADRESSE , result.locations[i].preis];
                for(k=0;k<3;k++){
                  var descHeader = document.createElement("h4");
                  var headerName = document.createTextNode(descriptions[k]);
                  descHeader.appendChild(headerName);
                  var descriptionParagraph = document.createElement("p");
                  descriptionParagraph.appendChild(document.createTextNode(locationcontent[k]));
                  descriptionParagraph.appendChild(descHeader);
                  descriptionDiv.appendChild(descHeader);
                  descriptionDiv.appendChild(descriptionParagraph);
                }

                var noticeButton = document.createElement("button");
                noticeButton.appendChild(document.createTextNode("buchen"));
                noticeButton.setAttribute('class', 'btn btn-primary');
                $(noticeButton).attr("id", result.locations[i].attributes.OBJECTID)
                $(noticeButton).on('click', appFunction.chooseLocation);
                var removeButton = document.createElement("button");
                removeButton.appendChild(document.createTextNode("rückgängig machen"));
                removeButton.setAttribute('class', 'btn btn-default');
                var buttonParagraph = document.createElement("p");

                buttonParagraph.appendChild(noticeButton);
                buttonParagraph.appendChild(removeButton);

                caption.appendChild(imgDiv);
                caption.appendChild(descriptionDiv);
                caption.appendChild(buttonParagraph);

                var locationResultDiv = document.getElementById("locationResults");
                locationResultDiv.appendChild(newlocationdiv);
              }
            break;
          case section[1]:
              console.log("Sie befinden sich in Section 2");
              for(i=0; i<result.dj.length ;i++){
                var newlocationdiv = document.createElement("div");
                newlocationdiv.setAttribute('class', 'col-md-12');
                newlocationdiv.className += ' col-md-6';
                var thumbnail = document.createElement("div");
                thumbnail.setAttribute('class', 'thumbnail');
                newlocationdiv.appendChild(thumbnail);

                var caption = document.createElement("div");
                caption.setAttribute('class', 'caption');
                thumbnail.appendChild(caption);

                var header = document.createElement('h3');
                var headerContent = document.createTextNode(result.dj[i].vorName);
                header.appendChild(headerContent);
                caption.appendChild(header);

                var imgDiv = document.createElement("div");
                imgDiv.setAttribute('class', 'col-3');
                var img = document.createElement("img");
                img.setAttribute("src", "./img/dj.jpg");
                imgDiv.appendChild(img);

                var descriptionDiv = document.createElement("div");
                descriptionDiv.setAttribute('class', 'col-9');
                var descriptions = ["Beschreibung:", "Genre:", "Preis:"];
                var locationcontent = ["At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum", result.dj[i].genre , result.dj[i].preis];
                for(k=0;k<3;k++){
                  var descHeader = document.createElement("h4");
                  var headerName = document.createTextNode(descriptions[k]);
                  descHeader.appendChild(headerName);
                  var descriptionParagraph = document.createElement("p");
                  descriptionParagraph.appendChild(document.createTextNode(locationcontent[k]));
                  descriptionParagraph.appendChild(descHeader);
                  descriptionDiv.appendChild(descHeader);
                  descriptionDiv.appendChild(descriptionParagraph);
                }

                var noticeButton = document.createElement("button");
                noticeButton.appendChild(document.createTextNode("buchen"));
                noticeButton.setAttribute('class', 'btn btn-primary');
                $(noticeButton).attr("id", result.dj[i].id);
                $(noticeButton).on('click', appFunction.chooseDj);
                var removeButton = document.createElement("button");
                removeButton.appendChild(document.createTextNode("rückgängig machen"));
                removeButton.setAttribute('class', 'btn btn-default');
                var buttonParagraph = document.createElement("p");
                buttonParagraph.appendChild(noticeButton);
                buttonParagraph.appendChild(removeButton);

                caption.appendChild(imgDiv);
                caption.appendChild(descriptionDiv);
                caption.appendChild(buttonParagraph);

                var locationResultDiv = document.getElementById("djResults");
                locationResultDiv.appendChild(newlocationdiv);
              }
            break;
          case section[2]:
              console.log("Sie befinden sich in Section 3");
              for(i=0; i<result.caterer[0].value.length ;i++){
                var newlocationdiv = document.createElement("div");
                newlocationdiv.setAttribute('class', 'col-md-12');
                newlocationdiv.className += ' col-md-6';
                var thumbnail = document.createElement("div");
                thumbnail.setAttribute('class', 'thumbnail');
                newlocationdiv.appendChild(thumbnail);

                var caption = document.createElement("div");
                caption.setAttribute('class', 'caption');
                thumbnail.appendChild(caption);

                var header = document.createElement('h3');
                var headerContent = document.createTextNode(result.caterer[0].value[i].vorName);
                header.appendChild(headerContent);
                caption.appendChild(header);

                var imgDiv = document.createElement("div");
                imgDiv.setAttribute('class', 'col-3');
                var img = document.createElement("img");
                img.setAttribute("src", "./img/caterer.png");
                imgDiv.appendChild(img);

                var descriptionDiv = document.createElement("div");
                descriptionDiv.setAttribute('class', 'col-9');
                var descriptions = ["Beschreibung:", "Alter:", "Preis:"];
                var locationcontent = ["At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum", result.caterer[0].value[i].alter , result.caterer[0].value[i].preis];
                for(k=0;k<3;k++){
                  var descHeader = document.createElement("h4");
                  var headerName = document.createTextNode(descriptions[k]);
                  descHeader.appendChild(headerName);
                  var descriptionParagraph = document.createElement("p");
                  descriptionParagraph.appendChild(document.createTextNode(locationcontent[k]));
                  descriptionParagraph.appendChild(descHeader);
                  descriptionDiv.appendChild(descHeader);
                  descriptionDiv.appendChild(descriptionParagraph);
                }

                var noticeButton = document.createElement("button");
                noticeButton.appendChild(document.createTextNode("buchen"));
                noticeButton.setAttribute('class', 'btn btn-primary');
                $(noticeButton).attr("id", result.caterer[0].value[i].id);
                $(noticeButton).on('click', appFunction.chooseCaterer);
                var removeButton = document.createElement("button");
                removeButton.appendChild(document.createTextNode("rückgängig machen"));
                removeButton.setAttribute('class', 'btn btn-default');
                var buttonParagraph = document.createElement("p");
                buttonParagraph.appendChild(noticeButton);
                buttonParagraph.appendChild(removeButton);

                caption.appendChild(imgDiv);
                caption.appendChild(descriptionDiv);
                caption.appendChild(buttonParagraph);

                var locationResultDiv = document.getElementById("catererResults");
                locationResultDiv.appendChild(newlocationdiv);
              }
            break;
          default:
            console.log("l beträgt :" + l);
        }
      }

      // for(l=0; l<sections.length;l++){
      //   if(result[l].locations){
      // }else {
      //   console.log("Außerhalb section1");
      // }
      // }

    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "Alwaysplace" );
    });

  }
}

$(document).ready(function() {
  $.getJSON("http://localhost:8080/toplocations").done(function(result){
    $('#topLocations').find("tr:gt(0)").remove();

    for(var i = 0; i<result.length; i++) {
      $('#topLocations tr:last').after('<tr><td>'+result[i].attributes.NAME+
        '</td><td>'+result[i].gesamtbewertung.toFixed(2)+' / 10</td></tr>');
    }
  });
});
