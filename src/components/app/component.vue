<template>
  <div class="app">
    <Level
      v-if="character"
      :level="level"
      :character="character"
      :reset="reset"
    />
    <ul v-else class="characters">
      <li v-for="c in characters" :key="c.name">
        <a href="javascript:;" @click.prevent="character = c">
          <img :src="c.image"/>
          <p>{{c.name}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import CHARACTERS from '@/components/app/characters.js'
import GARDENS from '@/components/level/gardens.js'
import Level from '@/components/level/component.vue'

export default {
  components: {
    Level
  },
  data () {
    return {
      level: GARDENS,
      characters: CHARACTERS,
      character: null
    }
  },
  methods: {
    reset () {
      this.character = null
    }
  }
}
</script>

<style lang="sass">
@import "style/index.scss"
</style>
