import avatar from './avatar.vue'

export default {
  title: 'avatar',
  components: { avatar },
  argTypes: {
    username: {
      control: { type: 'text' }
    },
    text: {
      control: { type: 'text' }
    }
  }
}

const template = (args) => ({
  components: {
    avatar
  },
  data () {
    return {
      args
    }
  },
  template: `
    <avatar :username="args.username" :source="args.source" />
  `
})

export const Default = template.bind({})

Default.args = {
  username: 'user name',
  source: 'https://dummyimage.com/300'
}
