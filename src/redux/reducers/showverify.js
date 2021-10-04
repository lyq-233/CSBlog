import { SHOW, OFFSHOW } from '../constant'

//初始化人的列表
const initState = 'hidden'

export default function showReducer(preState = initState, action) {
    const { type } = action
    switch (type) {
        case SHOW:
            return 'visible'
        case OFFSHOW:
            return 'hidden'
        default:
            return preState
    }
}
