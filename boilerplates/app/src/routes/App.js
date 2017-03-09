/**
 * Created by liekkas on 2017/3/8.
 */
import React from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

const Root = styled.div`

`

const App = ({app}) => {
  return (
    <Root>

    </Root>
  )
}

App.propsTypes = {

}

export default connect(({app}) => ({app}))(App)

