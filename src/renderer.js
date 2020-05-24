const forceReload = () => {
    location.reload()
}
// communicate with app native container
// this part will fail HARD on web browser
const ipc = require('electron').ipcRenderer
const ipcEmitUnread = () => {
    ipc.send('event', {
        type: "unread_msg",
        value: null
    })
}
const ipcEmitOpen = () => {
    ipc.send('event', {
        type: "open",
        value: null
    })
}
const ipcEmitUnreadClear = () => {
    ipc.send('event', {
        type: "unread_clear",
        value: null
    })
}
const ipcEmitNotifClick = () => {
    ipc.send('event', {
        type: "notif_clicked",
        value: null
    })
}
window.addEventListener("focus", function(event) {
    ipcEmitUnreadClear();
}, false);