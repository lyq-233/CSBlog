import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PictureWall extends Component {
    constructor(props) {
        super(props)
        //拿到父组件传来的要编辑文章的标题图片的url
        const { initialImg } = this.props
        let fileList = []
        if (initialImg !== undefined && initialImg !== "null") {
            fileList = [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: initialImg,
            }]
        }
        this.state = {
            previewVisible: false, //是否显示大图
            previewImage: '',  //预览图片的url
            //所有已上传文件的对象数组
            fileList
            // : [
            // titleImg === '' ? null : initialImg
            // {
            // uid: '-1',          //每个file的唯一id，若自己指定，最好为负数
            // name: 'image.png',  //图片文件名
            // status: 'done', //图片状态:done  uploading removed
            // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //图片地址
            // }
            //   ],
        }
    }
    // 拿到图片url传给表单
    getImgUrl = () => {
        return this.state.fileList.map((fileObj) => {
            return fileObj.url
        })
    }

    //取消预览
    handleCancel = () => this.setState({ previewVisible: false });

    //点击预览触发的回调
    handlePreview = async file => {
        //上传失败的时候,file没有url
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview, // 图片拿到url的时候预览图就用此url，否则显示base64编码格式的图片
            previewVisible: true,
        });
    };

    /* file是当前操作的文件对象（上传/删除）*/
    handleChange = ({ file, fileList }) => {
        //上传结束
        if (file.status === 'done') {
            const result = file.response  //response里是服务器的返回结果
            if (result) {
                console.log(result)
                message.success('上传图片成功', 1)
                const url = result  //拿到图片url
                fileList[fileList.length - 1].url = url
            } else {
                message.error('上传图片失败', 1)
            }
        }
        //在上传/删除过程中更新fileList状态，否则看不到图片是否上传成功
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>选择图片上传</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="https://qckozf.fn.thelarkcloud.com/uploadImg" //上传图片的接口地址
                    headers={{ ContentType: 'multipart/form-data' }}
                    accept='image/*' //只接受图片格式的文件
                    name='myFile' //请求参数名，参数值就是文件数据
                    listType="picture-card" //卡片格式的照片墙
                    fileList={fileList} //已经上传的文件对象数组
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= this.props.maxpic ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

