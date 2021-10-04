import { SUCCESS, FAILURE, MOVING, RESET } from '../constant'

//同步action，就是指action的值为Object类型的一般对象
export const succeed = data => ({ type: SUCCESS, data })
export const fail = data => ({ type: FAILURE, data })
export const move = data => ({ type: MOVING, data })
export const reset = data => ({ type: RESET, data })