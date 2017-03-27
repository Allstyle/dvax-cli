import React from 'react'
import styled from 'styled-components'
import config from '../../config'

const Root = styled.div`
  width: 100%;
  height: 75vh;
  background-image: url(${config.ASSETS_API}/wip.jpg);
  background-size: cover;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WIP = (props) => <Root />

export default WIP
