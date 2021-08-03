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
import Level from '@/components/level/component.vue'
import Grass from '@/assets/levels/gardens/grass.svg'
import Sky from '@/assets/levels/gardens/sky.svg'

export default {
  components: {
    Level
  },
  data () {
    return {
      level: {
        name: 'Gardens',
        foreground: {
          image: Grass,
          width: 5
        },
        collectables: [
          [-25, 0],
          [25, 0],
          [75, 0],
          [111, 0],
          [160, 0],
          [200, 0],
          [260, 0],
          [300, 0],
          [340, 0],
        ],
        boosters: [
          [50, 0],
          [350, 0],
        ],
        villains: [{
          type: 'Snail',
          coordinates: [96, 0]
        }],
        background: {
          image: Sky,
          width: 1
        }
      },
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
