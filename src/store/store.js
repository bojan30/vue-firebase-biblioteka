import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '../firebase/init'

Vue.use(Vuex)

//kontrola stanja aplikacije posle reload-a stranice
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    //kada se reloaduje stranica, potrebno je zadrzati ulogovanog korisnika
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    //handle real time changes in db
    db.collection('books').where('user_id', '==', user.uid).orderBy('author').onSnapshot(snapshot => {
      let booksArray = [];
      snapshot.forEach(doc => {
        let book = doc.data();
        book.id = doc.id;
        booksArray.push(book);
      });
      store.commit('setBooks', booksArray);
    })
  }
})

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    books: [],
    addBookModal: false,
    editBookModal: false,
    deleteBookModal: false,
    message: null
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    getUserProfile: (state) => {
      return state.userProfile;
    },
    getBooks: (state) => {
      return state.books
    },
    editBookModal: (state) => {
      return state.editBookModal;
    },
    deleteBookModal: (state) => {
      return state.deleteBookModal;
    },
    addBookModal: (state) => {
      return state.addBookModal;
    },
    getMessage: (state)=>{
      return state.message;
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setBooks(state, val) {
      state.books = val;
    },
    setDeleteBookModal(state, val) {
      state.deleteBookModal = val;
    },
    setEditBookModal(state, val) {
      state.editBookModal = val;
    },
    setAddBookModal(state, val) {
      state.addBookModal = val;
    },
    setMessage(state, val) {
      state.message = val;
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
    setMessage(context, val) {
      setTimeout(() => {
        context.commit('setMessage', val);
      }, 2000)
    }
  }
})

export default store;