import Chihuahua from '@/assets/characters/chihuahua.svg'
import Doggie from '@/assets/characters/doggie.svg'
import Kitty from '@/assets/characters/kitty.svg'
import Turtley from '@/assets/characters/turtley.svg'

class Collectable {
  constructor(coordinates) {
    this.id = Math.random()
    this.coordinates = coordinates
  }
}

class Bone extends Collectable {}
Bone.plural = 'Bones'
Bone.singular = 'Bone'

class Fish extends Collectable {}
Fish.plural = 'Fish'
Fish.singular = 'Fish'

class Seaweed extends Collectable {}
Seaweed.plural = 'Seaweed'
Seaweed.singular = 'Seaweed'

export default [{
    name: 'Chihui',
    image: Chihuahua,
    width: 10,
    yOffset: -1,
    collectable: Bone
  }, {
    name: 'Doggie',
    image: Doggie,
    width: 20,
    yOffset: -1,
    collectable: Bone
  }, {
    name: 'Kitty',
    image: Kitty,
    width: 17,
    yOffset: -1,
    collectable: Fish
  }, {
    name: 'Turtley',
    image: Turtley,
    width: 6,
    yOffset: 0,
    collectable: Seaweed
}]
