import { createStore } from 'vuex';
import getRequest from '../api/getRequest';


export default createStore({
    state:{
        isLoading: true,
        colomnsSort:0,
        formUpdate:false,
        formCreate:false,
        cartUpdate:{},
        columns:[
            {
                id: 1,
                name: "Необработанные",
                backg: "#358ef474",
                cartColor: "#bfe7ff",
                btnText: "Взять в работу",
              },
              {
                id: 2,
                name: "В работе",
                backg: "#f5cb00",
                cartColor: "#fff2bf",
                btnText: "Завершить",
              },
              {
                id: 3,
                name: "Завершённые",
                backg: "#35f47874",
                cartColor: "#bfffd3",
                btnText: "Отправить на доработку",
              }
        ],
        carts:[],
    },
    mutations:{
        GETREQUESTPRODUCT:async(state)=>{
            let array = await getRequest('products');
            array.forEach(element => {
                element = {...element, column: 1}
                state.carts.push(element);
            });
        
            state.isLoading = false;
        },
        DELETECART:(state, payload)=>{
            const array = state.carts;
            state.carts = [];
            array.forEach(element=>{
               if(element.id != payload){
                state.carts.push(element);
               }
               return;
            });
        },
        UPDATECOLUMNSORT:(state, payload)=>{
            state.colomnsSort = payload;
        },
        ONFORMUPDATE:(state, payload)=>{
            state.formUpdate = payload;
        },
        ONFORMCREATE:(state, payload)=>{
            state.formCreate = payload;
        },
        ADDCARTUPDATE:(state, payload)=>{
            state.cartUpdate = payload;
        },
        CARTUPDATE:(state, payload)=>{
            const array = state.carts;
            state.carts = [];
            array.forEach(element=>{
               if(element.id == payload.id){
                element = payload;
               }
            state.carts.push(element);
            });
        },
        CARTCREATE:(state, payload)=>{
            state.carts.push(payload);
        }
    },
   
    actions:{
        startGetRequest({commit}){
            commit("GETREQUESTPRODUCT");
        },
        deleteCart({commit}, payload){
            commit("DELETECART", payload);
        },
        updateColumnSort({commit}, payload){
            commit("UPDATECOLUMNSORT", payload);
        },
        onFormUpdate({commit}, payload){
            commit("ONFORMUPDATE", payload);
        },
        onFormCreate({commit}, payload){
            commit("ONFORMCREATE", payload)
        },
        addCartUpdate({commit}, payload){
            commit("ADDCARTUPDATE", payload);
        },
        cartUpdate({commit}, payload){
            commit("CARTUPDATE", payload);
        },
        cartCreate({commit}, payload){
            commit("CARTCREATE", payload);
        }
    }
})