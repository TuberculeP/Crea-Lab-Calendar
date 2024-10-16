"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
require("./style.css");
var App_vue_1 = require("./App.vue");
// Vuetify
require("vuetify/styles");
var vuetify_1 = require("vuetify");
var components = require("vuetify/components");
var directives = require("vuetify/directives");
var vuetify = (0, vuetify_1.createVuetify)({
    components: components,
    directives: directives,
});
(0, vue_1.createApp)(App_vue_1.default).use(vuetify).mount("#app");
