import { createApp } from 'vue'
import { Quasar } from 'quasar'
import {router} from "./Routes/routes.js"


import '@quasar/extras/material-icons/material-icons.css'


import 'quasar/src/css/index.sass'


import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, 
})

app.use(router)

app.mount('#app')