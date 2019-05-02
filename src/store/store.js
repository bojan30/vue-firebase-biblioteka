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

    //prati promene koje se desavaju u bazi, i reaguje na te promene bez refreshovanja stranice(real time changes)
    db.collection('books').where('user_id', '==', user.uid).onSnapshot(snapshot => {
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
  //stanje aplikacije(ovde su svi objekti koje koristi veci broj komponenata)
  state: {
    currentUser: null,
    userProfile: {},
    books: [],
    addBookModal: false,
    editBookModal: false,
    deleteBookModal: false,
    message: null
  },
  //getters metode za pristup state-u
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getUserProfile: (state) => state.userProfile,
    getBooks: (state) => state.books,
    editBookModal: (state) => state.editBookModal,
    deleteBookModal: (state) => state.deleteBookModal,
    addBookModal: (state) => state.addBookModal,
    getMessage: (state) => state.message,
  },
  //modifikovanje state objekata(samo mutacijama je dozvoljen pristup state-u)
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
  //akcije(asinhrone metode)
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