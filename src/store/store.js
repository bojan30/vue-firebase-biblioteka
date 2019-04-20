import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '../firebase/init'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    books: [],
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    getUserProfile: (state) => {
      return state.userProfile;
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null);
      commit('setUserProfile', {});
    },
    fetchUserProfile({ commit, state }) {
      db.collection('users').where('user_id', '==', state.currentUser.uid).get().then(snapshot => {
        snapshot.forEach(doc => {
          commit('setUserProfile', doc.data())
        })
      }).catch(err => {
        console.log(err)
      })
    },
  }
})

export default store;