import notificationDOM from './notification'
import './toast.css'

let notification
const notice = (type, content, duration = 2000, onClose) => {
    //因为一个页面中只需要存在一个 Notification 组件，所以每次调用函数时只需要判断当前 notification 对象是否存在即可，无需重复创建。
    if (!notification) notification = notificationDOM
    return notification.addNotice({ type, content, duration, onClose })
}

export default {
    info(content, duration, onClose) {
        return notice('info', content, duration, onClose)
    },
    success(content, duration, onClose) {
        return notice('success', content, duration, onClose)
    },
    warning(content, duration, onClose) {
        return notice('warning', content, duration, onClose)
    },
    error(content, duration, onClose) {
        return notice('error', content, duration, onClose)
    },
    loading(content, duration = 0, onClose) {
        return notice('loading', content, duration, onClose)
    }
}