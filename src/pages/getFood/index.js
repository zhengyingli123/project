import React from 'react'
import { Input,Card,Spin,Table,Pagination,message,Popconfirm,Button} from 'antd';
import FoodUpdate from '../foodupdate/update'
import Webstorage from '../../utils/webstorage';

class GetFood extends React.Component{
    columns = [
        {
            title: '类型id',
            dataIndex: 'typeid',
            key: 'typeid',
        },
        {
            title: '类型名称',
            dataIndex: 'typename',
            key: 'typename',
        },
        {
            title: '菜品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',

            render:(record)=><img src={'http://localhost:3000'+record} width="100px" />
        },
        {
            title:'操作',
            key:'action',
            render:(data)=> {
                // console.log('删除按钮',data,this)
                return(
                    <div>
                        <Popconfirm 
                        title='你确定要删除吗？'
                        onConfirm={this.delfood.bind(this,data._id)}
                        >
                            <Button size='small'>删除</Button>
                        </Popconfirm>
                        <Button size='small' onClick={this.updatefood.bind(this,data)}>修改</Button>
                    </div>
                )
            },
        }
    ];
    cancelUpdate=(state)=>{
        if(state){
            this.getFoodByPage(this.state.page,this.state.pageSize)
            this.setState({updateShow:false})
        }
        this.setState({updateShow:false})
    }
    updatefood=(data)=>{
        console.log('修改数据',data)
        this.data=data
        this.setState({updateShow:true})
    }
    delfood=(_id)=>{
        // console.log('删除'+_id)
        Webstorage.setItem('_id',_id)
        this.$axios.post('http://localhost:3000/food/del',{_id})
        .then((data)=>{
            if(data.err===0){
                message.success('删除成功')
                this.getFoodByPage(this.state.page,this.state.pageSize) // 删除成功后请求最新数据，刷新页面
            }
        })
    }
    constructor(){
        super()
        this.state={
            dataSource:[],
            spinning:true,
            total:0,//总数据条数
            pageSize:5,//每页的条数
            page:1,//当前页
            updateShow:false
        }
    }

    componentDidMount(){
        this.getFoodByPage(1,this.state.pageSize);
    }
    getFood(){
        // let kw=typename;
        this.$axios.post('http://localhost:3000/food/list').then((data)=>{
            // console.log(data);
            this.setState({dataSource:data.list,spinning:false,total:data.list.length})
            // console.log(data._id)
        })
    }

    getFoodByPage(page,pageSize){
        this.setState({spinning:true})
        this.$axios.post('http://localhost:3000/food/getInfoByPage',{page,pageSize}).then((data)=>{
            console.log(data);
            if (data.err===0){
                let tmppage=page;
                //边界判断
                if (Math.ceil(data.info.count/this.state.pageSize)<page){
                    tmppage=Math.ceil(data.info.count/this.state.pageSize)
                }
                this.setState({dataSource:data.info.list,total:data.info.count,spinning:false,page:tmppage})
            }
        })
    }

    //分页的页码发生改变
    pageChange=(page,pageSize)=>{
        // console.log("分页改变",page,pageSize);
        //当页面发生改变重新请求数据
        //总条数  每页条数   数据显示
        this.getFoodByPage(page, pageSize)
    }
    render(){
        let {spinning,dataSource,pageSize,page,total,updateShow}=this.state;
        let data=this.data
        return(
            <div>
                <div>
                    <Card title="菜品列表">
                        <Spin spinning={spinning}>
                            <Table
                                pagination={false}
                                dataSource={dataSource}
                                columns={this.columns}></Table>
                            <br/>
                            <Pagination simple current={page} total={total} pageSize={pageSize}
                                        onChange={this.pageChange}
                            />
                        </Spin>
                    </Card>
                    {!updateShow||<FoodUpdate cancelUpdate={this.cancelUpdate} data={data}></FoodUpdate>}
                </div>
            </div>
        )
    }
}

export default GetFood