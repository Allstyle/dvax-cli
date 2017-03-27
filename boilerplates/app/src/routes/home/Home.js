import React from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x:hidden;
  background: url(assets/bg.jpg);
  background-size: cover;
  background-position: 50%;
`

const Home = ({ home }) => {
  return (
    <Root />
  )
}

export default connect(({ home }) => ({ home }))(Home)
