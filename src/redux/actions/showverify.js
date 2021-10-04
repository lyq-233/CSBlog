import { SHOW, OFFSHOW } from '../constant'

//同步action，就是指action的值为Object类型的一般对象
export const show = data => ({ type: SHOW, data })
export const offshow = data => ({ type: OFFSHOW, data })
