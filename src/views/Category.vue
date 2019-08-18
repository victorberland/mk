<template>
  <div class="page">
    <p class="exit" @click="close">Lukk</p>
    <div class="page-bubble"
    :class="{ 'loaded-bubble': loaded}"></div>
    <transition name="fade">
      <main class="main" v-show="showText">
        <h1 class="title">{{ title }}</h1>
        <div class="text" v-html="content"></div>
        <ul class="posts">
          <li v-for="post in posts">
            <router-link :to="{ name: 'Page', params: { category: slug, slug: post.title_slug }}">{{ post.title }}</router-link>
          </li>
        </ul>
      </main>
    </transition>
  </div>
</template>

<script>
import api from '../api';
import router from '../router';

export default {
  name: 'Category',
  data: () => ({
    loaded: false,
    showText: false,
    posts: '',
    not_found: false,
    page: null,
    slug: ''
  }),
  // Hent innhold før componentet (viewen)
  // blir "laget".
  // https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-before-navigation
  // bruk beforeRouteUpdate i App.vue for å trigge
  // animasjoner før nytt komponent er klart
  // Se rekkefølge på events ved route change her:
  // https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
  beforeRouteEnter (to, from, next) {
    // Send request til ruten vi har opprettet i APIen
    // this.slug = to.params.slug;
    api.get(`/collections/get/categories/${to.params.slug}?token=282daa48751b0ac32d31dc14eac44c`).then(response => {
      // this er enda ikke tilgjengelig siden beforeRouteEnter
      // kjøres før komponentet for ruten enda ikke er opprettet
      // men du kan maniopulere komponentet i next callbacken
      // les mer her:
      // https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
      next(vm =>  vm.setData(response.data));
    }).catch(error => {
      // Ikke funnet etc.
      // her kan du sjekke hva som gikk galt
      // Og redirecte til feilmelding side.
      // { '0': to.path } er en hack, les mer her:
      // https://github.com/vuejs/vue-router/issues/724#issuecomment-349966378
      next({ name: '404', params: { '0': to.path } });
    });
  },
  computed: {
    // slug () {
    //   return this.$route.params.slug;
    // }
  },
  methods: {
  },
  created () {
    var slug = this.$route.params.slug
		this.slug = slug

    // Get category content
		api({
			method: 'get',
			url: 'collections/get/categories?token=282daa48751b0ac32d31dc14eac44c',
			body: JSON.stringify({
        filter: { title_slug: slug },
			})
		})
      .then( response => {
				//console.log(response);
        this.title = response.data.entries[0].title
        this.content = this.innerHTML = response.data.entries[0].content

      })
      .catch( error => {
        console.log(error);
      });

    // Get posts in category
		api({
			method: 'get',
			url: 'collections/get/posts?token=282daa48751b0ac32d31dc14eac44c',
			body: JSON.stringify({
        filter: { category: slug },
			})
		})
      .then( posts => {
        console.log(posts);
				this.posts = posts.data.entries
      })
      .catch( error => {
        console.log(error);
      });

  },
  mounted () {
    var self = this;
    setTimeout(function() {
      self.loaded = true;
    }, 300);
    setTimeout(function() {
      self.showText = true;
    }, 1800);

  },
  methods: {
    close: function() {
      this.showText = false;
      var self = this;
      setTimeout(function() {
        self.loaded = false;
      }, 800);
      setTimeout(function() {
        router.push({ path: '/' });
      }, 2500);
    },
    setData (data) {
      this.page = data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../presets';

.exit {
  position: absolute;
  right: 5%;
  top: 5%;
  opacity: 0.5;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.page-bubble {
  position: fixed;
  height: 100vw;
  width: 100vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 100%;
  background-image: linear-gradient(to bottom, lighten($signature, 3%), $gradient);
  z-index: 1;
  transition: 1.3s ease;
}
.loaded-bubble {
  top: -30vh!important;
  left: -30vh!important;
  height: 120vh!important;
  width: 120vh!important;
  transform: translate(0,0)!important;
  position: absolute!important;
}

.main {
  margin-left: 28%;
  margin-right: 28%;
  position: absolute;
  z-index: 2;
  margin-top: 130px;
  img {
    max-width: 100%;
    height: auto;
  }
  .title {
    letter-spacing: 0.01em;
    margin-bottom: 100px;
    font-size: 3.5em;
    color: #222;
  }
  .text {
    line-height: 1.9em;
    margin-bottom: 100px;
    color: #333;
  }
  .posts {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    li {
      float: left;
      border-radius: 100%;
      padding: 2em;
      position: relative;
      transition: 1.1s ease;
      background-image: linear-gradient(to bottom right, lighten($signature, 4%), $gradient);
      margin: 30px;
      height: 30vh;
      width: 30vh;
      a {
        position: absolute;
        text-align: center;
        top: 50%;
        padding: 5em 0;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 0;
        width: 100%;
        color: desaturate(darken($signature, 40%), 60%);
        &:hover {
          background: none;
        }
      }
    }
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
