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
    <ul class="hearts">
      <li v-for="index in character.hearts" :key="'heart-' + index">
        <img src="@/assets/interface/heart.svg">
      </li>
    </ul>
    <p class="collectable-count">{{pluralize(collectableCount, character.collectable.singular, character.collectable.plural)}}</p>
    <Camera :characterPosition="characterPosition" :character="character">
      <div class="background" :style="backgroundStyle"></div>
      <div class="foreground" :style="foregroundStyle"></div>
      <Character :character="character" :style="characterStyle" />
      <Item v-for="item in items" :key="item.id" :item="item" />
    </Camera>
    <Controller :updateX="updateX" :updateY="updateY" :actionA="actionA" :initialized="controllerInitialized" />
  </div>
</template>

<script>
import Controller from '@/components/controller/component.vue'
import Character from '@/components/character/component.vue'
import Item from '@/components/item/component.vue'
import Camera from '@/components/camera/component.vue'

const PIXEL_SIZE = 10

export default {
  props: ['character', 'level', 'reset'],
  components: {
    Camera,
    Character,
    Controller,
    Item
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
      items: []
    }
  },
  mounted() {
    this.addItems()
  },
  computed: {
    characterStyle() {
      let style = `width: ${this.character.width * PIXEL_SIZE}px;`

      style += `margin-left: ${this.characterPosition.x * PIXEL_SIZE}px;`
      style += `margin-bottom: ${PIXEL_SIZE * (this.character.yOffset + this.characterPosition.y)}px;`

      if (this.reverseCharacter) {
        style += 'transform: scaleX(-1);'
      }

      if (this.character.takingDamage) {
        style += 'opacity: 0.4'
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

    takeDamage() {
      if (this.character.takeDamage() === 0) {
        alert('Game Over')
        this.reset()
      }
    },

    controllerInitialized() {
      this.isInitialized = true
    },

    pluralize (count, singular, plural) {
      return `${count} ${count === 1 ? singular : plural}`
    },

    addItems () {
      this.level.items.forEach((item) => {
        this.items.push(
          new this.character[item.type](item.coordinates)
        )
      })
    },

    collide(newCharacterPosition) {
      const item = this.findBoundary(this.items, newCharacterPosition)

      if (item) {
        return this[item.constructor.ACTION](item)
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
