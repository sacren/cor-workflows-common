import { IS } from '../operators'
import { getMockTextContext, getMockUserContext } from '../test/fake-context'
import { runOperatorTest } from '../test/util'
import { USERS } from '../test/fake-users'

describe('is operator', () => {
  test('boolean boolean', async () => {
    const fn = getMockTextContext.bind(this, true)
    const response = await runOperatorTest(IS, fn, true, fn, true)
    expect(response).toBe(true)
  })

  test('boolean boolean false', async () => {
    const leftFn = getMockTextContext.bind(this, true)
    const rightFn = getMockTextContext.bind(this, false)
    const response = await runOperatorTest(IS, leftFn, true, rightFn, false)
    expect(response).toBe(false)
  })

  test('text text', async () => {
    const fn = getMockTextContext.bind(this, 'test001')
    const response = await runOperatorTest(IS, fn, 'test001', fn, 'test001')
    expect(response).toBe(true)
  })

  test('text text false', async () => {
    const leftFn = getMockTextContext.bind(this, 'test-left')
    const rightFn = getMockTextContext.bind(this, 'test-right')
    const response = await runOperatorTest(
      IS,
      leftFn,
      'test-left',
      rightFn,
      'test-right'
    )
    expect(response).toBe(false)
  })

  test('user user', async () => {
    const fn = getMockUserContext.bind(this, USERS[0])
    const response = await runOperatorTest(IS, fn, USERS[0], fn, USERS[0])
    expect(response).toBe(true)
  })

  test('user user false', async () => {
    const leftFn = getMockUserContext.bind(this, USERS[0])
    const rightFn = getMockUserContext.bind(this, USERS[1])
    const response = await runOperatorTest(
      IS,
      leftFn,
      USERS[0],
      rightFn,
      USERS[1]
    )
    expect(response).toBe(false)
  })
})
