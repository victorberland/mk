<template>
  <form action="" class="join">
    <input v-model="name" type="text" name="name" placeholder="Name">
    <input v-model="email" type="email" name="email" placeholder="Email">
    <input @click.prevent="addParticipant" type="submit" value="Plant my seed">
  </form>
</template>

<script>
import api from '../api';

export default {
  name: 'SignUp',
  data: () => ({
    name: '',
    email: ''
  }),
  methods: {
    addParticipant() {
      const invite_code = this.$route.query.invite_code || '';
      api.post('isr/v1/add-participant', {
        email: this.email,
        name: this.name,
        invited_by: invite_code
      })
      .then( response => {
        //this.page = response.data;
        //this.$router.push()
        this.$emit('loading', true);
        console.log(response);
        this.$emit('fade-content');
        setTimeout(() => {
          window.history.back();
        }, 2000);
      })
      .catch( error => {
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../presets';

  .join {
    margin-top: 50px;
    margin-bottom: 100px;
    input {
      padding: 1.6em 2em;
      font-size: 1em;
      width: 100%;
      margin-bottom: 20px;
      border: 0;
      background-color: $green;
      color: #fff;
      transition: 0.1s ease-in-out;
      &:focus {
        outline: 0;
        border: 0;
        background-color: lighten($green, 20%);
      }
      &::placeholder {
        color: lighten($green, 40%);
      }
    }
    input[type="submit"] {
      cursor: pointer;
      width: 100%;
    }
  }
</style>
