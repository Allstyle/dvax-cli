import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import {MENUS} from '../../consts/menu'

const getMenus = function (module, topMenus, menuArray, siderFold, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(module, topMenus, item.children, siderFold, parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={'/' + module + parentPath + item.key}>
          <Link to={'/' + module + parentPath + item.key}>
            <Icon type='right' />
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

const SideNav = ({module, selectedKeys, openKeys, siderFold}) => {
  const menusData = MENUS[module]
  if (!menusData) return null
  const topMenus = menusData.map(item => item.key)
  const menuItems = getMenus(module, topMenus, menusData, siderFold)
  return (
    <div>
      {
        siderFold
          ? <Menu
            mode='vertical'>
            {menuItems}
          </Menu>
          : <Menu
            selectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
            mode='inline'>
            {menuItems}
          </Menu>
      }
    </div>
  )
}

SideNav.propTypes = {
  module: React.PropTypes.string,
  siderFold: React.PropTypes.bool,
  selectedKeys: React.PropTypes.array,
  openKeys: React.PropTypes.array
}

export default SideNav
