'use strict';

var $content = $('.content');

$(document).ready(function () {
    // When Document is Ready
    $('select').on('change', function () {
        // On Dropdown Button Change

        $('.header').addClass("minimized"); // Add class to shrink header

        $content.children().remove(); // Remove previous content

        // Shows Loader
        $content.append('<div class="loader"><img src="assets/images/ajax-loader.gif"></div>');

        // Grabs Category value from Dropdown Button
        var category = $('.category :selected').val();

        $.getJSON( // NYT API for Article List
        'http://api.nytimes.com/svc/topstories/v1/' + category + '.json?api-key=f157b849d96a2a6c75cf671b868049fd:9:75124091').done(function (data) {
            // After List is done Retrieving

            $content.children().remove(); // Remove previous content

            var newsItems = " ";
            var articleNum = 0; //Keep tracks of how many articles with images
            var articles = 0; //Use for cycling through the amount of articles

            $.each(data.results, function () {
                console.log(data.results[articles].multimedia.length);
                console.log(articles);
                //Checks if Multimedia section is empty
                if (data.results[articles].multimedia !== "" && data.results[articles].multimedia.length === 5 && articleNum < 12) {
                    newsItems += '<div class="article outter-square">';
                    newsItems += '<a class="article-bg inner-square" href="' + data.results[articles].url + '" target="_blank"';
                    newsItems += 'style="background-image:url(\'' + data.results[articles].multimedia[4].url + '\')">';
                    newsItems += '<p class="abstract">' + data.results[articles].abstract + '</p>';
                    newsItems += '</a>';
                    newsItems += '</div>';

                    articles++;
                    articleNum++;

                    return articleNum;
                } else {
                    //skip to next article if it doesnt have multimedia

                    articles++;
                }
            });

            // Add news item to the content area
            $content.append(newsItems);
        }).fail(function () {

            $content.children().remove();
            $content.append('<div class="fail"><p>Failed to retrieve articles from New York Times</p></div>');
        });
    });
});