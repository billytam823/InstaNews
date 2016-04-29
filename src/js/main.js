var $content = $('.content');

$(document).ready(function(){ // When Document is Ready
  $('select').on('change', function(){ // On Dropdown Button Change

    var category = $('.category :selected').val();
    console.log(category);

    $.getJSON( // NYT API for Article List
      'http://api.nytimes.com/svc/topstories/v1/'+ category +'.json?api-key=f157b849d96a2a6c75cf671b868049fd:9:75124091'
      )
    .done(function(data){ // After List is done Retrieving

      $('.header').addClass("minimized"); // Add class to shrink header
      $content.children().remove(); // Remove previous content

      var newsItems = " ";
      var articleNum = 0;

      for(i=0; articleNum < 12; i++){ //Pulling the info from JSON 12 times

        if(data.results[i].multimedia !== ""){
        console.log(data.results[i].multimedia[2].url);
        newsItems += '<div class="article outter-square"><div class="article-bg inner-square"><p><img class="article-image" src=\''+ data.results[i].multimedia[4].url +'\'></p></div></div>'
        
        articleNum++; //Keep tracks of how many article with images

        }

      };

      // Add news item to the content area
      $content.append(newsItems);

    });


  })
  

});