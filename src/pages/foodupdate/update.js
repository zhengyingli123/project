import React from 'react'
import {Card,message,Input,Button} from 'antd'
import Style from './index.module.less'
import Webstorage from '../../utils/webstorage'

/* 
1.点击修改按钮，显示修改组件
2.组价内部显示默认数据
3.点击提交调用接口
4.成功   关闭当前页面
5.刷新列表页

*/

class FoodUpdate extends React.Component{
    constructor(props){
        super()
        console.log(this,'接收到props发生改变') //接收到props发生改变
        this.state=props.data
    }
    componentWillReceiveProps(props){
        console.log(props)
    }
                                                                                                                        
    update=()=>{
        // let {userName,passWord}=this.state
        console.log('修改菜品信息')
        let uid=this.state._id
        let name=this.state.name
        let typeid=this.state.typeid
        let typename=this.state.typename
        let price=this.state.price
        let img=this.state.img
        let desc=this.state.desc

        this.$axios.post('http://localhost:3000/food/update',{_id:uid,name,typeid,typename,price,img,desc})
        .then((data)=>{
            console.log(data)
            if(data.err===0){
                message.success('修改成功')
                // this.setState({dataSource:data.info.list,total:data.info.count,spinning:false})
                console.log('修改成功',this)
                this.props.cancelUpdate(1) // 1表示刷新界面   0表示没必要刷新
                // this.setState()
                // this.setState({dataSource:this.state})
            }
        })
    }
    submitimg=()=>{
        let {img}=this.state
        let imgs=this.refs.file.files[0]
        let formdata=new FormData()
        formdata.append('hehe',imgs)
        // console.log(formdata.get('hehe'))

        this.$axios.post('http://localhost:3000/file/upload',formdata)
            .then((data)=>{
                console.log(data.img)
                if(data.err===0){
                    message.success('上传成功')
                    this.setState({img:data.img})
                    Webstorage.setItem('img',data.img)
                }else {
                    message.error('上传失败')
                }
            })
    }
    render(){
        let {typeid,typename,name,price,desc,img}=this.state
        return(
            <div className={Style.upDate}>
                <Card title="菜品信息修改">
                    <label htmlFor="">类型id</label>
                    <Input type="text" value={typeid} onChange={(e)=>{
                        this.setState({typeid:e.target.value})
                    }}/>
                    <br/>
                    <label htmlFor="">类型名称</label>
                    <Input type="text" value={typename} onChange={(e)=>{
                        this.setState({typename:e.target.value})
                    }}/>
                    <br/>
                    <label htmlFor="">菜品名称</label>
                    <Input type="text" value={name} onChange={(e)=>{
                        this.setState({name:e.target.value})
                    }}/>
                    <br/>
                    <label htmlFor="">价格</label>
                    <Input type="text" value={price} onChange={(e)=>{
                        this.setState({price:e.target.value})
                    }}/>
                    <br/>
                    <label htmlFor="">描述</label>
                    <Input type="text" value={desc} onChange={(e)=>{
                        this.setState({desc:e.target.value})
                    }}/>
                    <br/>
                    <label style={{marginRight:8}}>图片</label>
                    <input type="file" ref='file'/>
                    <Button onClick={this.submitimg}>提交</Button><br/>
                    <img src={'http://localhost:3000'+this.state.img} alt="" style={{width:280,height:200,marginTop:8}}/>
                    <br/>

                    <Button onClick={this.update}>修改</Button>
                    <Button onClick={()=>{
                        this.props.cancelUpdate(0)
                    }}>关闭</Button>
                </Card>
            </div>
        )
    }
}

export default FoodUpdate