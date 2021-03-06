import dva from 'dva'
// import {browserHistory} from 'dva/router'
import './styles/index.less'

import createLoading from 'dva-loading'

const app = dva({
//   history: browserHistory,
  onError (e) {
    console.error(e.message)
  }
})

app.use(createLoading())

app.router(require('./router'))

app.start('#root')
