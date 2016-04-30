import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

let notesRef = new Firebase('https://crackling-inferno-296.firebaseio.com/notes')

notesRef.on('value', snapshot => {
  state.notes = snapshot.val()
})

const state = {
  notes: {},
  activeNote: {},
  activeKey: ''
}

const mutations = {
  ADD_NOTE (state) {
    const newNote = {
      text: 'New note',
      favorite: false
    }
    var addRef = notesRef.push()
    state.activeKey = addRef.key()
    addRef.set(newNote)
    state.activeNote = newNote
  },

  EDIT_NOTE (state, text) {
    notesRef.child(state.activeKey).update({
      'text': text
    })
  },

  DELETE_NOTE (state) {
    // notesRef.(state.activeNote)
    notesRef.child(state.activeKey).set(null)
    // state.activeNote = state.notes[0]
  },

  TOGGLE_FAVORITE (state) {
    state.activeNote.favorite = !state.activeNote.favorite
    notesRef.child(state.activeKey).update({
      'favorite': state.activeNote.favorite
    })
    // state.activeNote.favorite = !state.activeNote.favorite
  },

  SET_ACTIVE_NOTE (state, key, note) {
    state.activeNote = note
    state.activeKey = key
  }
}

export default new Vuex.Store({
  state,
  mutations
})
