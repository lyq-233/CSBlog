import React, { Component } from 'react'
import store from '../../../../utils/storageUtils'
import PictureWall from '../../../../components/PictureWall/PictureWall.jsx'
import { Modal, message, Card } from 'antd';
import PubSub from 'pubsub-js'
import EditNickForm from '../../../../components/EditNickForm/EditNickForm.jsx'
import EditPWDForm from '../../../../components/EditPWDForm/EditPWDForm.jsx'
import EditGenderForm from '../../../../components/EditGenderForm/EditGenderForm.jsx'
import EditEmailForm from '../../../../components/EditEmailForm/EditEmailForm.jsx'
import EditIntroForm from '../../../../components/EditIntroForm/EditIntroForm.jsx'

import { changeNick, changePWD, changeGender, changeEmail, changeAvatar, changeIntro, getUserinfo } from '../../../../api/index.js'

import './InfoChange.css'

export default class InfoChange extends Component {

    state = {
        user: store.getUser(),
        modal_code: '1'
    }
    avatarRef = React.createRef()

    showNick = () => {
        this.setState({ modal_code: '5' })
    }
    editNick = async () => {
        const { _id } = this.state.user
        const { username } = this.editnickform.current.getFieldsValue()
        const hide = message.loading('正在修改昵称，请稍等', 0);
        const result = await changeNick(_id, username)
        hide()
        //console.log(result)
        if (result.err_code === 0) {
            message.success('昵称修改成功', 1)
            let user2 = { ...this.state.user }
            for (var key in user2) {
                if (key === 'username') {
                    user2[key] = username
                }
            }
            // console.log(user2)
            store.saveUser(user2)
            PubSub.publish('userinfo', ' ');
            //console.log(user2)
            this.setState({ user: user2 })
        } else {
            message.error('发生错误啦', 1)
        }
    }
    showPWD = () => {
        this.setState({ modal_code: '2' })
    }
    editPWD = async () => {
        const { _id } = this.state.user
        //拿到表单组件传过来的表单实例，从而可以使用getFieldsValue()方法获取表单内容
        const { password } = this.editpwdform.current.getFieldsValue()
        //发送网络请求更新密码
        const hide = message.loading('正在修改密码，请稍等', 0);
        const result = await changePWD(_id, password)
        hide()
        // console.log(result)
        if (result.err_code === 0) {
            message.success('密码修改成功', 1)
            let user2 = { ...this.state.user }
            for (var key in user2) {
                if (key === 'password') {
                    user2[key] = password
                }
            }
            store.saveUser(user2)
            //console.log(user2)
            this.setState({ user: user2 })
        } else {
            message.error('密码修改失败', 1)
        }
    }

    showGender = () => {
        this.setState({ modal_code: '3' })
    }
    editGender = async () => {
        const { _id } = this.state.user
        const { gender } = this.editgenderform.current.getFieldsValue()
        //console.log(gender)
        const hide = message.loading('正在修改性别，请稍等', 0);
        const result = await changeGender(_id, gender)
        hide()
        //console.log(result)
        if (result.err_code === 0) {
            message.success('性别修改成功', 1)
            let user2 = { ...this.state.user }
            for (var key in user2) {
                if (key === 'gender') {
                    user2[key] = gender
                }
            }
            // console.log(user2)
            store.saveUser(user2)
            this.setState({ user: user2 })
        } else {
            message.error('性别修改失败', 1)
        }
    }
    showEmail = () => {
        this.setState({ modal_code: '4' })
    }
    editEmail = async () => {
        const { _id } = this.state.user
        const { email } = this.editemailform.current.getFieldsValue()
        // console.log(email)
        const hide = message.loading('正在修改邮箱，请稍等', 0);
        const result = await changeEmail(_id, email)
        hide()
        // console.log(result)
        if (result.err_code === 0) {
            message.success('邮箱修改成功', 1)
            let user2 = { ...this.state.user }
            for (var key in user2) {
                if (key === 'email') {
                    user2[key] = email
                }
            }
            store.saveUser(user2)
            // console.log(user2)
            this.setState({ user: user2 })
        } else {
            message.error('邮箱修改失败', 1)
        }
    }
    showIntro = () => {
        this.setState({ modal_code: '6' })
    }
    editIntro = async () => {
        const { _id } = this.state.user
        const { intro } = this.editintroform.current.getFieldsValue()
        //console.log(intro)
        const hide = message.loading('正在修改个人简介，请稍等', 0);
        const result = await changeIntro(_id, intro)
        hide()
        //console.log(result)
        if (result.err_code === 0) {
            message.success('简介修改成功', 1)
            let user2 = { ...this.state.user }
            for (var key in user2) {
                if (key === 'intro') {
                    user2[key] = intro
                }
            }
            store.saveUser(user2)
            // console.log(user2)
            this.setState({ user: user2 })
        } else {
            message.error('简介修改失败', 1)
        }
    }
    editAvatar = async () => {
        const { _id } = this.state.user
        const avatars = this.avatarRef.current.getImgUrl()
        const avatarUrl = avatars[0]
        // console.log(avatarUrl)
        const hide = message.loading('正在修改头像，请稍等', 0);
        const result = await changeAvatar(_id, avatarUrl)
        hide()
        // console.log(result)
        if (result.err_code === 0) {
            message.success('头像修改成功', 1)
            let user2 = { ...this.state.user }
            for (var key in user2) {
                if (key === 'avatar') {
                    user2[key] = avatarUrl
                }
            }
            store.saveUser(user2)
            PubSub.publish('userinfo', ' ');
            // console.log(user2)
            this.setState({ user: user2 })
        } else {
            message.error('头像修改失败', 1)
        }
    }

    handleCancel = () => {
        this.setState({ modal_code: '1' })
    }
    getuserinfo = async () => {
        const result = await getUserinfo(store.getUser()._id)
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({ user: result.result })
            store.saveUser(result.result)
            //console.log(store.getUser())
        }
    }
    componentDidMount() {
        this.getuserinfo()
    }
    render() {
        const { user } = this.state
        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title="我的资料" className="card" >

                <div className="info-jianjie">
                    <div style={{ marginTop: '20px', marginLeft: '20px' }}>账号信息</div>
                    <div style={{ marginTop: '390px', marginLeft: '20px' }}>头像设置</div>
                </div>
                <div className="info-userinfo">
                    <div className="info-region">
                        <div className="info-main"><span style={{ display: 'inline-block', width: '60px' }}>账号</span><span className="info-text">{user.nickname}</span></div>
                    </div>

                    <div className="info-region">
                        <div className="info-main"><span style={{ display: 'inline-block', width: '60px' }}>昵称</span><span className="info-text">{user.username}</span></div>
                        <div className="info-bianji" onClick={this.showNick}>修改</div>
                    </div>
                    <div className="info-region">
                        <div className="info-main"><span style={{ display: 'inline-block', width: '60px' }}>个人简介</span><span className="info-text">{user.intro}</span></div>
                        <div className="info-bianji" onClick={this.showIntro}>修改</div>
                    </div>
                    <div className="info-region">
                        <div className="info-main"><span style={{ display: 'inline-block', width: '60px' }}>密码</span><span className="info-text">{user.password}</span></div>
                        <div className="info-bianji" onClick={this.showPWD}>修改</div>
                    </div>
                    <div className="info-region">
                        <div className="info-main"><span style={{ display: 'inline-block', width: '60px ' }}>性别</span><span className="info-text">{user.gender === 0 ? '男' : '女'}</span></div>
                        <div className="info-bianji" onClick={this.showGender}>修改</div>
                    </div>
                    <div className="info-region">
                        <div className="info-main"><span style={{ display: 'inline-block', width: '60px' }}>邮箱</span><span className="info-text">{user.email}</span></div>
                        <div className="info-bianji" onClick={this.showEmail}>修改</div>
                    </div>
                    <div className="avatar-region">
                        <PictureWall maxpic={1} ref={this.avatarRef} initialImg={store.getUser().avatar} />
                        <div className="avatar-shangchuan" onClick={this.editAvatar}>上传</div>
                    </div>
                </div>

                <Modal title="更改密码" visible={this.state.modal_code === '2'} onOk={this.editPWD} onCancel={this.handleCancel} >
                    <EditPWDForm getEditPWDForm={(form) => { this.editpwdform = form }} />
                </Modal >
                <Modal title="编辑性别" visible={this.state.modal_code === '3'} onOk={this.editGender} onCancel={this.handleCancel}>
                    <EditGenderForm getEditGenderForm={(form) => { this.editgenderform = form }} />
                </Modal>
                <Modal title="更改邮箱" visible={this.state.modal_code === '4'} onOk={this.editEmail} onCancel={this.handleCancel}>
                    <EditEmailForm getEditEmailForm={(form) => { this.editemailform = form }} />
                </Modal>
                <Modal title="更改用户名" visible={this.state.modal_code === '5'} onOk={this.editNick} onCancel={this.handleCancel} >
                    <EditNickForm getEditNickForm={(form) => { this.editnickform = form }} />
                </Modal >
                <Modal title="编辑个人简介" visible={this.state.modal_code === '6'} onOk={this.editIntro} onCancel={this.handleCancel} >
                    <EditIntroForm getEditIntroForm={(form) => { this.editintroform = form }} />
                </Modal >

            </Card>
        )

    }
}
