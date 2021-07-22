<template>
  <div class="app">
    <select>

    </select>
    <Level
      :level="level"
      :character="character"
    />
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
        background: {
          image: Sky,
          width: 1
        }
      },
      characters: CHARACTERS,
      character: CHARACTERS[3]
    }
  }
}
</script>

<style lang="sass">
@import "style/index.scss"
</style>
