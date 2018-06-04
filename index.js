import VueCrop from './src/VueCrop.vue';

const VueCrop = {
    install (Vue, options) {
        Vue.component('vue-crop', VueCrop);
    }
};

export default VueCrop;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueCrop);
}
