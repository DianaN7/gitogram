<template>
  <div class="c-following">
    <div class="loader" v-if="loading">
      <spinner></spinner>
    </div>
    <div class="error" v-else-if="error">{{error}}</div>
    <template v-else>
      <div class="c-following__header">
        <div class="title">Following</div>
        <div class="count">{{starred.length}}</div>
      </div>
      <ul class="following__list">
        <li
          class="following__item"
          v-for="{ id, owner, following} in starred"
          :key="id"
        >
          <subscription
            :username="owner.login"
            :avatarUrl="owner.avatar_url"
            :following="following"
            :type="owner.type"
            :id="id"
            @onFollow="starRepo(id)"
            @onUnFollow="unStarRepo(id)"
          ></subscription>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { spinner } from '../../components/spinner'
import { subscription } from '../../components/subscription'
import { useStore, mapActions } from 'vuex'
import { ref, computed } from 'vue'
export default {
  name: 'Following',
  components: {
    spinner,
    subscription
  },
  setup () {
    const loading = ref(false)
    const error = ref(null)
    const { dispatch, state } = useStore()
    dispatch('starred/fetchStarred')
    const fetchStarred = async () => {
      loading.value = true
      try {
        await dispatch('starred/fetchStarred')
      } catch (e) {
        error.value = e.message
      } finally {
        loading.value = false
      }
    }
    return {
      loading,
      error,
      starred: computed(() => state.starred.data),
      fetchStarred
    }
  },
  methods: {
    ...mapActions({
      starRepo: 'starred/starRepo',
      unStarRepo: 'starred/unStarRepo'
    })
  }
}
</script>

<style src="./following.scss" scoped lang="scss"></style>
