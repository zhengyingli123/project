import React from 'react'
// import Style from 'index.module.less'
import { Layout, Menu, Icon,Dropdown,Button} from 'antd';
import CustomSider from '../../components/customSider'
import Modal from '../../components/modal/modal'
import {withRouter} from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;
class Admin extends React.Component{
    renderMenu=()=>{
        return(
            <Menu>
                <Menu.Item onClick={this.logout}>
                    <span>用户注销</span>
                </Menu.Item>
            </Menu>
        )
    }
    logout=()=>{
        this.props.history.replace("/login")
    }
    render(){
        return(
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >
                    <CustomSider></CustomSider>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 , textAlign:'center',fontSize:'20px'}}>
                        小仙女餐厅管理系统
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
                <Modal></Modal>
            </Layout>
        )
    }
}
export default withRouter(Admin)