<template>
  <div class="overflow-y-scroll scrollbar-y-hide vh-100">
    <h2 class="py-4 py-md-5 fw-bold">訂單編號：{{ tempOrderInfo.id }}</h2>

    <!-- 訂單標籤 -->
    <div class="d-flex gap-2">
      <span class="d-inline-block mb-3 rounded-pill py-1 px-3 border fw-bold"
        :class="tempOrderInfo.is_paid ? 'border-info' : 'border-danger'">
        <span v-if="tempOrderInfo.is_paid" class="text-info">已付款</span>
        <span v-else class="text-danger">未付款</span>
      </span>
      <span class="d-inline-block mb-3 rounded-pill py-1 px-3 border fw-bold"
        :class="tempOrderInfo.is_shipping ? 'border-info' : 'border-danger'">
        <span v-if="tempOrderInfo.is_shipping" class="text-info">已出貨</span>
        <span v-else class="text-danger">未出貨</span>
      </span>
    </div>

    <div class="row g-3">
      <!-- 訂單資訊 -->
      <div class="col-md-7" v-if="tempOrderInfo.products">
        <div class="row flex-column g-3">
          <!-- 訂單細節 -->
          <div class="col">
            <div class="border border-1 rounded">
              <div class="row">
                <div class="col">
                  <div class="p-3">
                    <h3 class="mb-2 fs-5 fw-bold">訂單總金額</h3>
                    <p class="mb-2 fs-2 fw-bold">NT$ {{ tempOrderInfo.total }}</p>
                    <button v-if="!tempOrderInfo.is_paid" class="btn btn-default"
                      @click="updateOrder(tempOrderInfo, 'updatePaid')">更改為「已付款」</button>
                  </div>
                </div>
                <div class="col">
                  <div class="p-3">
                    <h3 class="mb-2 fs-5 fw-bold">商品總數</h3>
                    <p class="mb-2 fs-2 fw-bold">{{ Object.keys(tempOrderInfo.products).length }}</p>
                    <button v-if="!tempOrderInfo.is_shipping" class="btn btn-default"
                      @click="updateOrder(tempOrderInfo, 'updateShipping')">出貨</button>
                  </div>
                </div>
              </div>
              <hr class="m-0">
              <div class="p-3">
                <!-- 商品列表 -->
                <ul class="list-unstyled">
                  <li v-for="item in (tempOrderInfo.products)" :key="item.id" class="mb-3 pb-3 border-bottom">
                    <div class="row">
                      <div class="col-lg-6">
                        <router-link :to="`/productinfo/${item.product.id}`" target="_blank"
                          class="d-flex gap-3 link-hover-decoration fw-bold">
                          <div style="height: 50px" :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                            class="bg-img-contain bg-img-center bg-img-norepeat ratio-1x1">
                          </div>
                          {{ item.product.title }}
                        </router-link>
                      </div>
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-6">
                            <p class="text-end text-lg-start">NT$ {{ item.product.price.toLocaleString() }} x {{ item.qty
                            }}</p>
                          </div>
                          <div class="col-6">
                            <p class="text-end">NT$ {{ item.total.toLocaleString() }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <!-- 訂單金額 -->
                <div class="row fw-bold text-end">
                  <div class="col-xl-6"></div>
                  <div class="col-xl-6">
                    <div class="row">
                      <div class="col">
                        <p class="text-info">小計</p>
                        <p class="text-info">coupon 折抵</p>
                      </div>
                      <div class="col">
                        <p class="text-info">NT$ {{ tempOrderInfo.total.toLocaleString() }}</p>
                        <p class="text-danger">0</p>
                      </div>
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col">
                        <p class="fs-5">總金額</p>
                      </div>
                      <div class="col">
                        <p class="fs-5">NT$ {{ tempOrderInfo.total.toLocaleString() }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="m-0">
              <div class="p-3">
                <h3 class="mb-2 fs-5 fw-bold">顧客備註</h3>
                <p>{{ tempOrderInfo.message }}</p>
              </div>
            </div>
          </div>

          <!-- 訂單紀錄 -->
          <div class="col">
            <div class="p-3 border border-1 rounded">
              <h3 class="mb-2 fs-5 fw-bold">訂單紀錄</h3>
              <ul class="d-flex flex-column gap-3 ps-3">
                <li v-if="tempOrderInfo.shipping_date">
                  <p class="mb-1 text-info fs-info">{{ new Date(tempOrderInfo.shipping_date * 1000).toLocaleString() }}
                  </p>
                  <p class="fw-bold">
                    出貨日期
                  </p>
                </li>
                <li v-if="tempOrderInfo.paid_date">
                  <p class="mb-1 text-info fs-info">{{ new Date(tempOrderInfo.paid_date * 1000).toLocaleString() }}</p>
                  <p class="fw-bold">
                    付款日期
                  </p>
                </li>
                <li>
                  <p class="mb-1 text-info fs-info">{{ new Date(tempOrderInfo.create_at * 1000).toLocaleString() }}</p>
                  <p class="fw-bold">
                    訂單產生
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 客戶資訊 -->
      <div class="col-md-5">
        <div v-if="tempOrderInfo.user" class="row flex-column g-3">
          <div class="col">
            <div class="border border-1 rounded">
              <h3 class="pt-3 px-3 fw-bold fs-5">
                <span class="me-2">
                  <i class="bi bi-person"></i>
                </span>顧客資訊
              </h3>
              <hr>
              <div class="pb-3 px-3">
                <p class="fs-5">{{ tempOrderInfo.user.name }}</p>
                <ul class="text-info list-unstyled">
                  <li>{{ tempOrderInfo.user.email }}</li>
                  <li>{{ tempOrderInfo.user.tel }}</li>
                  <li>{{ tempOrderInfo.user.address }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="border border-1 rounded">
              <h3 class="pt-3 px-3 fw-bold fs-5">
                <span class="me-2">
                  <i class="bi bi-box-seam"></i>
                </span>宅配地址
              </h3>
              <hr>
              <div class="pb-3 px-3">
                <p class="fs-5">{{ tempOrderInfo.user.name }}</p>
                <ul class="text-info list-unstyled">
                  <li>{{ tempOrderInfo.user.address }}</li>
                  <li>{{ tempOrderInfo.user.tel }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <toastComponent :adminOrderState="toastState" :adminOrderAction="doAction"></toastComponent>
</template>

<script>
import { useAllAdminOrderStore } from '@/stores/allAdminOrderStore'
import { mapStores } from 'pinia'
import toastComponent from '@/components/toastComponent.vue'
import { useLoading } from 'vue-loading-overlay'

const $loading = useLoading()
const ordersStore = useAllAdminOrderStore()
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      // 訂單
      tempOrderInfo: {},
      // 訂單動作
      doAction: null,
      // 顯示 toast
      toastState: true
    }
  },
  methods: {
    // 取得該頁訂單資料
    getOrderInfo (id) {
      const order = ordersStore.allOrders.filter(order => order.id === id)

      const tempData = {
        ...order[0],
        hasOwnProperty () {
          return false
        }
      }

      const hasIsShipping = Object.prototype.hasOwnProperty.call(tempData, 'is_shipping')

      if (hasIsShipping) {
        this.tempOrderInfo = order[0]
      } else {
        this.tempOrderInfo = {
          ...order[0],
          is_shipping: false
        }
      }
    },

    // 更改訂單狀態
    updateOrder (item, action) {
      const url = `${VITE_API}/api/${VITE_PATH}/admin/order/${item.id}`

      const questionText = {
        updatePaid: '更改為「已付款」',
        updateShipping: '更改為「已出貨」'
      }

      this.$swal
        .fire({
          title: `確定要更改為${questionText[action]}嗎？`,
          icon: 'question',
          text: '這個動作無法復原',
          showCancelButton: true,
          confirmButtonColor: '#787878',
          cancelButtonColor: '#333333',
          cancelButtonText: '取消',
          confirmButtonText: '確認更改'
        })
        .then((result) => {
          if (result.isConfirmed) {
            // 開啟 loading
            const loader = $loading.show()
            const timestamp = Date.now()

            if (action === 'updatePaid') {
              item.is_paid = !item.is_paid
              item.paid_date = Math.floor(timestamp / 1000)
            }

            if (action === 'updateShipping') {
              item.is_shipping = !item.is_shipping
              item.shipping_date = Math.floor(timestamp / 1000)
            }

            this.axios.put(url, { data: item })
              .then(res => {
                // 提示訊息
                this.toastState = !this.toastState
                this.doAction = action
              })
              .catch(err => {
                this.$swal.fire(err.response.data.message)
              })
              .finally(
                // 關閉 loading
                loader.hide()
              )
          }
        })
    }
  },
  computed: {
    ...mapStores(useAllAdminOrderStore)
  },
  components: {
    toastComponent
  },
  mounted () {
    const id = this.$route.params.id
    this.getOrderInfo(id)
  }
}
</script>
