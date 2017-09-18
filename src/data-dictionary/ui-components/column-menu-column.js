/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { Component, PropTypes } from 'react'
import styles from './style.css'
import { Icon, TextField } from 'kuali-ui'
import ListItem from 'react-md/lib/Lists/ListItem'
import Menu from 'react-md/lib/Menus/Menu'

export default class ColumnMenuColumn extends Component {
  static displayName = 'ColumnMenuColumn'

  static propTypes = {
    children: PropTypes.array.isRequired,
    columnIndex: PropTypes.number.isRequired,
    context: PropTypes.object,
    filterText: PropTypes.string,
    match: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
    onFilter: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.object
  }

  getItems = prefix => {
    const {
      children,
      columnIndex,
      context,
      match,
      onSelect,
      selected
    } = this.props
    if (!children || children.length === 0) this.getEmptyItem(prefix)
    return children.map((item, index) => {
      const key = `${prefix}-${index}`
      const active = item.isEqual(selected)
      const matchy = item.matches(match)
      const matchIcon = matchy ? <Icon name='check' /> : undefined
      return (
        <ListItem
          data-test={key}
          key={key}
          active={active}
          primaryText={item.name}
          secondaryText={item.type}
          rightIcon={matchIcon}
          className={styles[active ? 'col-item--active' : 'col-item']}
          tileClassName={styles['col-item-tile']}
          onClick={() => onSelect(item, columnIndex, context, matchy)}
        />
      )
    })
  }

  getEmptyItem = prefix => {
    const key = `${prefix}-none`
    return (
      <ListItem
        key={key}
        disabled
        primaryText='none'
        className={styles['col-item-none']}
      />
    )
  }

  noop = () => {}

  render () {
    const { columnIndex, context, filterText, onFilter } = this.props
    const key = `cmc-${columnIndex}`
    const items = this.getItems(key)

    return (
      <div className={styles.col} key={key} data-test={key}>
        <header className={styles['col-hdr']}>{context.name}</header>
        <div className={styles['col-filter']}>
          <Icon name='search' className={styles['col-filter-icon']} />
          <TextField
            key='filter-field'
            id='filter-field'
            placeholder='Filter'
            value={filterText}
            onChange={onFilter}
            fullWidth={false}
            className={styles['col-filter-textfield']}
          />
        </div>
        <Menu
          isOpen
          fullWidth
          className={styles['col-menu']}
          listClassName={styles['col-menu-list']}
          onClose={this.noop}
        >
          {items}
        </Menu>
      </div>
    )
  }
}
