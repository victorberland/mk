<template>
  <div class="home">
    <main class="home-content" v-html="front">
    </main>
    <ul class="bubbles">
      <!--<li v-for="page in pages" class="bubble" @click="$event.target.classList.add('bubble-up')">-->
        <li v-for="category in categories" class="bubble" @click="bubbleClick($event, category)">
        <h2>{{ category.title }}</h2>
      </li>
    </ul>
          <!--<sign-up @loading="loading = true" @fade-content="fadeContent = true"></sign-up>-->

          <!--<router-link :to="{ name: 'sharepage' }">Gå til delingsside</router-link>-->
  </div>
</template>

<script>
import api from '../api';
import router from '../router';


export default {
  name: 'front',
  data: () => ({
		front: '',
    categories: '',
    loaded: false,
    loading: false,
    fadeContent: false,
    clicked: false
  }),
  created () {

    // Get front page content
    api.get('singletons/get/front?token=282daa48751b0ac32d31dc14eac44c')
      .then( response => {
        this.front = response.data.content

      })
      .catch( error => {
        console.log(error);
      });

    // Get pages
		api.get('collections/get/categories?token=282daa48751b0ac32d31dc14eac44c')
      .then( response => {
        this.categories = response.data.entries;

      })
      .catch( error => {
        console.log(error);
      });
  },
  mounted () {
    setTimeout(() => {
      this.loaded = true;
      this.$emit('content-ready');
    }, 1000);
    this.$emit('shareSingle');

    document.addEventListener('mousemove', mouseParallax, false);
    function mouseParallax(e) {

      var pageX = e.pageX;
      var pageY = e.pageY;

      document.querySelector('.bubble:nth-child(1)').style.transform = 'translate(-'+ pageX / 40 +'px, -'+ pageY / 40 +'px)';
      document.querySelector('.bubble:nth-child(2)').style.transform = 'translate(-'+ pageX / 80 +'px, -'+ pageY / 80 +'px)';
      document.querySelector('.bubble:nth-child(3)').style.transform = 'translate(-'+ pageX / 50 +'px, -'+ pageY / 50 +'px)';
      document.querySelector('.bubble:nth-child(4)').style.transform = 'translate(-'+ pageX / 10 +'px, -'+ pageY / 10 +'px)';
      document.querySelector('.bubble:nth-child(4)').style.transform = 'translate(-'+ pageX / 70 +'px, -'+ pageY / 70 +'px)';
      document.querySelector('.bubble:nth-child(6)').style.transform = 'translate(-'+ pageX / 22 +'px, -'+ pageY / 22 +'px)';
    }
  },
  methods: {
    bubbleClick: function(e, c) {
      e.target.classList.add('bubble-up');
      var slug = c.title_slug;

      setTimeout(function() {
        router.push({ name: 'Category', params: { slug: slug }})
      }, 1500);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../presets';

.home {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: absolute;
}

.home-content {
  position: absolute;
  top: 29vh;
  left: 25%;
  text-transform: uppercase;
	line-height: 2em;
	//color: desaturate(darken($signature, 60%), 60%);
	color: #333;
}

.bubbles {
  list-style: none;
  .bubble {
    border-radius: 100%;
    padding: 2em;
    position: absolute;
    transition: 1.1s ease;
    background-image: linear-gradient(to bottom right, lighten($signature, 4%), $gradient);
    cursor: pointer;
    h2 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      margin: 0;
      text-transform: uppercase;
      transition: font-size 0.7s ease;
      pointer-events: none;
      letter-spacing: 0.1em;
      opacity: 0.3;
    }
    &:hover {
      margin-top: -10px;
    }
  }
}
.bubble:nth-child(1) {
  height: 330px;
  width: 330px;
  top: -2vh;
  left: 10%;
  //background-image: linear-gradient(to left, transparent, $gradient);
}
.bubble:nth-child(2) {
  height: 230px;
  width: 230px;
  top: -4vh;
  left: 45%;
  font-size: 0.8em;
  //background-image: linear-gradient(to top, transparent, $gradient);
}
.bubble:nth-child(3) {
  height: 270px;
  width: 270px;
  top: 13vh;
  left: 68%;
  font-size: 1em;
  //background-image: linear-gradient(to top right, transparent, $gradient);
}
.bubble:nth-child(4) {
  height: 600px;
  width: 600px;
  top: 55vh;
  left: 0;
  font-size: 1.4em;
  //background-image: linear-gradient(to bottom left, transparent, $gradient);
}
.bubble:nth-child(5) {
  height: 230px;
  width: 230px;
  top: 55vh;
  left: 50%;
  font-size: 0.9em;
  //background-image: linear-gradient(to bottom left, transparent, $gradient);
}
.bubble:nth-child(6) {
  height: 400px;
  width: 400px;
  left: 84%;
  top: 50vh;
  //background-image: linear-gradient(to bottom right, transparent, $gradient);
}

.bubble-up {
  top: 50%!important;
  left: 50%!important;
  transform: translate(-50%,-50%)!important;
  height: 100vw!important;
  width: 100vw!important;
  z-index: 10;
  h2 {
    font-size: 40px!important;
  }
}



.fade-enter-active,
.fade-leave-active {
}
.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-50px);
}

.fade-leave {
  transform: translateY(0);
  transition: opacity 0.8s, transform 0.8s;
}
</style>
