import * as service from '../../services/crud'
import {listen} from '../../services/ws'

export default {
  namespace: 'home',
  state: {
    data: {}
  },
  reducers: {
    fetchSuccess (state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    * fetch ({payload}, {call, put}) {
      const {data} = yield call(service.fetch)
      yield put({
        type: 'fetchSuccess',
        payload: {data: data}
      })
    }
  },
  subscriptions: {
    setup ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/home') {
          dispatch({type: 'fetch', payload: query})
          listen(data => {
            dispatch({type: 'receiveAlarm', payload: data})
          }, '/topic/alarm')
        }
      })
    }
  }
}
