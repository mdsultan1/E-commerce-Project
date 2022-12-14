import {ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_LIST_MY_FAIL,ORDER_LIST_MY_REQUEST,ORDER_LIST_MY_SUCCESS} from "../constants/orderConstants"

import axios from "axios"

export const createOrder = (order) => async (dispatch,getState) =>{

    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin:{userInfo}} = getState()
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })


        }catch(error){
            console.log("problem in acvtion")
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload:
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
              })

        }
}
export const listMyOrders = () => async (dispatch,getState) =>{

    try{
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {userLogin:{userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.get(`/api/orders/myorders`, config)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })


        }catch(error){
            dispatch({
                type: ORDER_LIST_MY_FAIL,
                payload:
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
              })

        }
}