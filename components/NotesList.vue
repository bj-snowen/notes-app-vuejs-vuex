<template>
  <div id="notes-list">

    <div id="list-header">
      <h2>Notes | coligo</h2>
      <div class="btn-group btn-group-justified" role="group">
        <!-- All Notes button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="show = 'all'"
            :class="{active: show === 'all'}">
            All Notes
          </button>
        </div>
        <!-- Favorites Button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="show = 'favorites'"
            :class="{active: show === 'favorites'}">
            Favorites
          </button>
        </div>
      </div>
    </div>

    <!-- filter -->
    <div class="input">
      <input v-model="query" placeholder="Filter your notes...">
    </div>
    
    <!-- render notes in a list -->
    <div class="container">
      <div class="list-group">
        <a v-for="note in filteredNotes | byTitle query"
          class="list-group-item" href="#"
          :class="{active: activeKey === $key}"
          @click="updateActiveNote($key, note)">
          <h4 class="list-group-item-heading">
            {{note.text.substring(0, 30)}}
          </h4>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { updateActiveNote } from '../vuex/actions'

export default {
  data () {
    return {
      show: 'all',
      query: ''
    }
  },
  vuex: {
    getters: {
      notes: state => state.notes,
      activeNote: state => state.activeNote,
      activeKey: state => state.activeKey
    },
    actions: {
      updateActiveNote
    }
  },
  computed: {
    filteredNotes () {
      var favoriteNotes = {}
      if (this.show === 'all') {
        return this.notes
      } else if (this.show === 'favorites') {
        for (var note in this.notes) {
          if (this.notes[note]['favorite']) {
            favoriteNotes[note] = this.notes[note]
          }
        }
        return favoriteNotes
      }
    }
  },
  filters: {
    byTitle (notesToFilter, filterValue) {
      var filteredNotes = {}
      for (let note in notesToFilter) {
        if (notesToFilter[note]['text'].indexOf(filterValue) > -1) {
          filteredNotes[note] = notesToFilter[note]
        }
      }
      return filteredNotes
    }
  }
}
</script>
