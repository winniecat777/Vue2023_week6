import{p as x}from"./paginationComponent-q2MQv_9Z.js";import{M as k}from"./modal-2ylS1hHs.js";import{_ as v,r as f,o as a,c as d,b as e,t as h,d as u,w as y,R as b,L as I,X as $,F as g,I as M}from"./index-Mm90-rHe.js";const V={data(){return{modal:null,tempCouponInfo:{},due_date:""}},props:["couponInfo","isNew"],watch:{couponInfo(){this.tempCouponInfo=this.couponInfo;const n=new Date(this.couponInfo.due_date*1e3).toISOString().split("T");this.due_date=n[0]},due_date(){const n=new Date(this.due_date);this.tempCouponInfo.due_date=Math.floor(n/1e3)}},methods:{openModal(){this.modal.show()},closeModal(){this.modal.hide()}},mounted(){this.modal=new k(this.$refs.adminCouponModal,{keyboard:!1,backdrop:"static"})}},L={class:"modal",tabindex:"-1",ref:"adminCouponModal"},N={class:"modal-dialog modal-lg modal-dialog-centered"},B={class:"modal-content"},T={class:"modal-header"},q={key:0,class:"modal-title fw-bold"},D={key:1,class:"modal-title fw-bold"},E=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),U={class:"modal-body"},S=e("label",{for:"title",class:"form-label fw-bold has-required"},"優惠券標題",-1),A=e("label",{for:"code",class:"form-label fw-bold has-required"},"優惠碼",-1),P=e("span",{class:"ms-2 text-info fs-info"},"建立後無法更改",-1),R=e("label",{for:"discound",class:"form-label fw-bold has-required"},"訂單折扣百分比",-1),O=e("span",{class:"ms-2 text-info fs-info"},"建立後無法更改",-1),j=e("label",{for:"due_date",class:"form-label fw-bold has-required"},"優惠到期日",-1),F={class:"form-check form-switch"},G={class:"form-check-label",for:"is_enabled"},H={key:0},z={key:1},X={class:"d-flex justify-content-end gap-2 pt-3"};function J(n,t,s,r,o,l){const p=f("v-field"),m=f("error-message"),c=f("v-form");return a(),d("div",L,[e("div",N,[e("div",B,[e("div",T,[s.isNew?(a(),d("h5",q,"建立優惠券")):(a(),d("h5",D,"優惠券："+h(o.tempCouponInfo.code),1)),E]),e("div",U,[u(c,{class:"d-flex flex-column gap-3"},{default:y(({errors:_})=>[e("div",null,[S,u(p,{class:b(["form-control",{"is-invalid":_.title}]),type:"text",placeholder:"請輸入標題",modelValue:o.tempCouponInfo.title,"onUpdate:modelValue":t[0]||(t[0]=i=>o.tempCouponInfo.title=i),id:"title",name:"title",rules:"required"},null,8,["modelValue","class"]),u(m,{name:"title",class:"invalid-feedback"})]),e("div",null,[A,P,u(p,{class:b(["form-control",{"is-invalid":_.code}]),placeholder:"請輸入 6-24 個字元內的英數組合優惠碼",modelValue:o.tempCouponInfo.code,"onUpdate:modelValue":t[1]||(t[1]=i=>o.tempCouponInfo.code=i),id:"code",name:"code",rules:"required|alpha_num|max:24|min:6",disabled:!s.isNew},null,8,["modelValue","class","disabled"]),u(m,{name:"code",class:"invalid-feedback"})]),e("div",null,[R,O,u(p,{class:b(["form-control",{"is-invalid":_.code}]),type:"number",placeholder:"請輸入 1-99",modelValue:o.tempCouponInfo.percent,"onUpdate:modelValue":t[2]||(t[2]=i=>o.tempCouponInfo.percent=i),modelModifiers:{number:!0},id:"discount",name:"discount",rules:"required|between:1,99",disabled:!s.isNew},null,8,["modelValue","class","disabled"]),u(m,{name:"discount",class:"invalid-feedback"})]),e("div",null,[j,u(p,{class:b(["form-control",{"is-invalid":_.due_date}]),type:"date",placeholder:"請設定日期",modelValue:o.due_date,"onUpdate:modelValue":t[3]||(t[3]=i=>o.due_date=i),id:"due_date",name:"due_date",rules:"required"},null,8,["modelValue","class"]),u(m,{name:"due_date",class:"invalid-feedback"})]),e("div",F,[I(e("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"is_enabled",checked:"","onUpdate:modelValue":t[4]||(t[4]=i=>o.tempCouponInfo.is_enabled=i),"true-value":1,"false-value":0},null,512),[[$,o.tempCouponInfo.is_enabled]]),e("label",G,[o.tempCouponInfo.is_enabled?(a(),d("span",H,"更改為未啟用")):(a(),d("span",z,"更改為已啟用"))])]),e("div",X,[e("button",{type:"button",class:"btn btn-outline-dark",onClick:t[5]||(t[5]=(...i)=>l.closeModal&&l.closeModal(...i))},"取消"),e("button",{type:"button",class:"btn btn-dark text-white",onClick:t[6]||(t[6]=i=>this.$emit("updateCoupon",o.tempCouponInfo))},h(s.isNew?"新增優惠券":"更新優惠券"),1)])]),_:1})])])])],512)}const K=v(V,[["render",J]]);var Q={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"winnie05",BASE_URL:"/Vue2023_week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API:C,VITE_PATH:w}=Q,W={data(){return{couponList:[],pagination:{},tempCoupon:{},isNew:!1}},methods:{getCouponList(n=1){const t=`${C}/api/${w}/admin/coupons?page=${n}`;this.axios.get(t).then(s=>{const{coupons:r,pagination:o}=s.data;this.couponList=r,this.pagination=o}).catch(s=>{this.$swal.fire({icon:"error",text:s.response.data.message})})},updateCoupon(n){const t=this.$loading.show();let s=`${C}/api/${w}/admin/coupon`,r="post";this.isNew||(s+=`/${n.id}`,r="put"),this.axios[r](s,{data:n}).then(o=>{this.$swal.fire({title:o.data.message,confirmButtonColor:"#333333",confirmButtonText:"確認"}),this.$refs.adminCouponModal.closeModal(),this.getCouponList()}).catch(o=>{this.$swal.fire({icon:"error",text:o.response.data.message})}).finally(()=>{t.hide()})},showCoupon(n,t){n==="create"&&(this.isNew=!0,this.tempCoupon={title:"",is_enabled:0,percent:null,due_date:new Date().getTime()/1e3,code:""}),n==="edit"&&(this.isNew=!1,this.tempCoupon={...t}),this.$refs.adminCouponModal.openModal()},deleteCoupon(n){const t=`${C}/api/${w}/admin/coupon/${n}`,s=`確定要刪除優惠券 <span class="text-danger">${n}</span> 嗎？`;this.$swal.fire({title:s,text:"請再次確認，以免影響顧客權益",icon:"question",showCancelButton:!0,confirmButtonColor:"#787878",cancelButtonColor:"#333333",cancelButtonText:"取消",confirmButtonText:"確認刪除"}).then(r=>{if(r.isConfirmed){const o=this.$loading.show();this.axios.delete(t).then(l=>{this.$swal.fire({title:l.data.message,confirmButtonColor:"#333333",confirmButtonText:"確認"}),this.getCouponList()}).catch(l=>{this.$swal.fire({icon:"error",text:l.response.data.message})}).finally(()=>{o.hide()})}})}},components:{paginationComponent:x,adminCouponModal:K},mounted(){this.getCouponList()}},Y={class:"overflow-y-scroll scrollbar-y-hide vh-100"},Z={class:"d-flex justify-content-between py-4 py-md-5"},ee=e("h2",{class:"fw-bold"},"優惠券管理",-1),oe={key:0,class:"py-5 text-center"},te={key:1,class:"table align-middle"},ne=e("thead",null,[e("tr",null,[e("th",{class:"d-none d-md-table-cell"},"優惠碼"),e("th",null,"型式"),e("th",null,"到期日"),e("th",null,"狀態"),e("th")])],-1),se={class:"d-none d-md-table-cell"},le={class:"fw-bold"},ie={class:"text-default"},ae={key:0,class:"text-danger"},de={key:1},ce={class:"btn-group align-items-center"},ue=["onClick"],re=e("i",{class:"bi bi-pencil text-default"},null,-1),pe=[re],me=["onClick"],_e=e("i",{class:"bi bi-trash text-danger"},null,-1),he=[_e];function fe(n,t,s,r,o,l){const p=f("paginationComponent"),m=f("adminCouponModal");return a(),d(g,null,[e("div",Y,[e("div",Z,[ee,e("button",{type:"button",class:"btn btn-dark",onClick:t[0]||(t[0]=c=>l.showCoupon("create"))},"建立優惠券")]),e("div",null,[o.couponList.length?(a(),d("table",te,[ne,e("tbody",null,[(a(!0),d(g,null,M(o.couponList,c=>(a(),d("tr",{key:c.id},[e("td",se,h(c.code),1),e("td",null,[e("p",le,h(c.title),1),e("span",ie,"折扣："+h(c.percent)+" %",1)]),e("td",null,h(new Date(c.due_date*1e3).toLocaleString().split(" ")[0]),1),e("td",null,[c.is_enabled?(a(),d("span",ae,"啟用中")):(a(),d("span",de,"未啟用"))]),e("td",null,[e("div",ce,[e("button",{type:"button",class:"btn border-0",onClick:_=>l.showCoupon("edit",c)},pe,8,ue),e("button",{type:"button",class:"btn border-0",onClick:_=>l.deleteCoupon(c.id)},he,8,me)])])]))),128))])])):(a(),d("p",oe,"目前沒有優惠券")),u(p,{pagination:o.pagination,onGetList:l.getCouponList},null,8,["pagination","onGetList"])])]),u(m,{isNew:o.isNew,couponInfo:o.tempCoupon,ref:"adminCouponModal",onUpdateCoupon:l.updateCoupon},null,8,["isNew","couponInfo","onUpdateCoupon"])],64)}const ge=v(W,[["render",fe]]);export{ge as default};
