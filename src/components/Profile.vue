<template>
  <div class="page">
    <ul class="navigation">
      <li class="link-wrap">
        <router-link class="link" active-class="active" to="/profile/activities">Activities</router-link>
      </li>
      <li class="link-wrap">
        <router-link class="link" active-class="active" to="/profile/receipts">Receipts</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script></script>
<style scoped>
  .page {
    display: grid;
    grid-column-gap: 80px;
    grid-template-columns: 80px 1fr;
    margin: 100px auto;
    max-width: 1100px;
  }

  .link-wrap {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  .link {
    color: rgba(36, 41, 46, 0.5);
    text-decoration: none;

    &.active {
      color: rgba(36, 41, 46, 1);
      font-weight: 600;
    }
  }
</style>
