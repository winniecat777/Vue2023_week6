import { defineStore } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert2'
// import { useLoading } from 'vue-loading-overlay'

// const $loading = useLoading()
const { VITE_API, VITE_PATH } = import.meta.env

export const useAllAdminOrderStore = defineStore('adminOrders', {
  state: () => ({
    // 所有訂單
    allOrders: [],
    // 頁碼
    pagination: {}
  }),
  actions: {
    // 獲取所有訂單
    getAllOrders (page = 1) {
      const url = `${VITE_API}/api/${VITE_PATH}/admin/orders?page=${page}`

      // 返回 promise
      return axios.get(url)
        .then(res => {
          const { orders, pagination } = res.data
          this.allOrders = orders
          this.pagination = pagination

          return res // 要傳回的資料
        })
        .catch(err => {
          swal.fire(
            {
              icon: 'error',
              text: err.response.data.message
            }
          )
        })
    }
  }
})
