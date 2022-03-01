import { shallowMount } from '@vue/test-utils'
import HomeInfo from '@/components/HomeInfo.vue'

describe('HomeInfo.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HomeInfo, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
