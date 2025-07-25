import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import './style.css'
import router from './routers/routers'

// Import Quasar CSS
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.sass'

const app = createApp(App)
app.use(router)

app.use(Quasar, {
    plugins: {}, 
})

app.mount('#app')
