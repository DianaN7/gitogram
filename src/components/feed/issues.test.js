import { mount } from '@vue/test-utils'
import feed from './feed'

describe('feed component', () => {
  // 1 test 
  it('do emit of event loadContent', async () => {
    const wrapper = mount(feed)

    await wrapper.find('.toggler__wrap button').trigger('click')

    expect(wrapper.emitted().loadContent.length).toBe(1)
  })

  // 2 test 
  it('отрисует список элементов', async () => {
    const issue = {
      title: 'test-title',
      user: {
        login: 'test-name'
      }
    }

    const wrapper = mount(feed, {
      propsData: {
        issues: Array.from({ length: 6 }).map(x => issue)
      }
    })

    expect(wrapper.find('.comments').exists()).toBe(false)

    await wrapper.find('.toggler__wrap button').trigger('click')

    expect(wrapper.findAll('.comments__item').length).toBe(6)
  })

  // 3 test 
  it('не вызывает событие contentLoaded если внутри есть список issues', async () => {
    const issue = {
      title: 'test-title',
      user: {
        login: 'test-name'
      }
    }

    const wrapper = mount(feed, {
      propsData: {
        issues: Array.from({ length: 6 }).map(x => issue)
      }
    })


    await wrapper.find('.toggler__wrap').trigger('click')

    expect(wrapper.emitted().loadContent).toBeUndefined()
  })
})