import React from 'react';
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom'

import Login from '../pages/login'
import Reg from '../pages/register'
import Admin from '../pages/admin'
import Home from '../pages/home'
import User from '../pages/user'
import UserList from '../pages/userList'
import Logout from '../pages/logout'
import FoodAdd from '../pages/foodadd'
import FoodUpdate from '../pages/foodupdate/update'
import FoodDel from '../pages/fooddel'
import GetFoodByKey from '../pages/getFoodByKey'
import GetFoodByType from '../pages/getFoodByType'
import GetFood from '../pages/getFood'

class RootRoute extends React.Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/Reg' component={Reg}></Route>
                    <Route path='/admin' component={()=>{
                        return(
                            <Admin>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/user' component={User}></Route>
                                <Route path='/admin/user' component={User}></Route>
                                <Route path='/admin/userlist' component={UserList}></Route>
                                <Route path='/admin/logout' component={Logout}></Route>
                                <Route path='/admin/foodadd' component={FoodAdd}></Route>
                                <Route path='/admin/foodupdate' component={FoodUpdate}></Route>
                                <Route path='/admin/fooddel' component={FoodDel}></Route>
                                <Route path='/admin/foodget' component={GetFood}></Route>
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