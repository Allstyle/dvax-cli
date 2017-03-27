import React from 'react'
import { connect } from 'dva'
import styled from 'styled-components'
import config from '../../config'

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x:hidden;
  background: url(${config.ASSETS_API}/bg.jpg);
  background-size: cover;
  background-position: 50%;
`

const Home = ({ home }) => {
  return (
    <Root />
  )
}

export default connect(({ home }) => ({ home }))(Home)
