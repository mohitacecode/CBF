// import React from 'react'
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { useDispatch } from "react-redux";
// import * as authActions from "app/auth/store/actions";
// import {showMessage} from "app/store/actions/fuse";
// const CLIENT_ID = "1022018137046-ui6qkdac60vdd4u21sfjau0ihtj59qtk.apps.googleusercontent.com";

// function GoogleBtn(){
//   const [loginState, setloginstate] = React.useState(
//       {
//         isLogined: false,
//         accessToken: ''
//       }
//   )
//   const dispatch = useDispatch();

//   const login =  (response) => {

//     if(response){
//     setloginstate({
//         isLogined: true,
//         accessToken: response.accessToken
//       })
//     }
//     dispatch(authActions.googleLogin(response.accessToken));
//   }

//   const logout = (response) => {
//     setloginstate({
//         isLogined: false,
//         accessToken: ''
//       })
//   }

//   const handleLoginFailure = (response) => {
//     dispatch(showMessage({message: "Failed to log in"}));
//   }

//   const handleLogoutFailure =  (response) => {
//     dispatch(showMessage({message: "Failed to log out"}));
//   }

//     return (
//     <div>
//       { loginState.isLogined ?
//         <GoogleLogout
//           clientId={CLIENT_ID}
//           buttonText='Logout'
//           onLogoutSuccess={ logout }
//           onFailure={ handleLogoutFailure }
//         >
//         </GoogleLogout>: <GoogleLogin
//           clientId={CLIENT_ID}
//           buttonText='Login'
//           onSuccess={ login }
//           onFailure={ handleLoginFailure }
//           cookiePolicy={ 'single_host_origin' }
//           responseType='code,token'
//         />
//       }

//     </div>
//     )
// }

// export default GoogleBtn;
