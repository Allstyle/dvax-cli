import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  width: 83%;
  margin-left: 16%;
  padding-top: 70px;
  height: 100%;
  position: relative;
`

const Content = ({children}) => {
  return (
    <Root>
      {children}
    </Root>
  )
}

export default Content
