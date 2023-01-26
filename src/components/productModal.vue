<template>
  <!-- <button
    type="button"
    class="btn btn-primary btn-sm me-3"
    @click="openModal(productData)"
  >
    編輯
  </button> -->
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ modalTitle }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <label for="imageUrl" class="form-label">上傳主要圖片</label>
                <div class="mb-3 d-flex">
                  <input
                    type="file"
                    name="file-to-upload"
                    class="form-control"
                    accept="image/*"
                    ref="uploadFile"
                    @change="fileChange"
                  />
                  <button
                    type="button"
                    class="ms-2 btn btn-primary"
                    @click="uploadImage"
                  >
                    upload
                  </button>
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model.trim="product.image"
                  />
                </div>
                <img
                  v-if="product.image"
                  class="img-fluid"
                  :src="product.image"
                  alt="主要圖片"
                />
              </div>

              <hr />
              <label class="form-label">輸入副圖圖片網址</label>
              <div class="mb-2">
                <div
                  class="mb-3"
                  v-for="(img, index) in product.imagesUrl"
                  :key="'img' + index"
                >
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model.trim="product.imagesUrl[index]"
                    :key="'input' + index"
                  />
                  <img
                    v-if="img.length > 0"
                    class="img-fluid"
                    :src="img"
                    alt="圖片"
                  />
                </div>
              </div>
              <div
                v-if="
                  !product?.imagesUrl.length > 0 ||
                  product?.imagesUrl[product.imagesUrl.length - 1].length > 0
                "
              >
                <button
                  type="button"
                  @click="product.imagesUrl.push('')"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                >
                  新增圖片
                </button>
              </div>
              <div v-else>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="product.imagesUrl.pop()"
                >
                  刪除圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model.trim="product.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model.trim="product.category"
                  />
                </div>
                <div class="mb-3 col-md-4">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model.trim="product.unit"
                  />
                </div>
                <div class="mb-3 col-md-4">
                  <label for="stock" class="form-label">庫存</label>
                  <input
                    id="stock"
                    type="number"
                    class="form-control"
                    placeholder="請輸入庫存"
                    min="0"
                    v-model.number="product.stock"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="product.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="product.price"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="product.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="product.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="product.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="submitHandler">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import productStore from '@/store/productStore.js'
import { Modal } from 'bootstrap'
export default {
  name: 'productModal',
  mounted() {
    this.productModal = new Modal(this.$refs.productModal)
  },
  data() {
    return {
      file: null,
      action: null,
      product: {
        stock: '',
        title: '',
        category: '',
        origin_price: '',
        price: '',
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        image: '',
        imagesUrl: [],
      },
      modalTitle: '',
      productModal: null,
    }
  },
  props: ['productData'],
  methods: {
    ...mapActions(productStore, ['updateProduct', 'upload']),
    openModal(action) {
      this.file = null
      this.$refs.uploadFile.value = ''
      this.action = action
      if (action === 'add') {
        this.product = {
          stock: '',
          title: '',
          category: '',
          origin_price: '',
          price: '',
          unit: '',
          description: '',
          content: '',
          is_enabled: 1,
          imageUrl: '',
          imagesUrl: [],
        }
        this.modalTitle = '新增產品'
      } else if (action === 'edit') {
        this.product = { ...this.productData }
        this.modalTitle = '編輯產品'
      }
      this.productModal.show()
    },
    async submitHandler() {
      const res = await this.updateProduct(this.action, this.product)
      if (res.status === 200) {
        this.productModal.hide()
      }
    },
    fileChange(e) {
      this.file = e.target.files[0]
    },
    async uploadImage() {
      if (!this.file) return false
      const formData = new FormData()
      formData.append('file-to-upload', this.file)
      const res = await this.upload(formData)
      if (res.data.success) {
        this.product.image = res.data.imageUrl
      } else {
        alert(res.data.message)
      }
    },
  },
  watch: {
    productData(newVal, oldVal) {
      this.product = newVal
      if (!this.product.imagesUrl) {
        this.product.imagesUrl = []
      }
    },
  },
}
</script>
