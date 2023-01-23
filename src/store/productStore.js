import { defineStore } from 'pinia'
import { API, api_path } from '@/helper/api.js'
export default defineStore('productStore', {
  state: () => ({
    productList: [],
  }),
  getters: {
    products: ({ productList }) => {
      return productList
    },
  },
  actions: {
    async getProductList() {
      try {
        const path = `api/${api_path}/admin/products/all`
        const res = await API.get(path)
        this.productList = res.data.products
      } catch (error) {
        console.dir(error)
        alert('error!')
      }
    },
    async updateProduct(action,productData){
      try {
        let path = `api/${api_path}/admin/product`
        let method = 'post'
        if(action === 'edit'){
          path += '/'+data.id
          method = 'put'
          delete data.id
        }
        const res = await API[method](path,{data:productData})
        await this.getProductList()
        return res
      } catch (error) {
        console.dir(error)
        let str = ''
        for (const item of error.response.data.message) {
          str += item + '\n'
        }
        alert(str)
      }
    },
    async delProduct(id) {
      try {
        const path = `/v2/api/${api_path}/admin/product/${id}`
        const res = await API.delete(path)
        console.log(res)
        // this.productList = res.data.products
      } catch (error) {
        console.dir(error)
        alert('error!')
      }
    },
  },
})
