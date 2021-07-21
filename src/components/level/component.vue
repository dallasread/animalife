<template>
  <div class="level">
    <div class="background" :style="backgroundStyle"></div>
    <div class="foreground" :style="foregroundStyle"></div>
    <p>You are in "{{level.name}}".</p>
    <p class="position">{{position}}</p>
    <Character :character="character" :style="characterStyle" />
    <Controller :updateX="updateX" :updateY="updateY" :actionA="actionA" />
  </div>
</template>

<script>
import Controller from '@/components/controller/component.vue'
import Character from '@/components/character/component.vue'

const PIXEL_SIZE = 15

export default {
  props: ['character', 'level'],
  components: {
    Controller,
    Character
  },
  data () {
    return {
      position: {
        x: 0,
        y: 0
      },
      reverseCharacter: false
    }
  },
  computed: {
    characterStyle() {
      let style = `width: ${this.character.width * PIXEL_SIZE}px;`

      style += `margin-left: ${this.position.x * (3 * PIXEL_SIZE)}px;`
      style += `margin-bottom: ${this.position.y * (2 * PIXEL_SIZE)}px;`

      if (this.reverseCharacter) {
        style += 'transform: scaleX(-1);'
      }

      return style;
    },

    backgroundStyle () {
      let style = `background-image: url(${this.level.background.image});`

      style += `background-size: ${this.level.background.width * PIXEL_SIZE}px;`

      return style;
    },

    foregroundStyle() {
      let style = `background-image: url(${this.level.foreground.image});`

      style += `background-size: ${this.level.foreground.width * PIXEL_SIZE}px;`

      return style;
    }
  },
  methods: {
    updateX(deltaX) {
      this.position.x += deltaX
      this.reverseCharacter = deltaX < 0
    },

    updateY(deltaY) {
      const newPosition = this.position.y + deltaY

      if (newPosition <= 0) {
        this.position.y = newPosition
      }
    },

    actionA() {
      console.log('jump!')
    }
  }
}
</script>

<style lang="scss">
@import "style.scss"
</style>
