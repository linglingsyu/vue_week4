# Memo

- 登入成功後進入產品列表頁,將 token 刪除後重新登入,登入成功但 checkLogin 會錯誤？
  => 使用 location.href 讓頁面刷新,否則 api.js 不會重新拿到寫入的 token
- cath 錯誤處理,throw 跟 alert 差別？ throw 用法
