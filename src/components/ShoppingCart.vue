<template>
<div>
  <h1>Shopping cart</h1>
  <ul>
    <li v-if="products.length === 0">There is no item in the shopping cart</li>
    <li v-for="product in products">{{product.title}} - {{product.price | currency}} - {{product.inventory}}
    </li>
  </ul>
  <div>{{cartTotal | currency}}</div>
  <button @click="$store.dispatch('checkout')">Checkout</button>
  <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
</div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.getters.cartProducts
    },
    cartTotal () {
      return this.$store.getters.cartTotal
    }
  },
  methods: {
  }
}
</script>
