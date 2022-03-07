import { shallowMount } from '@vue/test-utils'
import HomeInfo from '@/components/HomeInfo.vue'

describe('HomeInfo.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'new message'
    const wrapper = shallowMount(HomeInfo, {
      propsData: { message },
    })
    expect(wrapper.text()).toMatch(message)
  })

  it('displays the h2 tag', () => {
    const wrapper = shallowMount(HomeInfo)
    const h2 = wrapper.find('h2')
    expect(h2.exists()).not.toBe(false)
  })
})


