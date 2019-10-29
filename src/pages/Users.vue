<template>
  <q-page class="flex">
    <q-header color="deep-orange" elevated class="bg-back text-white">
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm"/>
        <q-toolbar-title>
          GBP
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-list bordered separator style="width: 100%">
      <q-item clickable v-ripple v-for="user in users" :to="'user/'+user.login">
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.avatar_url">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{user.login}}</q-item-label>
          <q-item-label caption lines="1">{{user.html_url}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
  export default {
    name: "Users",
    data() {
      return {
        users: []
      }
    },
    created() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        const _this = this;
        _this.axios.get('/users', {})
          .then(function (response) {
            _this.users = response.data
          })
          .catch(function (error) {
          });
      }
    }
  }
</script>

<style scoped>

</style>
