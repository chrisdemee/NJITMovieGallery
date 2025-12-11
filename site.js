/* SITE.JS: THIS FILE CONTAINS THE METHODS/FUNCTIONS AND VARIABLES CONTROLLING YOUR SITE
//
*/

/* NOTE: MOVIES.JSON CONTAINS A LIST OF MOVIES AND ACCOMPANYING METADATA
//
//    They are in the following format:
//    title (String): the name of the movie
//    iscore (Number): the IMDB score
//    rating (String): the movie's MPAA rating
//    released (Array): the release date. Note that the order of the array is:  YYYY, MM, DD
//    country (String): the country of production
//    posters (Array): an array of String values with the URL to movie posters (in your img/ directory)
//    imdb (String): the URL to the corresponding IMDB website
//    website (String): the URL to the corresponding official website
//    likes (Number): a fictitious number of user likes
//    dislikes (Number): a fictitious number of user dislikes
//    posterindex (Number): a counter to use with the "posters" array to keep track of the current displayed poster index
//
// FOR STEP 16, ADD THREE OF YOUR OWN FAVORITE MOVIES WITH METADATA TO THE END OF THE JSON FILE LIST
*/


// Wrap app creation in an initializer so site.js can safely run even if Vue
// hasn't loaded yet (prevents "Vue is not defined" runtime errors).
function initVueApp() {
      const vue_app = Vue.createApp({
            // This automatically imports your movies.json file and puts it into
            //   the variable: movies
            created () {
                  // Set the document title from the Vue data
                  if (this.siteTitle) document.title = this.siteTitle

                  fetch('movies.json').then(response => response.json()).then(json => {
                        this.movies = json
                  }).catch(err => {
                        console.error('Failed to load movies.json', err)
                  })
            },
            data() {
                  return {
                        // This holds your movies.json data.
                        movies: [],
                        /* ADD ADDITIONAL VARIABLES FOR STEP 3 HERE */
                        siteTitle: 'IMDB + Chris top movies',
                        owner: 'Chris Demetri',
                        githubRepo: 'https://github.com/chrisdemee/NJITMovieGallery'
                  }
            },
            methods: {
                  /* ADD FUNCTIONS/METHODS FOR STEP 7 HERE */
                  getMonthText(dateArray) {
                        if (!Array.isArray(dateArray)) return ''
                        const year = dateArray[0]
                        const month = dateArray[1]
                        const day = dateArray[2]
                        let monthText
                        switch(month) {
                              case 1: monthText = 'January'; break;
                              case 2: monthText = 'February'; break;
                              case 3: monthText = 'March'; break;
                              case 4: monthText = 'April'; break;
                              case 5: monthText = 'May'; break;
                              case 6: monthText = 'June'; break;
                              case 7: monthText = 'July'; break;
                              case 8: monthText = 'August'; break;
                              case 9: monthText = 'September'; break;
                              case 10: monthText = 'October'; break;
                              case 11: monthText = 'November'; break;
                              case 12: monthText = 'December'; break;
                              default: monthText = 'Unknown'
                        }
                        return `${monthText} ${day}, ${year}`
                  },
                  like(index) {
                        if (!this.movies || !this.movies[index]) return
                        const m = this.movies[index]
                        if (typeof m.likes !== 'number') m.likes = 0
                        m.likes = m.likes + 1
                  },
                  dislike(index) {
                        if (!this.movies || !this.movies[index]) return
                        const m = this.movies[index]
                        if (typeof m.dislikes !== 'number') m.dislikes = 0
                        m.dislikes = m.dislikes + 1
                  },
                  posterClick(index) {
                        if (!this.movies || !this.movies[index]) return
                        const m = this.movies[index]
                        if (!Array.isArray(m.posters) || m.posters.length === 0) return
                        if (typeof m.posterindex !== 'number') m.posterindex = 0
                        m.posterindex = (m.posterindex + 1) % m.posters.length
                  },
                  timeText(minutes) {
                        const hrs = Math.trunc(minutes / 60)
                        const mins = minutes % 60
                        return `${hrs}h ${mins}m`
                  }
            }
      })

      vue_app.mount('#vue_app')
}


if (window.Vue) {
      initVueApp()
} else {
      // Poll for Vue available
      let tries = 0
      const maxTries = 100 
      const interval = setInterval(() => {
            if (window.Vue) {
                  clearInterval(interval)
                  initVueApp()
                  return
            }
            tries++
            if (tries >= maxTries) {
                  clearInterval(interval)
                  console.error('Vue.js not found after waiting; site may not work correctly')
            }
      }, 100)
}
