export const state = () => ({
  count: 0,
})

export const actions = {
  inc({ commit }) {
    commit('increment')
  },
  dec({ commit }) {
    commit('decrement')
  },
}

export const mutations = {
  increment(state) {
    console.log('Call the mutations increment')
    state.count++
  },
  decrement(state) {
    console.log('Call the mutations decrement')
    state.count--
  },
}
