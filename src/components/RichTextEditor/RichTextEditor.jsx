import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();

    // 图片类型转换为mediaComponent
    if (type === 'atomic') {
        return {
            component: MediaComponent,
            editable: false,
            props: {
                foo: 'bar',
            },
        };
    }
}
class MediaComponent extends React.Component {
    render() {
        const { block, contentState } = this.props;
        // const { foo } = this.props.blockProps;
        const data = contentState.getEntity(block.getEntityAt(0)).getData();


        const emptyHtml = ' ';
        return (
            <div>
                {emptyHtml}
                <img
                    src={data.src}
                    alt={data.alt || ''}
                    style={{ height: data.height || 'auto', width: data.width || 'auto' }}
                />
            </div>
        );
    }
}

export default class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        const html = this.props.HTMLtext;
        //如果有值，将父组件传来的HTML标签格式的文本进行转换
        if (html !== undefined || html !== null) {
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                console.log(editorState)
                this.state = {
                    editorState: editorState,
                };
            } else {
                this.state = {
                    editorState: EditorState.createEmpty(), //创建一个空编辑对象
                }
            }

        }
    }

    myBlockRenderer = (contentBlock) => {
        const type = contentBlock.getType();

        // Convert image type to mediaComponent
        if (type === 'atomic') {
            return {
                component: MediaComponent,
                editable: false,
                props: {
                    foo: 'bar',
                },
            };
        }
    }


    //输入内容触发,传入当前文本框编辑内容,更新状态
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    //得到输入内容对应的HTML
    getHTMLfromtext = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://qckozf.fn.thelarkcloud.com/uploadImg');
                const data = new FormData();
                data.append('myFile', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    // const response = JSON.parse(xhr.responseText);
                    //console.log(xhr.responseText)
                    const imgurl = xhr.responseText //得到图片地址
                    resolve({ data: { link: imgurl } });
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }
    render() {
        const { editorState } = this.state
        return (
            <div>
                <Editor
                    blockRendererFn={myBlockRenderer}
                    editorState={editorState}
                    editorStyle={{ border: '1px solid rgba(141, 140, 124,0.2)', minHeight: '300px', padding: '15px' }}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack }
                    }}
                />
            </div>
        );
    }
}