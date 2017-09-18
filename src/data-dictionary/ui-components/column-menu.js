/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { Component, PropTypes } from 'react'
import styles from './style.css'
import ColumnMenuColumn from './column-menu-column'
import ColumnMenuHelp from './column-menu-help'
import ColumnMenuInput from './column-menu-input'
import Loading from './loading-animation'
import { ContextUtil } from '../context-utils'

const COL_WIDTH = 180
export const EASE_OUT_QUAD = t => t * (2 - t)

export default class ColumnMenu extends Component {
  static propTypes = {
    'data-test': PropTypes.string,
    help: PropTypes.string,
    match: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    onSelect: PropTypes.func.isRequired,
    root: PropTypes.object.isRequired,
    value: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      columns: [],
      isLoading: false
    }
  }

  componentWillMount () {
    this.getColumns(this.props)
  }

  componentWillReceiveProps (next) {
    const lastV = this.props.value
    const nextV = next.value
    if (lastV === nextV) {
      // do nothing
    } else if (!nextV || !lastV) {
      this.getColumns(next)
    } else if (lastV.isEqual(nextV)) {
      // do nothing
    } else this.getColumns(next)
  }

  componentDidUpdate () {
    this.scroll()
  }

  onSelect = (value, columnIndex, context, matchy) => {
    let item
    if (context.constructor.inputType) {
      context.setData(value)
      item = context
    } else {
      item = value
    }
    this.props.onSelect(item, columnIndex, context, matchy)
  }

  // TODO: fix flicker by creating a synchronous version of getColumns
  getColumns = async props => {
    try {
      const { help, root, value } = props
      this.setState({ isLoading: true })
      const columns = value
        ? await this.getColumnsForValue(value)
        : [await this.getColumnForContext(root)]
      if (help) columns.unshift(this.getHelpColumn(help, this.scroll))
      this.setState({ columns, isLoading: false })
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

  getColumnsForValue = async (value, scroll) => {
    const valueList = ContextUtil.contextToArray(value)
    const columns = valueList.map(async (v, index) => {
      const col = this.getColumnForContext(v.parent, index, v)
      return col
    })
    const last = valueList[valueList.length - 1]
    const next = this.getColumnForContext(last, columns.length)
    if (next) columns.push(next)
    return Promise.all(columns)
  }

  getColumnForContext = async (ctx, index = 0, value) => {
    if (ctx.constructor.inputType) {
      return this.getColumnForContextInput(ctx, index, value)
    } else if (ctx.isLeaf() === true) return
    return this.getColumnForContextChildren(ctx, index, value)
  }

  getColumnForContextChildren = async (ctx, index, value) => {
    const items = await ctx.getChildren()
    return (
      <ColumnMenuColumn
        key={ctx.toString()}
        columnIndex={index}
        context={ctx}
        children={items}
        match={this.props.match}
        onSelect={this.onSelect}
        selected={value}
      />
    )
  }

  getColumnForContextInput = async (ctx, index, value) => {
    return (
      <ColumnMenuInput
        key={ctx.toString()}
        columnIndex={index}
        context={ctx}
        match={this.props.match}
        onSelect={this.onSelect}
        value={ctx.data}
      />
    )
  }

  getHelpColumn = (help, scroll) => {
    return <ColumnMenuHelp help={help} scroll={scroll} />
  }

  /**
   * TODO: cache getChildren calls so that this client can just call getChildren
   * all over the place and the cacher will optimize it
   */
  getChildren = async () => {
    const { root, value } = this.props
    const rootsChildren = await this.getChildrenForContext(root, value)
    const valuesChildren = await this.getValuesChildren(value)
    return { rootsChildren, valuesChildren }
  }

  scroll (target = this.$frame) {
    const { columns } = this.state
    const to = Math.max(0, columns.length * COL_WIDTH - COL_WIDTH)
    const from = target.scrollLeft
    target.scrollTop = 0

    if (Math.abs(from - to) > 3) {
      setTimeout(
        this.scrollAnimation.bind(
          this,
          target,
          'scrollLeft',
          from,
          to,
          800,
          EASE_OUT_QUAD
        ),
        300
      )
    }
  }

  scrollAnimation (
    target,
    attr,
    from,
    to,
    time,
    fn,
    callback,
    onFrame = window.requestAnimationFrame
  ) {
    const dist = to - from
    let start = null

    function step (ts) {
      if (!start) {
        start = ts
      }
      const progress = (ts - start) / time
      const dest = from + fn(progress) * dist
      target[attr] = dest
      if (progress < 1) {
        onFrame(step)
      } else {
        if (callback) {
          callback()
        }
      }
    }
    onFrame(step)
  }

  render () {
    const { columns, isLoading } = this.state

    const content = columns.length === 0 && isLoading ? [<Loading />] : columns

    const width = COL_WIDTH * content.length
    return (
      <div
        data-test={`cm-${this.props['data-test']}`}
        className={styles.frame}
        ref={$el => {
          this.$frame = $el
          return this.$frame
        }}
        style={this.props.style}
      >
        <div
          className={styles.container}
          style={{ width: `${width}px` }}
          children={content}
        />
      </div>
    )
  }
}
