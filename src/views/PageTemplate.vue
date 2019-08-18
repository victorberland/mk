<template>
  <main v-if="page">
    <h1>{{ page.title }}</h1>
    <div v-html="page.content"></div>
  </main>
</template>

<script>
import api from '../api';

export default {
  name: 'PageTemplate',
  data: () => ({
    not_found: false,
    page: null
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
    api.get(`/victor/v1/pages/${to.params.slug}`).then(response => {
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

  methods: {
    // Sett data fra "next" når komponentet blir laget
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
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
