import React from 'react'
import { connect } from 'dva'
import styled from 'styled-components'

const Root = styled.div`
  color: ${props => props.theme.color}
`

const MyModule = ({myModule}) => {
  return (
    <Root>
      Hello, {myModule.name}
    </Root>
  )
}

MyModule.propsTypes = {

}

export default connect(({myModule}) => ({myModule}))(MyModule)
