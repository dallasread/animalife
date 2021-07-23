<template>
  <div class="level">
    <a v-if="isInitialized" href="javascript:;" @click="reset" class="reset">
      &laquo;
    </a>
    <div v-else>
      <div class="logo">
        <img src="@/assets/logo.svg">
      </div>
      <p class="name">Welcome to {{level.name}}!</p>
    </div>
    <p class="collectable-count">{{pluralize(collectableCount, this.character.collectable.singular, this.character.collectable.plural)}}</p>
    <Camera :characterPosition="characterPosition" :character="character">
      <div class="background" :style="backgroundStyle"></div>
      <div class="foreground" :style="foregroundStyle"></div>
      <Character :character="character" :style="characterStyle" />
      <div v-for="collectable in collectables" :key="collectable.id" class="collectable">
        {{collectable.name}}
      </div>
    </Camera>
    <Controller :updateX="updateX" :updateY="updateY" :actionA="actionA" :initialized="controllerInitialized" />
  </div>
</template>

<script>
import Controller from '@/components/controller/component.vue'
import Character from '@/components/character/component.vue'
import Camera from '@/components/camera/component.vue'

const PIXEL_SIZE = 14

export default {
  props: ['character', 'level', 'reset'],
  components: {
    Camera,
    Character,
    Controller
  },
  data () {
    return {
      characterPosition: {
        x: 2,
        y: 0
      },
      reverseCharacter: false,
      isInitialized: false,
      collectableCount: 0,
      collectables: []
    }
  },
  mounted() {
    this.addCollectables()
  },
  computed: {
    characterStyle() {
      let style = `width: ${this.character.width * PIXEL_SIZE}px;`

      style += `margin-left: ${this.characterPosition.x * PIXEL_SIZE}px;`
      // style += `margin-left: calc(50% + ${this.characterPosition.x * (this.character.speed * PIXEL_SIZE)}px;`
      style += `margin-bottom: ${PIXEL_SIZE * (this.character.yOffset + this.characterPosition.y)}px;`

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
      style += `background-position: top;`

      return style;
    }
  },
  methods: {
    updateX(deltaX) {
      const newCharacterPosition = this.characterPosition.x += deltaX * this.character.speed
      const collision = this.collide(newCharacterPosition)
      console.log(collision)

      this.reverseCharacter = deltaX < 0

      if (collision === false) return

      this.characterPosition.x += newCharacterPosition

      if (typeof collision === 'function') {
        collision()
      }
    },

    updateY() {
      // const newPosition = this.characterPosition.y + deltaY

      // if (newPosition <= 0) {
      //   this.characterPosition.y = newPosition
      // }
    },

    actionA() {
      this.characterPosition.y += 2
      setTimeout(() => this.characterPosition.y += 2, 30)
      setTimeout(() => this.characterPosition.y += 2, 60)
      setTimeout(() => this.characterPosition.y -= 2, 150)
      setTimeout(() => this.characterPosition.y -= 2, 180)
      setTimeout(() => this.characterPosition.y -= 2, 210)
      this.collectableCount += 1
    },

    controllerInitialized() {
      this.isInitialized = true
    },

    pluralize (count, singular, plural) {
      return `${count} ${count === 1 ? singular : plural}`
    },

    addCollectables () {
      this.level.collectables.forEach((coordinates) => {
        this.collectables.push(
          new this.character.collectable(coordinates)
        )
      })
    },

    collide() {
      return false
    }
  }
}
</script>

<style lang="scss">
@import "style.scss"
</style>
