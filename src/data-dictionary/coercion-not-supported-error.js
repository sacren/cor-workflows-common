export default function CoercionNotSupportedError (
  baseType,
  requestedCoerceType,
  valueToCoerce
) {
  Error.captureStackTrace(this, this.constructor)

  this.message = `Cannot coerce ${baseType} into ${
    requestedCoerceType
  }: Operation not supported.`
  this.baseType = baseType
  this.requestedCoerceType = requestedCoerceType
  this.valueToCoerce = valueToCoerce

  this.name = 'CoercionNotSupportedError'
}

CoercionNotSupportedError.prototype = Object.create(Error.prototype)
CoercionNotSupportedError.prototype.constructor = CoercionNotSupportedError
