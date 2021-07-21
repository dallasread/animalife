<template>
  <div class="app">
    <Level
      :level="level"
      :character="character"
    />
  </div>
</template>

<script>
import Level from '@/components/level/component.vue'
import Doggie from '@/assets/characters/doggie.svg'
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
      character: {
        name: 'Doggie',
        image: Doggie,
        width: 20
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import "style/reset.css"
</style>
