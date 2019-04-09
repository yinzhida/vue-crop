import VueCrop from './src/js/vue-crop.vue';

VueCrop.install = (Vue) => {
  Vue.component('vue-crop', VueCrop);
};

export default VueCrop;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueCrop);
}
