import React, {useCallback} from 'react'
import Grid from '../../components/Grid/Grid'
import {useSelector, useDispatch} from 'react-redux'
import {getBFSAnimations} from '../../algorithms/pathFinding'
import * as actions from '../../store/actions'

const PathFinder = (props) => {
   const start = useSelector(state => state.path.start)
   const target = useSelector(state => state.path.target)
   const walls = useSelector(state => state.path.walls)

   const dispatch = useDispatch()
   const playPathFindingAnimation = animations => dispatch(actions.playPathFindingAnimation(animations))
   const clearWalls = () => dispatch(actions.clearAll())

   return (
      <div>
         <Grid width={25} height={20} />
         <button onClick={() => playPathFindingAnimation(getBFSAnimations(start, target, walls, 25, 20))}>find</button>
         <button onClick={clearWalls}>clear walls</button>
      </div>
   )
}

export default PathFinder