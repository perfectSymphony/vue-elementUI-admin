import Mock from 'mockjs'


//访问如下地址：http://mockjs.com/examples.html 模拟接口
export default {
    list: () => {
        // mock响应模板
        const items = Mock.mock({
            'items|30': [{ //随机生成包含30个元素的数组
                id: '@id',
                title: '@sentence(10,20)',
                'status|1': ['published', 'draft', 'deleted'],
                author: 'perfectSymphony',
                display_time: '@datetime',
                pageviews: '@integer(500,700)'
            }]
        })
        return {
            code: 20000,
            data: items
        }
    }
}