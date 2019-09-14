<template>
  <div class="page">
    <p class="exit" @click="close">Lukk</p>
    <div class="page-bubble"
    :class="{ 'loaded-bubble': loaded}"></div>
    <transition name="fade">
      <main class="main" v-show="showText">
        <h1 class="title">{{ title }}</h1>
        <div class="text" v-html="content">
        </div>
      </main>
    </transition>
  </div>
</template>

<script>
import api from '../api';
import router from '../router';

export default {
  name: 'Page',
  data: () => ({
    title: '',
    content: '',
    loaded: false,
    showText: false
  }),
  methods: {
  },
  created () {
    var slug = this.$route.params.slug;
		var category = this.$route.params.category;
		alert(slug);
    // Get content
		api({
			method: 'post',
			url: '/collections/get/posts?token=282daa48751b0ac32d31dc14eac44c',
			body: JSON.stringify({
				filter: { title_slug: slug }
			})
		})
      .then( response => {
				console.log(response)
        this.title = response.data.entries[0].title
        this.content = this.innerHTML = response.data.entries[0].content

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
		// Close button
    close: function() {
      this.showText = false;
      var self = this;
      setTimeout(function() {
        self.loaded = false;
      }, 800);
      setTimeout(function() {
        router.push({ path: '/' });
      }, 2500);
    }
  }
}
</script>

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
  a {
    color: #333;
    text-decoration: none;
    border-bottom: 3px solid desaturate(darken($signature, 20%), 40%);
    padding: 0 6px;
    transition: 0.1s ease;
    &:hover {
      background-color: darken($signature, 5%);
    }
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
		max-width: 800px;
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
