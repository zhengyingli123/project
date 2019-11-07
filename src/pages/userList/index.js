import React from 'react';
import {Card,Table,Popconfirm,Button, message,Pagination} from 'antd';
import UserModify from '../usermodify/index';

class UserList extends React.Component{
    columns=[
        {
            title: '姓名',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render(data){
                let sex={'0':'女','1':'男'}
                return(
                    <span>{sex[data]}</span>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            render:(data)=>{
                return(
                    <div>
                        <Popconfirm title='你确定删除吗？' onConfirm={this.delRoot.bind(this,data._id)} >
                            <Button size='small'>删除</Button>
                        </Popconfirm>
                        <Button size='small' onClick={this.userModify.bind(this,data)}>修改</Button>
                    </div>
                )
            }
        }
    ];
    constructor(){
        super();
        this.state={
            dataSource:[],
            isModifyShow:false,
        }
    };
    componentDidMount(){
        this.getUserList();
    };
    //获取用户列表
    getUserList(){
        let {page,pageSize}=this.state;
        this.$axios.post('http://localhost:3000/user/list').then((data)=>{
            if(data.err===0){
                this.setState({dataSource:data.info.list,})
            }
        })
    };
    //删除
    delRoot(_id){
        this.$axios.post('http://localhost:3000/user/del',{_id}).then((data)=>{
            console.log(data);
            if(data.err===0){
                message.success('删除成功');
                this.getUserList();
            }
        })
    };
    //修改用户列表
    userModify(data){
        this.data=data;
        this.setState({isModifyShow:true})
    };
    //取消修改弹窗
    cancelUserModify=(state)=>{
        if(state){
            this.getUserList();
            this.setState({isModifyShow:false})
        }else{
            this.setState({isModifyShow:false})
        }
        
    };
    
    render(){
        let {dataSource}=this.state;
        return(
            <div>
                <Card title='用户列表'>
                    <Table
                        dataSource={dataSource}
                        columns={this.columns}
                    ></Table>
                </Card>
                { this.state.isModifyShow ? <UserModify cancelUserModify={this.cancelUserModify} data={this.data}></UserModify> : ''}
            </div>
        )
    }
}
export default UserList