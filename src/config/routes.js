import React from 'react';
import { Routes , Route } from 'react-router-dom';
import Circuit from '../pages/Circuit';
import Home from '../pages/Home';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const currentUser = localStorage.getItem('id')
//   return <Route {...rest} render={props => {
//     return currentUser ? <Component {...rest} {...props} /> : <Redirect to="/login" />
//   }}
//   />
// }

const myRoutes = (props) => (
  
  <Routes>
    <Route path='/' component={<Home/>} />
    <Route path='/circuit/:id' component={<Circuit/>} />

    {/* <Route path='/about' component={About} />
    <PrivateRoute path='/matches' component={Matches} currentUser={props.currentUser} />
    <Route path='/browse' component={Browse} />
    <Route path='/register' component={Register} />
    <PrivateRoute path='/profile/edit' component={EditProfile} currentUser={props.currentUser} />
    <Route path='/login' render={(routeComponentProps) => {
      return <Login
        {...routeComponentProps}
        // more props to come here
        currentUser={props.currentUser}
        storeUser={props.storeUser}
      />
    }} />


    <PrivateRoute path='/profile/:id' component={ViewProfile} currentUser={props.currentUser}  
    />
    
    <PrivateRoute path='/profile' component={Profile} currentUser={props.currentUser} />

    <Route path='/browse' component={Browse} /> */}
    {/* // need another route for a passed in user */}
  </Routes>
)

export default myRoutes;