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
    <Camera :character="character">
      <div class="background" :style="backgroundStyle"></div>
      <div class="foreground" :style="foregroundStyle"></div>
      <Item :item="character" />
      <Item v-for="item in items" :key="item.id" :item="item" />
    </Camera>
    <Controller :updateX="updateX" :updateY="updateY" :actionA="actionA" :initialized="controllerInitialized" />
  </div>
</template>

<script>
import Controller from '@/components/controller/component.vue'
import Item from '@/components/item/component.vue'
import Camera from '@/components/camera/component.vue'

const PIXEL_SIZE = 10

export default {
  props: ['character', 'level', 'reset'],
  components: {
    Camera,
    Controller,
    Item
  },
  data () {
    return {
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
      const newCharacterCoordinates = this.character.calculateMove(deltaX)
      const collision = this.collide(newCharacterCoordinates)

      if (collision === false) return

      this.character.move(deltaX)

      if (typeof collision === 'function') {
        collision()
      }
    },

    updateY() {
      // const newPosition = this.character.position[1] + deltaY

      // if (newPosition <= 0) {
      //   this.character.position[1] = newPosition
      // }
    },

    actionA() {
      this.character.setCoordinates(undefined, this.character.coordinates[1] + 3)

      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] + 3), 30)
      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] + 3), 60)
      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] - 3), 150)
      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] - 3), 180)
      setTimeout(() => this.character.setCoordinates(undefined, this.character.coordinates[1] - 3), 210)
    },

    collect(collectable) {
      this.collectableCount += 1
      collectable.hide = true
    },

    boost(booster) {
      this.character.addBooster(booster)
    },

    takeDamage(villain) {
      if (this.character.takeDamage(villain) === 0) {
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
      this.character.setCoordinates(5, 0)

      this.level.items.forEach((item) => {
        this.items.push(
          new this.character[item.type](item.coordinates)
        )
      })
    },

    collide(coordinates) {
      const item = this.findBoundary(this.items, coordinates)

      if (item) {
        return this[item.constructor.ACTION](item)
      }
    },

    findBoundary(collection, coordinates) {
      const characterStart = coordinates[0] - (this.character.constructor.width / 2)
      const characterFinish = coordinates[0] + (this.character.constructor.width / 2)

      return collection.filter((item) => !item.hide).find((item) => {
        const itemX = item.coordinates[0]
        const itemY = item.coordinates[1]
        return itemX > characterStart + (this.character.constructor.width / 2)
          && itemX <= characterFinish + (this.character.constructor.width / 2)
          && itemY === coordinates[1]
      })
    }
  }
}
</script>

<style lang="scss">
@import "style.scss"
</style>
