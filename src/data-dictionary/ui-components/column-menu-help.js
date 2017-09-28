/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'
import Button from 'react-md/lib/Buttons'

export default class ColumnMenuColumnHelp extends Component {
  static displayName = 'ColumnMenuColumnHelp'

  static propTypes = {
    help: PropTypes.string.isRequired,
    scroll: PropTypes.func.isRequired
  }

  render () {
    const { help, scroll } = this.props
    return (
      <div key='help' className={styles['col-help']}>
        {help}
        <p style={{ textAlign: 'right' }}>
          <Button icon onClick={scroll}>arrow_forward</Button>
        </p>
      </div>
    )
  }
}
