import React from 'react'
import {withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
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
            {name:"更新菜品",path:"/admin/foodupdate",key:"/admin/foodupdate"},
            {name:"删除菜品",path:"/admin/fooddel",key:"/admin/fooddel"},
            {name:"展示菜品",path:"/admin/foodlist",key:"/admin/foodlist"},
            {name:"搜索菜品",
                path:"/admin/foodget",
                key:"/admin/foodget",
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
    render(){
        return(
            <Menu  style={{ width: 200}} mode="vertical" theme="dark">
                {this.renderItem(root)}
            </Menu>
        )
    }
}
export default withRouter(customSider)