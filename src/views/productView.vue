<template>
  <div class="container">
    <div class="text-end mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('add')">
        建立新的產品
      </button>
    </div>
    <table class="table text-center">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products.list" :key="product.id">
          <td>{{ product.category }}</td>
          <td class="text-start">{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td :class="[product.is_enabled ? 'text-success' : 'text-danger']">
            {{ product.is_enabled ? '啟用' : '未啟用' }}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary btn-sm me-3"
              @click="openModal('edit', product)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="openModal('del', product.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      :nowPage="now"
      :pageTotal="products.pageTotal"
      pageUrl="/product/"
    ></pagination>
  </div>

  <product-modal ref="proModal" :product-data="tempData"></product-modal>
  <delProduct-modal ref="delProModal" :productId="productId"></delProduct-modal>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productStore from '@/store/productStore.js'
import productModal from '@/components/productModal.vue'
import delProductModal from '@/components/deleteModal.vue'
import pagination from '@/components/pagination.vue'
export default {
  name: 'productView',
  data() {
    return {
      now: this.$route.params.page,
      tempData: { imagesUrl: [] },
      productId: null,
    }
  },
  mounted() {
    this.changePage(this.$route.params.page)
    this.getProductList()
  },
  components: { productModal, delProductModal, pagination },
  methods: {
    ...mapActions(productStore, ['getProductList']),
    openModal(action, data) {
      if (action === 'edit') {
        this.tempData = data
      } else if (action === 'del') {
        this.productId = data
      }
      if (action !== 'del') {
        this.$refs.proModal.openModal(action)
      } else {
        this.$refs.delProModal.openModal()
      }
    },
  },
  computed: {
    ...mapState(productStore, ['products', 'changePage', 'nowPage']),
  },
  watch: {
    $route(to, from) {
      this.now = to.params.page
      this.changePage(to.params.page)
    },
  },
}
</script>
