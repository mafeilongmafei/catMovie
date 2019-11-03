import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Notice from './notice'
import "./icons.js";
class Notification extends Component {
    constructor() {
        super()
        this.transitionTime = 300
        this.state = { notices: [] }
        this.removeNotice = this.removeNotice.bind(this)
    }
    //法为这个 notice 添加唯一的key值，再将其添加到 notices 中
    getNoticeKey() {
        const { notices } = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }
    //即是添加也是重新渲染
    //没有传进notices啥也没有
    addNotice(notice) {
        const { notices } = this.state
        notice.key = this.getNoticeKey()
        if (notices.every(item => item.key !== notice.key)) {
            // 如果每次添加时,最后一个notice的type时loading
            if (notice.length > 0 && notices[notice.length - 1].type === 'loading') {
                notices.push(notice)
                //根据传进来的时间.,延时执行这个函数
                setTimeout(() => { this.setState({ notices }) }, this.transitionTime)
            } else {
                notices.push(notice)
                this.setState({ notices })
            }
            //根据传进来的时间.,延时执行这个函数
            if (notice.duration > 0) {
                setTimeout(() => {
                    this.removeNotice(notice.key)
                }, notice.duration)
            }
        }
        //这里规定若 duration 的值小于等于0则消息不会自动关闭， 需要手动关闭
        //最后返回一个干掉这个方法的   方法
        //所以loading和  notice.duration等于0和小于0时 , 消息不会自动关闭， 需要手动关闭
        return () => { this.removeNotice(notice.key) }
    }

    removeNotice(key) {
        const { notices } = this.state
        this.setState({
            notices: notices.filter((notice) => {
                if (notice.key === key) {
                    if (notice.onClose) setTimeout(notice.onClose, this.transitionTime)
                    return false
                }
                return true
            })
        })
    }

    render() {
        const { notices } = this.state
        return (
            <TransitionGroup className="toast-notification">
                {
                    notices.map(notice => (
                        <CSSTransition
                            key={notice.key}
                            classNames="toast-notice-wrapper notice"
                            timeout={this.transitionTime}
                        >
                            <Notice {...notice} />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        )
    }
}

function createNotification() {
    // 3. 使用 ReactDOM 把虚拟DOM 渲染到页面上
    // 参数1： 要渲染的那个虚拟DOM元素
    // 参数2： 指定页面上的DOM元素，当作容器 
    const div = document.createElement('div')
    document.body.appendChild(div)
    const ref = React.createRef()
    ReactDOM.render(<Notification ref={ref} />, div)
    return {
        addNotice(notice) {
            //ref.current就是这个组件,他有这个方法  上面的class组件
            //notice一个对象包含有{type, content, duration, onClose}
            return ref.current.addNotice(notice)
        },
        destroy() {
            // DOM 中卸载组
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}
//导出的是这个函数执行之后的结果
export default createNotification()