import React from 'react';
import { Input,Card,Spin,Table,Pagination,message,Popconfirm,Button} from 'antd';
const { Search } = Input;
class GetFoodByKey extends React.Component{
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
            dataIndex:'img',
            key: 'img',
            render: (record) => <img src={'http://localhost:3000'+record} alt="" width="100px"/>
        }
    ];
    constructor(){
        super()
        this.state={
            dataSource:[],
            spinning:true,
            total:0,//总数据条数
            pageSize:5,//每页的条数
            page:1,//当前页
        }
    }
    componentDidMount(){
        this.getFoodByPage(1,this.state.pageSize);
    }
    getFoodByType(kw){
        this.$axios.post('http://localhost:3000/food/getInfoByKw',{kw}).then((data)=>{
            console.log(data);
            this.setState({dataSource:data.list,spinning:false,total:data.list.length})
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
        console.log("分页改变",page,pageSize);
        //当页面发生改变重新请求数据
        //总条数  每页条数   数据显示
        this.getFoodByPage(page, pageSize)
    }
    render(){
        let {spinning,dataSource,pageSize,page,total}=this.state;
        return(
            <div>
                <div style={{display:"inline-block",marginRight:"10px",marginBottom:"10px"}}>根据菜品关键字搜索</div>
                <div style={{display:"inline-block",marginBottom:"10px"}}>
                    <Search
                        placeholder="菜品名称或类型关键字"
                        onSearch={value => {this.getFoodByType(value);}}
                        style={{ width: 200 }}
                    />
                </div>
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
                </div>
            </div>
        )
    }
}

export default GetFoodByKey