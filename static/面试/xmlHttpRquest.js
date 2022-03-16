// 初始化xhr  new XMLHttpRequest()
// 设置请求行 xhr.open('GET', url, true)
// 设置回调   xhr.onReadyStateChange = () => 
// 设置请求头 xhr.setRequestHeader(key, value)
// 发送请求 xhr.send(data)

const ajax = {
    get(url, fn) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true)
        xhr.onreadystatechange = ((res) => {
            if(xhr.readyState === 4) {
                return fn(xhr.responseText)
            }
        })

        xhr.send()
    },
    post(url, fn, data) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url, true);

        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                fn(xhr.responseText)
            }
        }

        xhr.send(data)
    }
}