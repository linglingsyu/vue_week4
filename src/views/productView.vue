<template>
  <div class="container">
    <div class="text-end mt-4">
      <productModal action="add"></productModal>
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
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td class="text-start">{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td :class="[product.is_enabled ? 'text-success' : 'text-danger']">
            {{ product.is_enabled ? '啟用' : '未啟用' }}
          </td>
          <td>
            <!-- <button
              type="button"
              class="btn btn-primary btn-sm me-3"
              @click="openModal('edit', ...product)"
            >
              編輯
            </button> -->
            <productModal
              :key="'Edit' + product.id"
              action="edit"
              :productData="{ ...product }"
            ></productModal>
            <delProductModal
              :productId="product.id"
              :key="'del' + product.id"
            ></delProductModal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productStore from '@/store/productStore.js'
import productModal from '@/components/productModal.vue'
import delProductModal from '@/components/DeleteModal.vue'
export default {
  name: 'productView',
  mounted() {
    this.getProductList()
  },
  components: { productModal, delProductModal },
  methods: {
    ...mapActions(productStore, ['getProductList']),
    openModal(action, data) {
      if (action === 'delete') {
        this.productData = { ...data }
        this.delProductModal.show()
      }
    },
  },
  computed: {
    ...mapState(productStore, ['products']),
  },
}
</script>

<style scoped></style>
