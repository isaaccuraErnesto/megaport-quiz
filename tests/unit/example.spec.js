import { shallowMount } from '@vue/test-utils'
import HomeInfo from '@/components/HomeInfo.vue'
import NameEntry from '@/components/NameEntry.vue'
// import EditView from '@/views/EditView.vue'

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

describe('NameEntry.vue', () => {
  it('inputName is defined', () => {
    const wrapper = shallowMount(NameEntry, { propsData: {
      message: 'Hello',
      inputValue: 'Submit',
    } })
    expect(wrapper.vm.inputName).toBeDefined()
  })
})





