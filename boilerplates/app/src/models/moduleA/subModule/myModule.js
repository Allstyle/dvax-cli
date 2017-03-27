import * as service from '../../../services/crud'
import REST_API from '../../../consts/api'
import _ from 'lodash'
const api = REST_API.moduleA.myData

export default {
  namespace: 'myModule',
  state: {
    name: '',
    list: []
  },
  reducers: {
    fetchSuccess (state, {payload}) {
      return {...state, ...payload}
    },

    createSuccess (state, {payload}) {
      return {...state, list: [...state.list, payload]}
    },

    removeSuccess (state, {payload}) {
      return {...state, list: _.filter(state.list, d => d.id !== payload)}
    },

    updateSuccess (state, {payload}) {
      const item = _.find(state.list, {id: payload.id})
      _.assign(item, payload)
      return {...state, list: [...state.list]}
    }

  },
  effects: {
    * fetch ({ payload }, {call, put}) {
      const {data} = yield call(service.fetch, api)
      yield put({type: 'fetchSuccess', payload: data})
    },

    * create ({ payload: values }, { call, put }) {
      const {data} = yield call(service.create, {api, values})
      yield put({ type: 'createSuccess', payload: data })
    },

    * remove ({ payload: id }, { call, put }) {
      yield call(service.remove, {api, id})
      yield put({ type: 'removeSuccess', payload: id })
    },

    * update ({ payload: { id, values } }, { call, put }) {
      const {data} = yield call(service.update, {api, id, values})
      yield put({ type: 'updateSuccess', payload: data })
    }
  },
  subscriptions: {
    setup ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/moduleA/subModule/myModule') {
          dispatch({type: 'fetch'})
        }
      })
    }
  }
}
