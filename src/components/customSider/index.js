import React from 'react'
import {withRouter} from 'react-router-dom'
import { Menu,Button,Icon } from 'antd';
// import webstorage from '../../utils/webstorage'
const { SubMenu } = Menu;
const root=[
    {
        name:"首页",
        path:"/admin/home",
        key:"/admin/home"
    },
    {
        name:"用户管理",
        path:"/admin/user",
        key:"/admin/user",
        children:[
            {name:"退出登录",path:"/admin/logout",key:"/admin/logout"},
            {name:"用户列表",path:"/admin/userlist",key:"/admin/userlist"},
        ]
    },
    {
        name:"菜品管理",
        path:"/admin/food",
        key:"/admin/food",
        children:[
            {name:"添加菜品",path:"/admin/foodadd",key:"/admin/foodadd"},
            {name:"菜品列表",path:"/admin/foodget",key:"/admin/foodget"},
            {name:"搜索菜品",
                path:"/admin/foodsearch",
                key:"/admin/foodsearch",
                children:[
                    {name:"按类型搜索",path:"/admin/getfoodbytype",key:"/admin/user/root"},
                    {name:"按关键字搜索",path:"/admin/getfoodbykey",key:"/admin/user/info"}
                ]
            }
        ]
    },
]

class customSider extends React.Component{
    jump=(path)=>{
        this.props.history.push(path);
    }
    renderItem=(data)=>{
        //1.判断children  有sub   没有item
        return data.map((item,index)=>{
            if (item.children){
                //渲染次级
                return(
                    <SubMenu title={item.name} key={item.key}>
                        {this.renderItem(item.children)}{/*递归*/}
                    </SubMenu>
                )
            }else{
                return(
                    <Menu.Item  key={item.key} onClick={this.jump.bind(this,item.path)}>
                        {item.name}
                    </Menu.Item>
                )
            }
        })
    }
    state = {
        collapsed: true,
      };
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    render(){
        return(
            <div>
            <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
            <Menu style={{ width: 200}} mode="inline" theme="dark">
                {this.renderItem(root)}
            </Menu>
            </div>
        )
    }
}
export default withRouter(customSider)