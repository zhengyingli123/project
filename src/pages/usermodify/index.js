import React, { Component } from 'react';
import {Card,message,Button,Input} from 'antd';
import Style from './index.module.less';

export class UserModify extends Component {
  constructor(props){
    super(props);
    this.state=props.data;
  };
  submit=()=>{
    let {_id,user,password,sex}=this.state;
    this.$axios.post('http://localhost:3000/user/update',{_id,user,password,sex}).then((data)=>{
      console.log(data);
      if(data.err===0){
        message.success('修改成功');
        this.props.cancelUserModify(1);
      }
    })
  }
  render() {
    console.log(this,'获取值');
    let {user,password}=this.state;
    return (
      <div className={Style.usermodify}>
        <Card title='用户列表'>
          <label>姓名：</label>
          <Input type='text' value={user} onChange={(e)=>{
            this.setState({user:e.target.value})
          }} />
          <br/>
          <label>密码：</label>
          <Input type='text' value={password} onChange={(e)=>{
            this.setState({password:e.target.value})
          }} />
          <br/>
          <Button onClick={this.submit} >修改</Button>
          <Button onClick={()=>{
            this.props.cancelUserModify(0)
          }} >关闭</Button>
        </Card>
      </div>
    );
  }
}

export default UserModify;
