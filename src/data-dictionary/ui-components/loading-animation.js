/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { Component } from 'react'

export default class LoadingAnimation extends Component {
  render () {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 32 32'
        width='32'
        height='32'
        fill='#1565C0'
      >
        <circle transform='translate(8 0)' cx='0' cy='16' r='0'>
          <animate
            attributeName='r'
            values='0; 4; 0; 0'
            dur='1.2s'
            repeatCount='indefinite'
            begin='0'
            keyTimes='0;0.2;0.7;1'
            keySplines='0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8'
            calcMode='spline'
          />
        </circle>
        <circle transform='translate(16 0)' cx='0' cy='16' r='0'>
          <animate
            attributeName='r'
            values='0; 4; 0; 0'
            dur='1.2s'
            repeatCount='indefinite'
            begin='0.3'
            keyTimes='0;0.2;0.7;1'
            keySplines='0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8'
            calcMode='spline'
          />
        </circle>
        <circle transform='translate(24 0)' cx='0' cy='16' r='0'>
          <animate
            attributeName='r'
            values='0; 4; 0; 0'
            dur='1.2s'
            repeatCount='indefinite'
            begin='0.6'
            keyTimes='0;0.2;0.7;1'
            keySplines='0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8'
            calcMode='spline'
          />
        </circle>
      </svg>
    )
  }
}
