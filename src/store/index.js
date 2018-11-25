import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'
Vue.use(Vuex)

export default new Vuex.Store({
  state: { // data{}
    products: [],
    // {id, quantity}
    cart: [],
    checkoutStatus: null
  },

  getters: { // computed properties
    productsCount () {
      // length of productsArray
    },
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },
    cartProducts (state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.quantity * product.price, 0)
    }
  },
  actions: {
    fetchProducts ({
      commit
    }) {
      // make api call to get products
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
      // run setProduct mutation here
    },
    addProductToCart ({
      commit,
      state
    }, product) {
      if (product.inventory > 0) {
        const cartItem = state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product.id)
          // the product that we are adding to the cart has not been added to the cart before
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    },
    checkout ({
      state,
      commit
    }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }
  },
  mutations: {
    // SETTING UPDATING STATES SHOULD BE REALLY SIMPLE!!
    setProducts (state, products) {
      state.products = products
    },
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory (state, product) {
      product.inventory--
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },
    emptyCart (state) {
      state.cart = []
    }
  }
})
