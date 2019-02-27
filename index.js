import VueCrop from './VueCrop.vue';

const vueCropper = {
    install (Vue) {
        Vue.component('vue-crop', VueCrop);
    }
};

export default vueCropper;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueCropper);
}
