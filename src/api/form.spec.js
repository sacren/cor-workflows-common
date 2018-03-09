/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Form from './form'

describe('Form API', () => {
  let form
  beforeEach(() => {
    form = new Form()
    form._get = jest.fn()
  })

  test('listForm', async () => {
    form._get.mockReturnValue([
      { _id: 123, label: 'label1', foo: 'bar' },
      { _id: 567, label: 'label2', foo: 'baz' }
    ])
    const filter = 'bar'
    const results = await form.list(filter)
    expect(form._get).toHaveBeenCalledWith(
      `${Form.FORM_API}/form-containers?limit=20&q=bar`
    )
    expect(results).toMatchObject([
      { _id: 123, lbl: 'label1' },
      { _id: 567, lbl: 'label2' }
    ])
  })

  test('getForm', async () => {
    const formData = { id: 123 }
    await form.getForm(formData)
    expect(form._get).toHaveBeenCalledWith(
      `${Form.FORM_API}/form-containers/123`
    )
  })

  test('getSchema', async () => {
    const formData = { id: 123 }
    await form.getSchema(formData)
    expect(form._get).toHaveBeenCalledWith(
      `${Form.FORM_API}/form-containers/123/forms/current/schema?includeJsTypes=true`
    )
  })

  test('getDocument', async () => {
    await form.getDocument(999)
    expect(form._get).toHaveBeenCalledWith(`${Form.FORM_API}/documents/999`)
  })

  test('load', async () => {
    const schema = {
      schema: {
        foo: { jsType: 'string', type: 'fooType' },
        bar: { jsType: { id: 'UserId' }, type: 'barType' }
      }
    }
    form._get.mockReturnValue(schema)
    const formData = { id: 777 }
    const loadedForm = await form.load(formData)
    expect(form._get).toHaveBeenCalledWith(
      `${Form.FORM_API}/form-containers/777/forms/current/schema?includeJsTypes=true`
    )
    expect(loadedForm).toMatchObject({
      schema: {
        foo: { ...schema.foo, type: 'string', displayType: 'fooType' },
        bar: { ...schema.bar, type: 'user', displayType: 'barType' }
      }
    })
  })

  test('loadMany', async () => {
    form.load = jest.fn()
    await form.loadMany([1, 2, 3, 4])
    expect(form.load).toHaveBeenCalledTimes(4)
  })
})
