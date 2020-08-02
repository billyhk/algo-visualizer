export function getLevelOrderAnimations(height) {
   const animations = []
   const queue = [0]
   while (queue.length > 0) {
      let current = queue.shift();
      animations.push(current)
      if (current * 2 + 2 < Math.pow(2, height + 1) - 1) {
         queue.push(current * 2 + 1)
         queue.push(current * 2 + 2)
      }
   }
   return animations
}

export function getInOrderAnimations(height) {
   let animations = []
   inOrderRec(height, 0, animations)
   return animations
}

function inOrderRec(height, index, animations) {
   if (index < Math.pow(2, height + 1) - 1) {
      inOrderRec(height, index * 2 + 1, animations)
      animations.push(index)
      inOrderRec(height, index * 2 + 2, animations)
   }
}

export function getPostOrderAnimations(height) {
   let animations = []
   postOrderRec(height, 0, animations)
   return animations
}

function postOrderRec(height, index, animations) {
   if (index < Math.pow(2, height + 1) - 1) {
      postOrderRec(height, index * 2 + 1, animations)
      postOrderRec(height, index * 2 + 2, animations)
      animations.push(index)
   }
}

export function getPreOrderAnimations(height) {
   let animations = []
   preOrderRec(height, 0, animations)
   return animations
}

function preOrderRec(height, index, animations) {
   if (index < Math.pow(2, height + 1) - 1) {
      animations.push(index)
      preOrderRec(height, index * 2 + 1, animations)
      preOrderRec(height, index * 2 + 2, animations)
   }
}