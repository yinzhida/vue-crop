# vue-crop
a simple vue component of croper,  Decoupling with Images, The maximum minimum aspectRatio value can be set.

## install & use
npm install --save vue-crop-simple

    import VueCrop from 'vue-crop-simple';
    Vue.use(VueCrop);

## props:
+ ### initRect
    Object  
    default {x1: -1, y1: -1, x2: -1, y2: -1}  
    you can set init crop area by this porp
+ ### showRect
    Boolean  
    default true  
    show or hide crop rect
+ ### resizeAble
    Boolean  
    default true  
    set the crop rect resizeable property
+ ### aspectRatio
    Number  
    default undefined  
    set the crop rect aspect radio property. this value makes from width / height
+ ### allowStartNewCrop
    Boolean  
    default true  
    allow draw a new rect(when a rect is showing).
+ ### minWidth
    Number  
    default undefined  
    the min width of crop rect
+ ### maxWidth
    Number  
    default undefined  
    the max width of crop rect
+ ### minHeight
    Number  
    default undefined  
    the min height of crop rect
+ ### maxHeight
    Number  
    default undefined  
    the max height of crop rect
## events:
+ ### beforeChange
    trigger when user is ready to drag the crop rect.
+ ### changed
    trigger when drag end
+ ### created
    trigger when croper component is mounted