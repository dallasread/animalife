<template>
  <div class="app">
    <Level
      v-if="character"
      :level="level"
      :character="character"
      :reset="reset"
    />
    <ul v-else class="characters">
      <li v-for="c in characterClasses" :key="c.firstName">
        <a href="javascript:;" @click.prevent="chooseCharacter(c)">
          <img :src="c.constructor.image"/>
          <p>{{c.firstName}}</p>
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
      characterClasses: CHARACTERS,
      character: null
    }
  },
  methods: {
    reset () {
      this.character = null
    },

    chooseCharacter(characterClasses) {
      this.character = new characterClasses.constructor([0, 0])
    }
  }
}
</script>

<style lang="sass">
@import "style/index.scss"
</style>
