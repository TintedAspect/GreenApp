var news = new Vue({
  el: '#outer',
  data: {
    articles: []
  },
  created() {
    var vm = this
        axios.get('https://newsapi.org/v2/everything?' +
          'q=sustainable-living|' +
          'renewable|' +
          'climate|' +
          'environment|' +
          'zero-emission|' +
          'zero-waste&' +
          'from=' + getDate() + '&' +
          'sortBy=popularity&' +
          'apiKey=d292b50c7ef04e53846162db003c65d4')
          .then(function(response) {
            vm.articles = response.data.articles
          })

  }

})

function getDate() {
  var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
  var date = new Date();
  var m = date.getMonth();
  date.setMonth(m-1);

  date = date.toLocaleDateString("ko-KR", options).replace(/. /g, "-");
  var len = date.length;
  date = date.slice(0, (len-1));
  console.log(date);
  return date;
}
