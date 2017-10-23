module.exports.config = {
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
