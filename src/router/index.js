import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/**
 * layout引入
 */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => 
        import('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index')
        }]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: {
            title: 'Example',
            icon: 'example'
        },
        children: [{
                path: 'table',
                name: 'Table',
                component: () =>
                    import ('@/views/table/index'),
                meta: {
                    title: 'Table',
                    icon: 'table'
                }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ('@/views/tree/index'),
                meta: {
                    title: 'Tree',
                    icon: 'tree'
                }
            }
        ],
    },
    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [{
            path: 'menu1',
            name: 'Menu1',
            component: () =>
            import('@/views/nested/menu1/index'),
            meta: {
                title: 'Menu1'
            },
            children:[
                {
                    path: 'menu1-1',
                    name: 'menu1-1',
                    component: () => 
                    import('@/views/nested/menu1/menu1-1'),
                    meta: {
                        title: 'menu1-1'
                    }
                },
                {
                    path: 'menu1-2',
                    name: 'menu1-2',
                    component: () => 
                    import('@/views/nested/menu1/menu1-2'),
                    meta: {
                        title: 'menu1-2'
                    },
                    children: [
                        {
                            path: 'menu1-2-1',
                            name: 'menu1-2-1',
                            component: () =>
                            import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                            meta: {
                                title: 'menu1-2-1'
                            }
                        },
                        {
                            path: 'menu1-2-2',
                            name: 'menu1-2-2',
                            component: () =>
                            import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                            meta: {
                                title: 'menu1-2-2'
                            } 
                        }
                    ]
                },
                {
                    path: 'menu1-3',
                    name: 'Menu1-3',
                    component: () => 
                    import('@/views/nested/menu1/menu1-3'),
                    meta: {
                        title: 'Menu1-3'
                    }
                }
            ]
        },{
            path: 'menu2',
            name: 'menu2',
            component: () => 
            import('@/views/nested/menu2/index'),
            meta: {
                title: 'menu2'
            }
        }]
    },
    {
        path: '*',
        redirect: '404',
        hidden: true
    }
]

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})