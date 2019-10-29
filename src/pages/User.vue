<template>
  <q-page-container>
    <q-page padding style="padding-top: 100px">
      <q-header color="deep-orange" elevated class="bg-back text-white">
        <q-toolbar>
          <q-btn flat round dense icon="keyboard_arrow_left" class="q-mr-sm" to="/" replace/>
          <q-toolbar-title>
            Actividades de usuario
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-list bordered separator style="width: 100%">
        <q-item-label class="bg-orange-9 text-white"  header>Pendientes</q-item-label>
        <q-item v-ripple v-for="(item,index) in activities" v-if="item.status === false">
          <q-item-section side top>
            <q-checkbox v-model="item.status" v-on:click.native="changeStatus(index)"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.activity}}</q-item-label>
            <q-item-label>{{item.date}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />
        <q-item-label class="bg-green-5 text-white"  header>Realizados</q-item-label>
        <q-item v-ripple v-for="(item,index) in activities" v-if="item.status === true">
          <q-item-section side top>
            <q-checkbox v-model="item.status" v-on:click.native="changeStatus(index)"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.activity}}</q-item-label>
            <q-item-label>{{item.date}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-dialog v-model="showAdd" full-width>
        <q-card>
          <q-form @submit="onActivity">
            <q-card-section>
              <div class="text-h6">Crear actividad</div>
            </q-card-section>
            <q-separator/>
            <q-card-section style="max-height: 50vh;width: 100%" class="scroll">
              <q-input ref="input" color="deep-orange" outlined v-model="activity" type="textarea"
                       label="Actividad"
                       :rules="[val => !!val || 'Describe la actividad']"
              />
            </q-card-section>
            <q-separator/>
            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" v-close-popup/>
              <q-btn flat label="Crear" color="primary" v-close-popup type="submit"/>
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>

      <q-page-sticky expand position="top">
        <q-toolbar class="bg-grey-5 text-white" style="height: 100px">
          <q-avatar size="100px">
            <img :src="user_data.avatar_url">
          </q-avatar>
          <q-toolbar-title>
            <p>{{user_data.name}}</p>
            <p>{{user_data.html_url}}</p>
          </q-toolbar-title>
        </q-toolbar>
      </q-page-sticky>


      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click="showAdd = true"/>
      </q-page-sticky>
    </q-page>
  </q-page-container>
</template>

<script>
  const moment = require('moment');
  export default {
    name: "User",
    data() {
      return {
        user: this.$route.params.user,
        user_data: [],
        showAdd: false,
        activity: null,
        activities: [],
        check: false
      }
    },
    created() {
      this.getUser();

    },
    methods: {
      changeStatus(index){
        console.log(index);
        //var dt = JSON.parse(localStorage.getItem(this.user));
        var dt =this.activities;
        console.log(dt[index].status)
        localStorage.setItem(this.user, JSON.stringify(dt));
        this.getActivity();
      },
      getActivity() {
        var dt = JSON.parse(localStorage.getItem(this.user));
        console.log(dt)
        this.activities = dt;
      },
      onActivity() {
        var dt = localStorage.getItem(this.user);
        moment.locale('es');
        var arr = [];
        var activity = {
          activity: this.activity,
          status: false,
          date: moment().format('LLLL')
        };
        if (dt === null) {
          arr.push(activity);
          localStorage.setItem(this.user, JSON.stringify(arr));
        } else {
          dt = JSON.parse(dt);
          dt.push(activity);
          localStorage.setItem(this.user, JSON.stringify(dt));
        }
        this.getActivity()
      },
      getUser() {
        const _this = this;
        _this.axios.get('/users/' + _this.user, {})
          .then(function (response) {
            _this.user_data = response.data;
            _this.getActivity();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>

</style>
