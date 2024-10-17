import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

<<<<<<< HEAD
=======


// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";


>>>>>>> 33043860f20ee4dc3e42cf9520bd017fea107730
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
<<<<<<< HEAD
=======

>>>>>>> 33043860f20ee4dc3e42cf9520bd017fea107730
