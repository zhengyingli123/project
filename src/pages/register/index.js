import React from 'react';
import { Input ,Form,Button} from 'antd';
import {withRouter} from "react-router-dom"
class Reg extends React.Component {
    constructor(){
        super()
        this.state={
            name:"",
            password:"",
            email:"",
            code:"",
        }
    }
    tijiao() {
        let name = this.state.name
        let password = this.state.password
        let email = this.state.email
        let code = this.state.code
        let url = 'http://localhost:3000/user/reg'
// console.log(name,password,email,code,url)
        this.$axios.post(url, { user: name, password: password, mail: email, code: code })
            .then((data) => {
                // console.log(data)
                alert(data.msg)
                // console.log(this)
                if(data.err==0){
                    this.props.history.push("Login")
                }
            })
    }
    yanzhengma() {
        let url = "http://localhost:3000/user/getMailCode"
        let email = this.state.email
        this.$axios.post(url, { mail: email })
            .then((data) => {
                console.log(data)
                alert(data.msg)
            })
    }
    render() {
        return (
            <div style={{height: "100vh",position: "relative",background: "url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573039819505&di=1ae5948a8733a38c4a18c16ec81f5c38&imgtype=0&src=http%3A%2F%2Fimg009.hc360.cn%2Fm8%2FM08%2FCE%2F01%2FwKhQpVcrEJ6EenDzAAAAAO6IBcU986.jpg') no-repeat",backgroundSize:"100% auto "}}>
                <Form style={{width:"400px",height:"450px",position:"fixed",top:"0",left:"0",right:"0",bottom:"0",margin:"auto",background:"#fff",borderRadius:"50px",boxShadow: "2px 2px 20px #888888"}}>
                    <div style={{width:"300px",height:"400px",position:"fixed",top:"50px",left:"0",right:"0",bottom:"0",margin:"auto",background:"#fff"}}>
                        <h2>注册页面</h2>
                        <br />
                        用户名：<Input type="text" value={this.state.name} placeholder="请输入您的用户名" 
                        onChange={(e)=>{
                            this.setState({name:e.target.value})
                        }}></Input>
                        <br />
                        密&emsp;码：<Input value={this.state.password} placeholder="请输入您的密码" type="password"
                        onChange={(e)=>{
                            this.setState({password:e.target.value})
                        }}
                        ></Input>
                        <br />
                        邮&emsp;箱：<Input type="text" value={this.state.email} placeholder="请输入您的邮箱"
                        onChange={(e)=>{
                            this.setState({email:e.target.value})
                        }}
                        ></Input>
                        <br />
                        验证码：
                        <br />
                        <Input style={{width:"190px"}} type="text" value={this.state.code} placeholder="验证码会发到您的邮箱里"
                        onChange={(e)=>{
                            this.setState({code:e.target.value})
                        }}
                        ></Input>
                        <Button onClick={() => {
                            this.yanzhengma()
                        }}>获取验证码</Button>
                        <a href="http://localhost:3001/#/Login">已有账号？去登录</a>
                        <br />
                        <br />
                        <br />
                        
                        <div  style={{width:"170px",display:"flex",flexDirection:"row-reverse"}}>
                            <Button onClick={() => {
                                this.tijiao()
                            }}>提交</Button>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

export default withRouter(Reg)