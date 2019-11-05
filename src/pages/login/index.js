import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message,Card} from 'antd'; //antd的form组件
import Style from './index.module.less';
// import webStorage from '../../utils/webstorage'

class Login extends React.Component{
    submit=()=>{
        // console.log(this.state)
        // let result=this.props.form.getFieldsValue()  // getFieldsValue 获取双向绑定的数据
        this.props.form.validateFields((err,userinfo)=>{
            // err 验证是不是通过  通过为null
            if(err){
                message.error('信息输入有误，请重试')
            }else{
                this.$axios.post('http://localhost:3000/user/login',userinfo)
                .then((data)=>{
                    console.log(data)
                    if(data.err===0){
                        //存值
                        // webStorage.setItem('rootList',data.rootList)
                        // webStorage.setItem('token',data.token)
                        // webStorage.setItem('uid',data.uid)
                        this.props.history.push('/admin/home')
                    }else{

                    }
                })
                message.success('登陆成功,3s后跳转首页')
            }
        })
    }
    render(){
        // console.log(this,'login')
        const { getFieldDecorator } = this.props.form;
        //getFieldDecorator 表单组件获取数据的方法  也是一个高阶
        return(
            <div className={Style.login}>
            <Card title='用户登录' className={Style.loginCard}>
                <div className="login-form">
                    <Form.Item>
                    {getFieldDecorator('user', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>Or <a href="">register now!</a>
                    <Button type="primary" onClick={this.submit} className="login-form-button">
                        Log in
                    </Button>
                    
                    </Form.Item>
                </div>
            </Card>
            </div>
        )
    }
}

export default Form.create()(Login)