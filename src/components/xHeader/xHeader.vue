<template>
  <header class="c-header">
    <a href="https://dianan7.github.io/gitogram/dist/index.html#/"
    ><logo class="logo" @click="$router.push({ name: 'feeds' })"></logo
      ></a>
    <div class="buttons">
      <button class="icon" @click="$router.push({ name: 'feeds' })">
        <icon name="home"></icon>
      </button>
      <button class="avatar icon" @click="$router.push({ name: 'repos' })" v-if="user">
        <avatar
          :avatarUrl="user?.avatar_url"
          :username="user?.login"
          :size="avatar_s"
          ></avatar>
      </button>
      <button v-if="!user" @click="$router.push({ name: 'auth'})">Home</button>
      <button class="icon icon_logout" @click="logout">
        <icon name="exit"></icon>
      </button>
    </div>
  </header>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import { icon } from '../icons'
import { logo } from '../logo'
import { avatar } from '../avatar'
export default {
  name: 'xHeader',
  components: {
    icon,
    logo,
    avatar
  },
  data () {
    return {
      avatar_s: 'avatar_s',
      avatar_m: 'avatar_m',
      avatar_l: 'avatar_l',
      logo_white: 'logo_white',
      logo_black: 'logo_black'
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user

    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      getUser: 'user/getUser'
    })
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang="scss" scoped src="./xHeader.scss"></style>
