/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

module.exports = {
  apis: {
    cm: {
      serviceAgent: {
        secret: '4439ew8uf23weausdfljho4iuweahfs7023das',
        expire: 60,
        header: 'Authorization',
        tokenPrefix: 'Bearer ',
        disableSingleUse: true
      },
      protocol: 'https',
      host: 'kuali.co',
      forms: { v0: '/api/cm' }
    }
  }
}
