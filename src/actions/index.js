import axios from 'axios';
import {
    USER_LOGIN_SUCCESS, 
    USER_NOT_FOUND, 
    LOGIN_SYSTEM_ERROR,
    LOGIN_LOADING, LOGOUT,
    REGISTER_LOADING,
    COOKIE_CHECKED,
    HARUS_DIISI,
    USERNAME_TIDAK_TERSEDIA,
    ADD_TO_CART,
    ADD_TO_CART_FAILED,
    DELETE_CART,
    DELETE_CART_FAILED,
    ADD_TO_ADDRESS,
    ADD_TO_ADDRESS_FAILED,
    ADD_TO_ORDER,
    ADD_TO_ORDER_FAILED,
    UPDATE_TO_CART,
    UPDATE_TO_CART_FAILED
} from './types';
export const onUserLogout=()=>{
    return{type: LOGOUT }
}
export const keepLogin =(username)=>{
    return(dispatch)=> {
        axios.get('http://localhost:2000/keeplogin',{
            params:{
                username
            }
        }).then((res)=>{
            if(res.data.length > 0 ){
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: username
                })
            }
        })
    }
}
export const cookieChecked =()=>{
    return{type: COOKIE_CHECKED }
}
export const onUserLogin = ({username, password}) =>{
    return(dispatch)=>{
        if(username == '' || password == ''){
            return dispatch({type : HARUS_DIISI})
        }
        dispatch({type: LOGIN_LOADING})
        axios.post('http://localhost:2000/login', {
            username,
            password
        }).then((res)=> {
            console.log(res)
            if(res.data.length>0){
                dispatch({type: USER_LOGIN_SUCCESS, payload: username})
            }else{
                dispatch({type: USER_NOT_FOUND})
            }
        }).catch((err)=>{
            console.log(err)
            dispatch({type: LOGIN_SYSTEM_ERROR})
        }) 
    }
}
export const onUserRegister = ({username,email,phone, password})=>{
    return (dispatch)=>{
        dispatch({type: REGISTER_LOADING})
        if(username ==='' || password == '' || phone == ''||email==''){
            dispatch({type: HARUS_DIISI})
        }else{
            axios.get('http://localhost:2000/usercheck',{
                params:{
                    username
                }
            }).then((res)=>{
                if(res.data.length === 0 ){
                    axios.post('http://localhost:2000/register', {
                    username, email, password, phone
                    }).then((res)=>{
                        console.log(res)
                        dispatch({type: USER_LOGIN_SUCCESS, payload: username})
                    }).catch((err)=>{
                        console.log(err);
                        dispatch({type: LOGIN_SYSTEM_ERROR})
                    })
                }else{
                    dispatch({type: USERNAME_TIDAK_TERSEDIA})
                }
            }).catch((err)=>{
                dispatch({type: LOGIN_SYSTEM_ERROR})
            })
            
        }
        
    }
}
export const addToCart = ({username, id_product,numberInput,now}) =>{
    return(dispatch)=>{
        dispatch({type: LOGIN_LOADING})
        axios.get('http://localhost:2000/cartcheck',{
            params:{
                id_product
            }
        }).then((res)=>{
            if(res.data.length === 0 ){
                axios.post('http://localhost:2000/addToCart', {
                    username,
                    id_product,
                    qty:numberInput,
                    date:now
                }).then((res)=> {
                    console.log(res)
                    dispatch({type: ADD_TO_CART})
                }).catch((err)=>{
                    console.log(err)
                    dispatch({type: ADD_TO_CART_FAILED})
                }) 
            }else{
                console.log(res.data[0].qty)
                var input = parseInt(numberInput)
                var lastinput = parseInt(res.data[0].qty)
                var qty = input+lastinput
                axios.post('http://localhost:2000/updateToCart', {
                    id_product, qty
                }).then((res)=> {
                    console.log(res)
                    dispatch({type: UPDATE_TO_CART})
                }).catch((err)=>{
                    console.log(err)
                    dispatch({type: UPDATE_TO_CART_FAILED})
                }) 
            }
        }).catch((err)=>{
            dispatch({type: ADD_TO_CART_FAILED})
            console.log(err)
        })
        
    }
}

export const DeleteCart = (id_product) =>{
    return(dispatch)=>{
        dispatch({type: LOGIN_LOADING})
        axios.post('http://localhost:2000/deleteCart', {
           id_product
        }).then((res)=> {
            console.log(res)
            dispatch({type: DELETE_CART})
        }).catch((err)=>{
            console.log(err)
            dispatch({type: DELETE_CART_FAILED})
        }) 
    }
}
export const addToAddress = ({username,firstName,lastName,address,address2, kota,profinsi,kodepos}) =>{
    return(dispatch)=>{
        dispatch({type: LOGIN_LOADING})
        axios.post('http://localhost:2000/addToAddress', {
            username,firstName,lastName,address,address2, kota,profinsi,kodepos
        }).then((res)=> {
            console.log(res)
            dispatch({type: ADD_TO_ADDRESS})
        }).catch((err)=>{
            console.log(err)
            dispatch({type: ADD_TO_ADDRESS_FAILED})
        }) 
    }
}
export const addToOrder = ({username, id_produk, qty, date}) =>{
    return(dispatch)=>{
        dispatch({type: LOGIN_LOADING})
        axios.post('http://localhost:2000/addToOrder', {
            username, id_product: id_produk, qty, date, status:'pending'
        }).then((res)=> {
            console.log(res)
            dispatch({type: ADD_TO_ORDER})
        }).catch((err)=>{
            console.log(err)
            dispatch({type: ADD_TO_ORDER_FAILED})
        }) 
    }
}
export const deleteCartFromCheckout = (username) =>{
    return(dispatch)=>{
        dispatch({type: LOGIN_LOADING})
        axios.post('http://localhost:2000/deleteCartFromCheckout', {
           username
        }).then((res)=> {
            console.log(res)
            dispatch({type: DELETE_CART})
        }).catch((err)=>{
            console.log(err)
            dispatch({type: DELETE_CART_FAILED})
        }) 
    }
}
