var $content = $('.content');

$(document).ready(function(){ // When Document is Ready
  $('select').on('change', function(){ // On Dropdown Button Change

    $('.header').addClass("minimized"); // Add class to shrink header
    
    // Grabs Category value from Dropdown Button
    var category = $('.category :selected').val();

    // Shows Loader
    $content.append('<div class="loader"><img src="assets/images/ajax-loader.gif"></div>');

    $.getJSON( // NYT API for Article List
      'http://api.nytimes.com/svc/topstories/v1/'+ category +'.json?api-key=f157b849d96a2a6c75cf671b868049fd:9:75124091'
      )

    .done(function(data){ // After List is done Retrieving

      $content.children().remove(); // Remove previous content

      var newsItems = " ";
      var articleNum = 0;

      for(i=0; articleNum < 12; i++){ //Pulling the info from JSON 12 times

        //Checks if Multimedia section is empty
        if(data.results[i].multimedia !== ""){
        console.log(data.results[i].multimedia[2].url);
        newsItems += '<div class="article outter-square">';
        newsItems += '<a class="article-bg inner-square" href="'+ data.results[i].url +'" target="_blank"';
        newsItems += 'style="background-image:url(\'' + data.results[i].multimedia[4].url + '\')">';
        newsItems += '<p class="abstract">' + data.results[i].abstract + '</p>';
        newsItems += '</a>';
        newsItems += '</div>';
        
        articleNum++; //Keep tracks of how many articles with images

        }

      };

      // Add news item to the content area
      $content.append(newsItems);

    });


  })
  

});