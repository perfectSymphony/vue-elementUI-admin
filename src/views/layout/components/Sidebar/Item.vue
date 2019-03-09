<script>
// 函数化组件应用场景：
// 1、需要通过编程实现在多种组件中选择一种
// 2、children、props、或者data在传递子组件之前，处理他们
export default {
    name: 'MenuItem',
    // functional: true,此为函数化组件
    //Vue.js 组件提供了一个 functional 开关，设置为 true 后，就可以让组件变为无状态(没有data)、
    // 无实例(没有this上下文)的函数化组件。因为只是函数，所以渲染的开销相对来说，较小
    functional: true,
    props: {
        meta:{
            type:Object,
            default: () => {
                return {
                    title: '',
                    icon: ''
                }
            }
        }
    },
    // VUE一般使用template来创建HTML，然后在有的时候，我们需要使用javascript来创建html，这时候我们需要使用render函数
    // vue通过 template 来创建你的 HTML。但是，在特殊情况下，这种写死的模式无法满足需求，
    // 必须需要js的编程能力。此时，需要用render来创建HTML。
    // render方法的实质就是生成template模板
    //render函数的三个参数
    //1、(必要参数)主要用于提供DOM的html内容，类型可以是字符串、对象或函数
    // 2、(类型是对象，可选)用于设置这个DOM的一些样式、属性、传的组件的参数、绑定事件之类
    // 3、(类型是数组，数组元素类型是VNode，可选)主要是指该结点下还有其他结点，用于设置分发的内容，
    //包括新增的其他组件。注意，组件树中的所有VNode必须是唯一的
    render(createElement, context,vnodes =[]){
        //console.log(context)
        const { icon, title } = context.props.meta
        // console.log(context.props.meta)
        //vnodes是虚拟DOM的简称

        if(icon){
            vnodes.push(<svg-icon icon-class={icon} />)
        }

        if(title){
            vnodes.push(<span slot='title'>{(title)}</span>)
        }
        return vnodes
    }
}
</script>
