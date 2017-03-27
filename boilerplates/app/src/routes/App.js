import React from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'
import { connect } from 'dva'
import { Header, SideNav, Footer } from '../components'
import theme from '../theme'
import _ from 'lodash'

const Root = styled.div`
  background-color: ${props => props.theme['body-background']};
`
const Content = styled.div`
  height: 100vh;
  overflow: auto;
`
const Middle = styled.div`
   height: 96vh;
  padding-top: 70px;
  display: flex;
  // overflow: auto;
`

const Left = styled.div`
  width: 15%;
`

const Right = styled.div`
  width: 83%;
  margin-left: 1%;
`

class App extends React.Component {
  componentDidUpdate (prevProps, prevState) {
    // 模块切换滚动条重置
    const node = ReactDOM.findDOMNode(this.refs.content)
    node.scrollTop = 0
  }

  render () {
    const {children, location} = this.props
    const openKeys = _.compact(location.pathname.split('/'))
    const module = location.pathname === '/' ? 'home' : openKeys[0]
    return (
      <ThemeProvider theme={theme}>
        <Root>
          <Header module={module} />
          <Content ref='content'>
            {
              module === 'home' ? children
                : <div>
                  <Middle>
                    <Left>
                      <SideNav module={module}
                        openKeys={openKeys}
                        selectedKeys={[location.pathname]} />
                    </Left>
                    <Right>{children}</Right>
                  </Middle>
                  <Footer />
                </div>
            }
          </Content>
        </Root>
      </ThemeProvider>
    )
  }
}

export default connect(({app}) => ({app}))(App)
