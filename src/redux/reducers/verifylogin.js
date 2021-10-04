import { SUCCESS, FAILURE, MOVING, RESET } from '../constant'

//初始化人的列表
const initState = { text: '拖动滑块进行验证', top: '20px', left: '20px', color: 'black' }

export default function verifyReducer(preState = initState, action) {
	const { type, data } = action
	switch (type) {
		case FAILURE:
			return { text: '验证失败，请重试', top: data.top, left: data.left, color: 'red' }
		case SUCCESS:
			return { text: '验证成功~', top: preState.top, left: preState.left, color: 'green' }
		case MOVING:
			return { text: '将滑块拖至空缺处', top: data.top, left: data.left, color: 'black' }
		case RESET:
			return { text: '拖动滑块进行验证', top: '20px', left: '20px', color: 'black' }
		default:
			return preState
	}
}
