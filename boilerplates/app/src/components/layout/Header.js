/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import styled from 'styled-components'
import { Link } from 'dva/router'
import MenuData from '../../consts/menu'
import config from '../../config'

const Root = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0;
  z-index: 9;
  height: 60px;
  background-color: ${props => props.isHome ? 'none' : props.theme.header.bgColor};
`

const LogoImg = styled.img`
  cursor: pointer;
`

const Menu = styled.div`
  display: flex;
`

const MenuItem = styled.div`
  color: ${props => props.selected ? props.theme.header.selectedColor : props.theme.header.color};
  background-color: ${props => props.selected ? props.theme.header.selectedBgColor : 'none'};
  font-size: 1rem;
  text-align: center;
  padding: 17px 16px 19px;
  &:hover {
    color: ${props => props.theme.header.hoverColor};
    background-color: ${props => props.theme.header.hoverBgColor};
  }
`

const Header = ({module}) => {
  return (
    <Root isHome={module === 'home'}>
      <Link to='/home'>
        <LogoImg src={config.ASSETS_API + '/logo.png'} />
      </Link>
      <Menu>
        {
          MenuData.map((item, index) =>
            <Link key={index} to={item.path}>
              <MenuItem selected={module === item.key}>{item.name}</MenuItem>
            </Link>
          )
        }
      </Menu>
    </Root>
  )
}

Header.propTypes = {
  module: React.PropTypes.string
}

export default Header
