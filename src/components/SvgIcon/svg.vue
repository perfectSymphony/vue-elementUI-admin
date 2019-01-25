<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>    
</template>

<script>
export default {
    name:'SvgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: { 
            type: String,
            default: ''
        }
    },
    computed: {
        svgClass() {
            if(this.className){
                return 
            }
        },
        iconName() {
            return `#icon-${this.iconClass}`
        }
    }
}
</script>

<style type="text/css">
/* svg字体图标通用样式 */
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
</style>