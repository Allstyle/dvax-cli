export default [
  {key: 'home', name: '首 页', path: '/home'},
  {key: 'moduleA', name: '模块A', path: '/moduleA/subModule/myModule'},
  {key: 'moduleB', name: '模块B', path: '/moduleB/subModule/myModule'}
]

export const MENUS = {
  moduleA: [
    {
      key: 'subModule',
      name: '二级菜单A',
      icon: 'appstore',
      children: [
        {key: 'myModule', name: '三级菜单A'},
        {key: 'myModule2', name: '三级菜单2'}
      ]
    }
  ],
  moduleB: [
    {
      key: 'subModule',
      name: '二级菜单B',
      icon: 'appstore',
      children: [
        {key: 'myModule', name: '三级菜单B'}
      ]
    }
  ]
}
