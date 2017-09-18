/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { isEqual } from 'lodash'
import React, { Component, PropTypes } from 'react'
import TextField from 'react-md/lib/TextFields'
import FontIcon from 'react-md/lib/FontIcons'
import styles from './style.css'
import { NUMBER, TEXT } from '../return-types'

export default class ColumnMenuInput extends Component {
  static displayName = 'ColumnMenuInput'

  static propTypes = {
    columnIndex: PropTypes.number.isRequired,
    context: PropTypes.object,
    match: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.any
  }

  constructor (props) {
    super(props)
    const { value } = props
    this.state = {
      value
    }
  }

  componentWillReceiveProps = nextProps => {
    if (!isEqual(this.props.value, nextProps.value)) {
      if (nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value })
      }
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return false
  }

  componentDidMount = () => {
    this._field.focus()
  }

  componentWillUpdate = () => {
    this._field.focus()
  }

  onInputChange = value => {
    const { columnIndex, context } = this.props
    this.setState({ value })
    this.props.onSelect(value, columnIndex, context, true)
  }

  render () {
    const { context } = this.props
    const type = context.constructor.inputType
    let input
    switch (type) {
      case NUMBER:
        input = (
          <TextField
            id='input-text-context-cmc'
            type='number'
            defaultValue={this.state.value}
            label={`Enter ${type} here`}
            onChange={this.onInputChange}
            helpText='Text entered here will be stored as a number'
            ref={field => {
              this._field = field
            }}
          />
        )
        break
      case TEXT:
        input = (
          <TextField
            id='input-text-context-cmc'
            type='text'
            defaultValue={this.state.value}
            label={`Enter ${type} here`}
            onChange={this.onInputChange}
            helpText='Text entered here will be stored exactly as it is entered without any conversion.'
            ref={field => {
              this._field = field
            }}
          />
        )
        break
      default:
        throw new Error('Unknown/unsupported input type')
    }

    return (
      <div
        className={styles['col-input']}
        key={context.hash()}
        data-test={context.toString()}
      >
        <div className={styles['col-input-hdr']}>
          <FontIcon className={styles.icon}>keyboard</FontIcon>
          <div>Input</div>
        </div>
        <div className={styles.body}>
          {input}
        </div>
      </div>
    )
  }
}
