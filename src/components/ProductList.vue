<template>
<div>
  <h1>Product List</h1>
  <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="">
  <ul v-else>
    <li v-for="product in products">{{product.title}} - {{product.price | currency}} - {{product.inventory}}
      <button @click="addToCart(product)" :disabled="!productsIsInStock(product)">Add product to cart</button>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    productsIsInStock () {
      return this.$store.getters.productsIsInStock
    }
  },
  methods: {
    addToCart (product) {
      this.$store.dispatch('addProductToCart', product)
    }
  },
  async created () {
    this.loading = true
    const productFetch = await this.$store.dispatch('fetchProducts')
    this.loading = false
    console.log(productFetch)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
