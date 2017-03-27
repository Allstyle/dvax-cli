import React from 'react'
import { Router } from 'dva/router'
import App from './routes/App.js'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

const genRoute = (app, name, model, component) => {
  return {
    path: name,
    name,
    getComponent (nextState, cb) {
      require.ensure([], () => {
        registerModel(app, model)
        cb(null, component)
      })
    }
  }
}

function RouterConfig ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/home/home'))
          cb(null, {component: require('./routes/home/Home')})
        })
      },
      childRoutes: [
        genRoute(app, 'home', require('./models/home/home'), require('./routes/home/Home')),
        genRoute(app, '/moduleA/subModule/myModule', require('./models/moduleA/subModule/myModule'), require('./routes/moduleA/subModule/MyModule')),

        // 404
        {
          path: '*',
          name: 'notFound',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/NotFound'))
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes} />
}

export default RouterConfig
