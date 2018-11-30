// Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCBAnRCYa0FZ_0J7b_jNMS8SLTrWxPZ8R4",
    authDomain: "code-club-de247.firebaseapp.com",
    databaseURL: "https://code-club-de247.firebaseio.com",
    projectId: "code-club-de247",
    storageBucket: "code-club-de247.appspot.com",
    messagingSenderId: "1048134675910"
  };
  firebase.initializeApp(config);

var dbRef = firebase.database();
var dataRef = dbRef.ref('candidates');
var data = [];
dataRef.once('value').then(function(snapshot) {
    data = snapshot.val();
    console.log(data);
});


function search(nameKey, dataArray){
    var filteredData = [];
    for (var i=0; i < dataArray.length; i++) {
        if (dataArray[i].category === nameKey) {
            filteredData.push(dataArray[i])
        }
    }
    showData(filteredData);
}

function showData(filteredData) {
    var finishedData = "";
    for (var n=0; n < filteredData.length; n++) {
        finishedData += buildHtml(filteredData[n]);
    }
    console.log(finishedData);
    $("#filtered-data").html(finishedData);
}


function buildHtml(item) {
    var html = "<div class='item'>"
                + "<div class='image'>"
                    + "<img src='" + item.thumbnail + "' alt='" + item.name + " bio' />"
                + "</div>"
                + "<div class='info'>"
                    + "<h3>" + item.name + "</h3>"
                    + "<p>" + item.short_description + "</p>"
                    + "<button class='go-to-item' data-target='" + item.id + "' type='button'>Read more</button>"
                + "</div>"
            + "</div>"
    return html;
}

function getIndividualDataItem(id, dataArray){
    var dataItem = [];
    for (var i=0; i < dataArray.length; i++) {
        if (dataArray[i].id === id) {
            dataItem.push(dataArray[i])
        }
    }
    $("#full-item-view .image img").attr("src", dataItem[0].thumbnail)
    $("#full-item-view .image img").attr("alt", dataItem[0].name + " bio")
    $("#full-item-view .info h3").text(dataItem[0].name)
    $("#full-item-view .info .long-description").text(dataItem[0].long_description)
}

$("#filter-data").on("click", function() {
    var category = $("#filter select").val();
    var categoryText = $("#filter select option[value=" + category + "]").text();
    search(category, data);
    $("h2").fadeIn();
    $("#result-type").text(categoryText);
});

$("#filtered-data").on("click", ".go-to-item", function() {
    var target = $(this).data("target");
    $("#results-list").hide();
    $("#full-item-view").show();
    getIndividualDataItem(target, data)
});

$("#back-to-start").on("click", function() {
    $("#results-list").show();
    $("#full-item-view").hide();
})
