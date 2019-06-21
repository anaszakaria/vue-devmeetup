import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/alert.vue'
import {
    Vuetify,
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimepicker,
    VAlert,
    VProgressCircular,
    transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/main.styl'

Vue.use(Vuetify, {
    components: {
        VApp,
        VNavigationDrawer,
        VFooter,
        VList,
        VBtn,
        VIcon,
        VGrid,
        VToolbar,
        VCarousel,
        VCard,
        VTextField,
        VDatePicker,
        VTimepicker,
        VAlert,
        VProgressCircular,
        transitions
    },
    theme: {
        primary: '#8e24aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

// register global component
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCj91G4Q9dgGzpJy_TNUWE0re_go1DI33w',
            authDomain: 'devmeetup-62118.firebaseapp.com',
            databaseURL: 'https://devmeetup-62118.firebaseio.com',
            projectId: 'devmeetup-62118',
            storageBucket: 'devmeetup-62118.appspot.com'
        })
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('autoSignIn', user)
            }
        })
        this.$store.dispatch('loadMeetups')
    }
})
