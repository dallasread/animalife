<template>
  <div class="level">
    <div v-if="!isInitialized">
      <div class="logo">
        <img src="@/assets/logo.svg">
      </div>
      <p class="name">Welcome to {{level.name}}!</p>
    </div>
    <div class="background" :style="backgroundStyle"></div>
    <div class="foreground" :style="foregroundStyle"></div>
    <Character :character="character" :style="characterStyle" />
    <Controller :updateX="updateX" :updateY="updateY" :actionA="actionA" :initialized="controllerInitialized" />
  </div>
</template>

<script>
import Controller from '@/components/controller/component.vue'
import Character from '@/components/character/component.vue'

const PIXEL_SIZE = 14

export default {
  props: ['character', 'level'],
  components: {
    Controller,
    Character
  },
  data () {
    return {
      position: {
        x: 2,
        y: 0
      },
      reverseCharacter: false,
      isInitialized: false
    }
  },
  computed: {
    characterStyle() {
      let style = `width: ${this.character.width * PIXEL_SIZE}px;`

      // style += `margin-left: ${this.position.x * (3 * PIXEL_SIZE)}px;`
      style += `margin-left: calc(50% - ${((this.character.width * PIXEL_SIZE) / 2) + (5 * PIXEL_SIZE)}px);`
      style += `bottom: calc(50% - ${PIXEL_SIZE * (7 - this.character.yOffset)}px);`

      if (this.reverseCharacter) {
        style += 'transform: scaleX(-1);'
      }

      return style;
    },

    backgroundStyle () {
      let style = `background-image: url(${this.level.background.image});`

      style += `background-size: ${this.level.background.width * PIXEL_SIZE}px;`
      style += `background-position: bottom;`

      return style;
    },

    foregroundStyle() {
      let style = `background-image: url(${this.level.foreground.image});`

      style += `background-size: ${this.level.foreground.width * PIXEL_SIZE}px;`
      style += `background-position: ${this.position.x * (3 * PIXEL_SIZE)}px top;`

      return style;
    }
  },
  methods: {
    updateX(deltaX) {
      this.position.x += deltaX
      this.reverseCharacter = deltaX < 0
    },

    updateY() {
      // const newPosition = this.position.y + deltaY

      // if (newPosition <= 0) {
      //   this.position.y = newPosition
      // }
    },

    actionA() {
      this.position.y = 2
      setTimeout(() => this.position.y = 4, 50)
      setTimeout(() => this.position.y = 2, 100)
      setTimeout(() => this.position.y = 0, 150)
    },

    controllerInitialized() {
      this.isInitialized = true
    }
  }
}
</script>

<style lang="scss">
@import "style.scss"
</style>
