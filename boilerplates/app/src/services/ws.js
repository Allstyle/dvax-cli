/**
 * Created by liekkas on 2017/3/21.
 * 一次真能侦听一个topic
 */
import {WEB_SOCKET} from '../config'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let stompClient
let lastTopic = null

function onFailure (action) {
  console.log('STOMP:>>> 后台服务连接失败....')
  stompClient = null
  setTimeout(() => listen(action), 4000)
  console.log('STOMP:>>> Reconecting in 4 seconds')
}

export function listen (action, topic) {
  if (topic === lastTopic) return

  lastTopic = topic
  if (!stompClient) { // 第一次创建、或者重连(要把以前保存的topic都订阅一遍)
    const socket = new SockJS(WEB_SOCKET)
    stompClient = Stomp.over(socket)
    stompClient.connect({}, () => {
      stompClient.subscribe(lastTopic, function (v) {
        const result = JSON.parse(v.body)
        // console.log('>>> 收到一条新消息',v)
        action(result)
      })
    }, () => onFailure(action))
  } else {
    stompClient.connect({}, () => {
      stompClient.subscribe(topic, function (v) {
        const result = JSON.parse(v.body)
        // console.log('>>> 收到一条新消息',v)
        action(result)
      })
    }, () => onFailure(action))
  }
}

export function unListen () {
  if (stompClient != null) {
    stompClient.disconnect()
  }
}
