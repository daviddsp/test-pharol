import Vuex from 'vuex'
import axios from 'axios';


const store = () => {
  return new Vuex.Store({
    state: {
      login: false,
      cart: [],
      purchase: {},
      totalStore: null,
    },
    mutations: {
      globalMutation(state, item){
        state[item.atribute] = item.value;
        // console.warn(`${item.atribute}`);
        // console.log(state[item.atribute]);
      },
      logout(state){
        state.login = false
        state.cart = []
        state.purchase = {}
        localStorage.removeItem('email');
        localStorage.removeItem('orderId');
      },
      addItemCart(state, item) {
        // verifficando si existe el producto en el state
        const search = state.cart.find(search => {
          return search.objectID == item.objectID;
        });
        if(search == undefined){
          item.quantity = 1;
          item.sub_total =  item.price * item.quantity;
          state.cart.push(item)
        }else{
          // retorna la posicion del producto en el arreglo
          const search = state.cart.findIndex(search => {
            return search.objectID == item.objectID;
          });
          // se agrega una cantidad al mismo elemento
          state.cart[search].quantity = state.cart[search].quantity + 1;
          state.cart[search].sub_total =  state.cart[search].price  * state.cart[search].quantity;
        }
        state.totalStore = state.cart.reduce((sum, item) => sum + item.sub_total, 0)

      },
      deleteItemCart(state, item) {
        const product = state.cart.find(product => {
          return product.objectID == item.objectID;
        });
        state.cart.splice(state.cart.indexOf(item), 1);
        state.totalStore = state.cart.reduce((sum, item) => sum + item.sub_total, 0)
      },
      deleteQuantityCart(state, item) {
        const search = state.cart.findIndex(search => {
          return search.objectID == item.objectID;
        });
        if (state.cart[search].quantity > 1) {
          state.cart[search].quantity = state.cart[search].quantity - 1;
          state.cart[search].sub_total =  state.cart[search].price  * state.cart[search].quantity;
        }
        state.totalStore = state.cart.reduce((sum, item) => sum + item.sub_total, 0)
      },
      addFieldCart(state, item) {
        const search = state.cart.findIndex(search => {
          return search.objectID == item.objectID;
        });
        if (item.field == 'physical_presentation') {
          // console.warn('entro en el bucle correspondiente');
          state.cart[search].physical_presentation = item.value;
        }
        // console.warn('cambio de campos en el producto');
        // console.log(state.cart[search]);
      },
      updateOrderOnServer(state){
        // console.warn('VERIFICANDO SI EL USUARIO ESTA LOGEADO');
        if (state.login) {
          // console.warn('ACTUALIZANDO CARRO EN EL SERVIDOR');
          let cart = {
            products: state.cart
          }
          axios({
            method: 'PUT',
            url:`https://products.pharol.cl/purchase/update/order/${localStorage.getItem('orderId')}`,
            data: cart
          })
          .then(function(response) {
            console.warn('ACTUALIZANDO EN SERVER');
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
      addImage(state, element){
        const search = state.cart.findIndex(search => {
          return search.objectID == element.objectID;
        });
        // se agrega el objeto file al arreglo
        state.cart[search].recipe = element.recipe;
      },
      deleteImage(state, element){
        const search = state.cart.findIndex(search => {
          return search.objectID == element.objectID;
        });
        // se elimina la propiedad de recipe
        delete state.cart[search].recipe
      },
      addPurchase(state, element){
        state.purchase = element;
      },
      TOTAL_SUM(state){
        console.log(state.cart);
        state.totalStore = state.cart.reduce((sum, item) => sum + item.sub_total, 0)
        console.log(state.totalStore);
      }
    },
    getters: {

    },
  })
}

export default store
