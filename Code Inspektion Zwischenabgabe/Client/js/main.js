var appState= {};
var map;


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
    var genre = document.getElementById("dropdownMenuButton").value;
    var request = "http://localhost:8080/sugession?userInput=" +budget;

    $.getJSON(request).done(function(result){
      console.log(result);
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
                var descriptions = ["Beschreibung:", "Adresse:", "Webseite:"];
                var locationcontent = ["At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum", result.locations[i].attributes.ADRESSE , result.locations[i].attributes.HYPERLINK];
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
                noticeButton.setAttribute('class', 'btn btn-primary')
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
                img.setAttribute("src", "https://www.seegebiet-mansfelder-land.de/de/datei/zuschneiden/200x200/id/6472,1166/B%C3%BCrgersaal-17.JPG");
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
                noticeButton.setAttribute('class', 'btn btn-primary')
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
                img.setAttribute("src", "https://www.seegebiet-mansfelder-land.de/de/datei/zuschneiden/200x200/id/6472,1166/B%C3%BCrgersaal-17.JPG");
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
                noticeButton.setAttribute('class', 'btn btn-primary')
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
