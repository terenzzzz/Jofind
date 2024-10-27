<template>
  <nav id="navbar" class="navbar navbar-expand-lg py-2  m-0 sticky-top">
    <div class="container-fluid">
      <router-link
        class="navbar-brand fs-3 fw-bold primary text-decoration-none d-flex align-items-center"
        to="/"
      >
        <img src="@/assets/logo.png" class="img-fluid" style="width: 150px">
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-row-reverse" id="collapsibleNavbar">
        <ul class="navbar-nav d-flex align-items-center">
          <li class="nav-item ">
            <router-link to="/message" class="item text-decoration-none text-primary position-relative">
              Message
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  99+
                  <span class="visually-hidden">unread messages</span>
                </span>
            </router-link>
          </li>

          <li class="nav-item ">
            <router-link to="/me" class="item text-decoration-none text-primary">
              Terence
            </router-link>
          </li>



<!--          <li class="nav-item ">-->
<!--            <router-link to="/login" class="item text-decoration-none text-primary">-->
<!--              Login-->
<!--            </router-link>-->
<!--          </li>-->

<!--          <li class="nav-item">-->
<!--            <router-link to="/signup" class="item text-decoration-none btn btn-primary text-white">-->
<!--              Get Started-->
<!--            </router-link>-->
<!--          </li>-->



<!--          <li class="nav-item">-->
<!--            <a href="javascript:void(0);" class="item">-->
<!--              <img src="@/assets/country/cn.png" alt="Language Flag" style="width: 32px"/>-->
<!--            </a>-->
<!--          </li>-->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

</script>

<style lang="css" scoped>
#navbar{
  background-color: rgba(247, 247, 248, 0.7);
}

.item {
  color: black;
  font-size: 20px;
  margin-inline: 14px;
}

.navbar-nav .nav-item {
  padding: 10px;
}


</style>
