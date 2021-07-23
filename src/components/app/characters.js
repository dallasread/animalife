import Chihuahua from '@/assets/characters/chihuahua.svg'
import Doggie from '@/assets/characters/doggie.svg'
import Kitty from '@/assets/characters/kitty.svg'
import Turtley from '@/assets/characters/turtley.svg'

const Bones = {
  name: 'Bones',
  singular: 'Bone'
}
const Fish = {
  name: 'Fish',
  singular: 'Fish'
}
const Seaweed = {
  name: 'Seaweed',
  singular: 'Seaweed'
}

export default [{
    name: 'Chihuahua',
    image: Chihuahua,
    width: 10,
    yOffset: -1,
    collectable: Bones
  }, {
    name: 'Doggie',
    image: Doggie,
    width: 20,
    yOffset: -1,
    collectable: Bones
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
