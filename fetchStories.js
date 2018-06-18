//Dependencies
var cheerio = require("cheerio");
var request = require("request");

function fetchStories() {
  return new Promise(resolve => {
    request("http://www.nytimes.com", function(error, response, html) {

      const $ = cheerio.load(html);

      const results = []
      
      $('article.story').each(function(i, article) {
        const storyHeadingNode = $(article).children('.story-heading')

        const link = storyHeadingNode.children('a').attr('href');
        if (!link) return

        const title = storyHeadingNode.text().trim()
        const summary = $(article).children('.summary').text().trim()
        if (!summary) return

        results.push({
          title,
          link,
          summary
        })
      });

      resolve(results)
    })
  });

}

module.exports = fetchStories
