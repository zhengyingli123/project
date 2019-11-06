import React,{Fragment}from 'react'
import {withRouter} from 'react-router-dom'
import {Card,Button} from 'antd'
import {connect} from 'react-redux'
import actionCreator from '../../store/actionCreator'
// import webStorage from '../../utils/webstorage'
import Style from './modal.module.less'
class Modal extends React.Component{

    render(){
        console.log(this,'modal');
        let {tokenModal}=this.props
        return(
            <Fragment>
                {tokenModal? '':
                    <div className={Style.modalBox}>
                        <Card title="token缺失" className={Style.card}>
                            <h3>token失效请重新登录</h3>
                            <Button onClick={() => {
                                this.props.history.push('/login');
                                let action=actionCreator.changeTokenModal(true);
                                this.props.dispatch(action);
                            }}>去登陆</Button>
                        </Card>
                    </div>
                }
            </Fragment>
        )
    }
}
export default connect(state=>state)(withRouter(Modal))