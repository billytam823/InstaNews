export const articleFilter = () => {
        
      let newsItems = " ";
      let articleNum = 0; //Keep tracks of how many articles with images
      let articles = 0; //Use for cycling through the amount of articles

      $.each(data.results, () => {

        //Checks if Multimedia section is empty
        if(data.results[articles].multimedia !== "" && data.results[articles].multimedia.length === 5 && articleNum < 12){
        newsItems += '<div class="article outter-square">';
        newsItems += '<a class="article-bg inner-square" href="'+ data.results[articles].url +'" target="_blank"';
        newsItems += 'style="background-image:url(\'' + data.results[articles].multimedia[4].url + '\')">';
        newsItems += '<p class="abstract">' + data.results[articles].abstract + '</p>';
        newsItems += '</a>';
        newsItems += '</div>';
        
        articles++;
        articleNum++;

        }else{ //skip to next article if it doesnt have multimedia

          articles++;
        
        }

      });

        // Add news item to the content area
        $content.append(newsItems);

      }