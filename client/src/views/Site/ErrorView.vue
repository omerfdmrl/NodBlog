<template>
    <div id='oopss'>
    <div id='error-text'>
        <img src="/assets/img/404.svg" :alt="$route.params.code">
        <span>{{ $t('0_error', {code: $route.params.code}) }}</span>
        <router-link :to="{name: 'site-home'}" class="back">{{ $t('back_to_home_page...') }}</router-link>
    </div>
</div>
</template>

<style scoped>
#oopss {
  background: linear-gradient(-45deg, #fff300, #efe400);
  position: fixed;
  left: 0px;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 1.5em;
  z-index: 9999;
}
#oopss #error-text {
  font-size: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Tahoma , sans-serif;
  color: #000;
}
#oopss #error-text img {
  margin: 85px auto 20px;
  height: 342px;
}
#oopss #error-text span {
  position: relative;
  font-size: 3.3em;
  font-weight: 900;
  margin-bottom: 50px;
}
#oopss #error-text .back {
  background: #fff;
  color: #000;
  font-size: 30px;
  text-decoration: none;
  margin: 2em auto 0;
  padding: .7em 2em;
  border-radius: 500px;
  box-shadow: 0 20px 70px 4px rgba(0, 0, 0, 0.1), inset 7px 33px 0 0px #fff300;
  font-weight: 900;
  transition: all 300ms ease;
}
#oopss #error-text .back:hover {
  -webkit-transform: translateY(-13px);
          transform: translateY(-13px);
  box-shadow: 0 35px 90px 4px rgba(0, 0, 0, 0.3), inset 0px 0 0 3px #000;
}

</style>