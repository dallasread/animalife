<template>
  <div class="level">
    <a v-if="isInitialized" href="javascript:;" @click="reset" class="reset">
      &laquo;
    </a>
    <div v-else>
      <div class="logo" @click="controllerInitialized">
        <img src="@/assets/logo.svg">
      </div>
      <p class="name">Welcome to {{level.name}}!</p>
    </div>
    <p class="collectable-count">{{pluralize(collectableCount, this.character.collectable.singular, this.character.collectable.plural)}}</p>
    <Camera :characterPosition="characterPosition" :character="character">
      <div class="background" :style="backgroundStyle"></div>
      <div class="foreground" :style="foregroundStyle"></div>
      <Character :character="character" :style="characterStyle" />
      <Collectable v-for="collectable in collectables" :key="collectable.id" :collectable="collectable" />
      <Collectable v-for="booster in boosters" :key="booster.id" :collectable="booster" />
      <Collectable v-for="villain in villains" :key="villain.id" :collectable="villain" />
    </Camera>
    <Controller :updateX="updateX" :updateY="updateY" :actionA="actionA" :initialized="controllerInitialized" />
  </div>
</template>

<script>
import Controller from '@/components/controller/component.vue'
import Character from '@/components/character/component.vue'
import Collectable from '@/components/collectable/component.vue'
import Camera from '@/components/camera/component.vue'
import VILLAINS from '@/components/app/villains.js'

const PIXEL_SIZE = 10

export default {
  props: ['character', 'level', 'reset'],
  components: {
    Camera,
    Character,
    Controller,
    Collectable
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
      collectables: [],
      boosters: [],
      villains: []
    }
  },
  mounted() {
    this.addCollectables()
    this.addBoosters()
    this.addVillains()
  },
  computed: {
    characterStyle() {
      let style = `width: ${this.character.width * PIXEL_SIZE}px;`

      style += `margin-left: ${this.characterPosition.x * PIXEL_SIZE}px;`
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
      const newCharacterPosition = this.characterPosition.x + (deltaX * this.character.speed)
      const collision = this.collide({ x: newCharacterPosition, y: this.characterPosition.y })

      this.reverseCharacter = deltaX < 0

      if (collision === false) return

      this.characterPosition.x = newCharacterPosition

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
      this.characterPosition.y += 3
      setTimeout(() => this.characterPosition.y += 3, 30)
      setTimeout(() => this.characterPosition.y += 3, 60)
      setTimeout(() => this.characterPosition.y -= 3, 150)
      setTimeout(() => this.characterPosition.y -= 3, 180)
      setTimeout(() => this.characterPosition.y -= 3, 210)
    },

    collect(collectable) {
      this.collectableCount += 1
      collectable.hide = true
    },

    boost(booster) {
      booster.hide = true

      this.character.changeSpeed(+1)

      setTimeout(() => {
        this.character.changeSpeed(-1)
      }, 5000)
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

    addBoosters () {
      this.level.boosters.forEach((coordinates) => {
        this.boosters.push(
          new this.character.booster(coordinates)
        )
      })
    },

    addVillains () {
      this.level.villains.forEach((villain) => {
        this.villains.push(
          new VILLAINS[villain.type](villain.coordinates)
        )
      })
    },

    collide(newCharacterPosition) {
      const collectable = this.findBoundary(this.collectables, newCharacterPosition)

      if (collectable) {
        return this.collect(collectable)
      }

      const booster = this.findBoundary(this.boosters, newCharacterPosition)

      if (booster) {
        return this.boost(booster)
      }
    },

    findBoundary(collection, position) {
      const characterStart = position.x - (this.character.width / 2)
      const characterFinish = position.x + (this.character.width / 2)

      return collection.filter((item) => !item.hide).find((item) => {
        const itemX = item.coordinates[0]
        const itemY = item.coordinates[1]
        return itemX > characterStart + (this.character.width / 2)
          && itemX <= characterFinish + (this.character.width / 2)
          && itemY === position.y
      })
    }
  }
}
</script>

<style lang="scss">
@import "style.scss"
</style>
