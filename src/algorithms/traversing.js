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