// import Cookies from 'js-cookie'

const app = {
    state: {
        
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {

        },
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        }
    }
}

export default app