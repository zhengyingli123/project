import React,{Component} from 'react'
import {Card,message, Input,Button, Tooltip} from 'antd'
import Webstorage from '../../utils/webstorage'
// import {Card,message, Input,Button,Upload, Icon, Tooltip} from 'antd'

const { TextArea } = Input;


class FoodAdd extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            price:'',
            desc:'',
            typename:'',
            typeid:'',
            img:''
        }
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
    submit=()=>{
        let img=Webstorage.getItem('img')
        let {name, price,desc,typename,typeid}=this.state

        this.$axios.post('http://localhost:3000/food/add',{name, price,desc,typename,typeid,img})
            .then((data)=>{
                if(data.err===0){
                    message.success('添加成功')
                }
            })
    }
    render(){
        let {name, price,desc,typename,typeid,img}=this.state
        return(
            <div>
                <div className="example-input">
                    <Card title='管理员添加'>
                        <label style={{marginRight:8}}>菜名</label>
                        <Input placeholder="请输入菜名" style={{width:200,margin: '0 8px 8px 0'}} type="text" value={name} onChange={(e)=>{
                            this.setState({name:e.target.value})
                        }}/>
                        <br/>
                        <label style={{marginRight:8}}>价格</label>
                        <Input placeholder="请输入价格" style={{width:200,margin: '0 8px 8px 0'}} type="text" value={price} onChange={(e)=>{
                            this.setState({price:e.target.value})
                        }}/>
                        <br/>
                        <label style={{marginRight:8}}>评价</label>
                        <TextArea rows={4} style={{width:200,margin: '0 8px 8px 0'}} type="text" value={desc} onChange={(e)=>{
                            this.setState({desc:e.target.value})
                        }}/>
                        <br/>
                        <label style={{marginRight:8}}>类型</label>
                        <Input placeholder="请输入类型" style={{width:200,margin: '0 8px 8px 0'}} type="text" value={typename} onChange={(e)=>{
                            this.setState({typename:e.target.value})
                        }}/>
                        <br/>
                        <label style={{marginRight:8}}>id&emsp;</label>
                        <Input placeholder="请输入id" style={{width:200,margin: '0 8px 8px 0'}} type="text" value={typeid} onChange={(e)=>{
                            this.setState({typeid:e.target.value})
                        }}/>
                        <br/>

                        <label style={{marginRight:8}}>图片</label>
                        <input type="file" ref='file'/>
                        <Button onClick={this.submitimg}>提交</Button><br/>
                        <img src={'http://localhost:3000'+this.state.img} alt="" style={{width:280,height:200,marginTop:8}}/>
                        <br/>
                        <Button type='primary' onClick={this.submit} style={{marginTop:8}}>添加</Button>
                    </Card>
                </div>
            </div>
        )
    }
}

export default FoodAdd