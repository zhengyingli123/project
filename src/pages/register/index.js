import React from 'react';
import { Input, Form, Button, message } from 'antd';
import { withRouter } from "react-router-dom"
import "./aa.css"
import "./aa.js"

class Reg extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            password: "",
            email: "",
            code: "",
        }
        localStorage.removeItem("isSuccess");
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
                // alert(data.msg)

                // console.log(this)
                if (data.err === 0) {
                    setTimeout(() => {
                        message.success('注册成功')
                    }, 1000)

                    this.props.history.push("Login")
                } else {
                    setTimeout(() => {
                        message.warning('注册失败，请重新注册')
                    }, 1000)

                }
            })
    }
    yanzhengma() {
        let as=localStorage.getItem("isSuccess")
            console.log(as)
        if(as){
        let url = "http://localhost:3000/user/getMailCode"
        let email = this.state.email
        this.$axios.post(url, { mail: email })
            .then((data) => {
                console.log(data)
                if (data.err === 0) {
                    message.success('验证码发送成功')
                } else {
                    message.error('验证码发送失败,请30秒后重新解锁发送')
                }
            })
            localStorage.removeItem("isSuccess");
        }else{
            message.error('请滑动解锁')
        }

        
    }
    render() {
        return (
            <div style={{ height: "100vh", position: "relative", background: "url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573056682593&di=9f43c7a00b8a3ff0ec2086b62779b8f4&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170809%2Fa9745933456e447b88c58aaff9ee1bec.png') no-repeat", backgroundSize: "100% auto " }}>
                <Form style={{ width: "400px", height: "450px", position: "fixed", top: '80px', left: '80px', background: "#fff", borderRadius: "50px", boxShadow: "2px 2px 20px #888888" }}>
                    <div style={{ width: "300px", height: "350px", position: "fixed", top: '100px', left: '130px', background: "#fff" }}>
                        <h2>注册页面</h2>
                        <br />
                        用户名：<Input type="text" value={this.state.name} placeholder="请输入您的用户名"
                            onChange={(e) => {
                                this.setState({ name: e.target.value })
                            }}></Input>
                        <br />
                        密&emsp;码：<Input value={this.state.password} placeholder="请输入您的密码" type="password"
                            onChange={(e) => {
                                this.setState({ password: e.target.value })
                            }}
                        ></Input>
                        <br />
                        邮&emsp;箱：<Input type="text" value={this.state.email} placeholder="请输入您的邮箱"
                            onChange={(e) => {
                                this.setState({ email: e.target.value })
                            }}
                        ></Input>
                        <br />
                        <div id="box" onselectstart="return false">
                        <div className="bgColor"></div>
                        <div className="txt" >滑动解锁</div>
                        <div className="slider"><i className="iconfont icondoubleright"></i></div>
                        </div>
                        <br />
                        验证码：
                        <br />
                        <Input style={{ width: "190px" }} type="text" value={this.state.code} placeholder="验证码会发到您的邮箱里"
                            onChange={(e) => {
                                this.setState({ code: e.target.value })
                            }}
                        ></Input>
                        <Button onClick={() => {
                            this.yanzhengma()
                        }}>获取验证码</Button>
                        <a href="http://localhost:3001/#/Login">已有账号？去登录</a>
                        <br />


                        <div style={{ width: "170px", display: "flex", flexDirection: "row-reverse" }}>
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