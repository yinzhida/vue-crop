import VueCrop from './src/VueCrop.vue';

const vueCropper = {
    install (Vue, options) {
        Vue.component('vue-crop', VueCrop);
    }
};

export default vueCropper;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueCropper);
}
