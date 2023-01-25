<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <router-link
          class="page-link"
          :to="pageUrl + prev"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>
      <li class="page-item" v-for="page in pageTotal" :key="'page' + page">
        <router-link
          class="page-link"
          :class="{ active: page == nowPage }"
          :to="pageUrl + page"
        >
          {{ page }}
        </router-link>
        <!-- <a class="page-link" :class="{ active: page === nowPage }" href="#">{{
          page
        }}</a> -->
      </li>
      <li class="page-item">
        <router-link class="page-link" :to="pageUrl + next" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: ['nowPage', 'pageTotal', 'pageUrl'],
  computed: {
    prev() {
      return this.nowPage - 1 < 1 ? 1 : this.nowPage - 1
    },
    next() {
      return this.nowPage + 1 > this.pageTotal
        ? this.pageTotal
        : this.nowPage + 1
    },
  },
}
</script>
