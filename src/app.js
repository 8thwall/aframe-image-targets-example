const onxrloaded = () => {
    XR8.XrController.configure({
        imageTargetData: [
        require('model-target.json'),
        require('video-target.json'),
        ],
    })
}
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)