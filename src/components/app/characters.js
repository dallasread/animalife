import Chihuahua from '@/assets/characters/chihuahua.svg'
import Doggie from '@/assets/characters/doggie.svg'
import Kitty from '@/assets/characters/kitty.svg'
import Turtley from '@/assets/characters/turtley.svg'
import BoneImage from '@/assets/collectables/bone.svg'

class Collectable {
  constructor(coordinates) {
    this.id = Math.random()
    this.coordinates = coordinates
    console.log(this)
  }
}

class Bone extends Collectable {}
Bone.plural = 'Bones'
Bone.singular = 'Bone'
Bone.image = BoneImage
Bone.width = 5

class Fish extends Collectable {}
Fish.plural = 'Fish'
Fish.singular = 'Fish'
Fish.image = BoneImage
Fish.width = 5

class Seaweed extends Collectable {}
Seaweed.plural = 'Seaweed'
Seaweed.singular = 'Seaweed'
Seaweed.image = BoneImage
Seaweed.width = 5

export default [{
    name: 'Chihui',
    image: Chihuahua,
    width: 10,
    yOffset: -1,
    collectable: Bone,
    speed: 3
  }, {
    name: 'Doggie',
    image: Doggie,
    width: 20,
    yOffset: -1,
    collectable: Bone,
    speed: 2
  }, {
    name: 'Kitty',
    image: Kitty,
    width: 17,
    yOffset: -1,
    collectable: Fish,
    speed: 2
  }, {
    name: 'Turtley',
    image: Turtley,
    width: 6,
    yOffset: 0,
    collectable: Seaweed,
    speed: 1
}]
