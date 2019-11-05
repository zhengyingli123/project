import React from 'react';
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom'

import Login from '../pages/login'
import Admin from '../pages/admin'
import Home from '../pages/home'
import Food from '../pages/food'
import FoodList from '../pages/foodlist'
import FoodAdd from '../pages/foodadd'
import GetFoodByKey from '../pages/getFoodByKey'
import GetFoodByType from '../pages/getFoodByType'

class RootRoute extends React.Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' component={()=>{
                        return(
                            <Admin>
                                <Route path='/admin/home' component={Home}></Route> 
                                <Route path='/admin/food' component={Food}></Route> 
                                <Route path='/admin/foodlist' component={FoodList}></Route> 
                                <Route path='/admin/foodadd' component={FoodAdd}></Route>  
                                <Route path='/admin/getfoodbytype' component={GetFoodByType}></Route> 
                                <Route path='/admin/getfoodbykey' component={GetFoodByKey}></Route>                   
                            </Admin>     
                        )
                    }}></Route>
                </Switch>
            </HashRouter>
        )
    }
}

export default RootRoute