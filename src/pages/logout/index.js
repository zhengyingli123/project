import React from 'react'
import {Button} from 'antd';

class Logout extends React.Component{
    logout=()=>{
        this.$axios.post('http://localhost:3000/user/logout')
        .then((data)=>{
            console.log(data);
            if(data.err===0){
                this.props.history.replace('/login')
            }
        })
    }
    render(){
        return(
            <Button onClick={this.logout}>退出登录</Button>
        )
    }
}
export default Logout