'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

var StepModel = function () {
  function StepModel() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, StepModel);

    var _constructor = this.constructor,
        displayName = _constructor.displayName,
        type = _constructor.type;

    this.name = data.name || displayName;
    this.type = type;
    this._id = data._id;
  }

  _createClass(StepModel, [{
    key: 'validate',
    value: function validate() {
      return true;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      throw new Error('Not yet implemented');
    }
  }]);

  return StepModel;
}();

StepModel.displayName = 'BaseStepModel';
StepModel.type = 'base-step-model';
exports.default = StepModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAtbW9kZWxzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlN0ZXBNb2RlbCIsImRhdGEiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwidHlwZSIsIm5hbWUiLCJfaWQiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztJQVFxQkEsUztBQUluQix1QkFBd0I7QUFBQSxRQUFYQyxJQUFXLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUEsdUJBQ1EsS0FBS0MsV0FEYjtBQUFBLFFBQ2RDLFdBRGMsZ0JBQ2RBLFdBRGM7QUFBQSxRQUNEQyxJQURDLGdCQUNEQSxJQURDOztBQUV0QixTQUFLQyxJQUFMLEdBQVlKLEtBQUtJLElBQUwsSUFBYUYsV0FBekI7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRSxHQUFMLEdBQVdMLEtBQUtLLEdBQWhCO0FBQ0Q7Ozs7K0JBRVc7QUFDVixhQUFPLElBQVA7QUFDRDs7OzZCQUVTO0FBQ1IsWUFBTSxJQUFJQyxLQUFKLENBQVUscUJBQVYsQ0FBTjtBQUNEOzs7Ozs7QUFqQmtCUCxTLENBQ1pHLFcsR0FBYyxlO0FBREZILFMsQ0FFWkksSSxHQUFPLGlCO2tCQUZLSixTIiwiZmlsZSI6InN0ZXAtbW9kZWxzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IMKpIDIwMTYgS3VhbGksIEluYy4gLSBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKiBZb3UgbWF5IHVzZSBhbmQgbW9kaWZ5IHRoaXMgY29kZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEt1YWxpLCBJbmMuXG4gKiBQcmUtUmVsZWFzZSBMaWNlbnNlIEFncmVlbWVudC4gWW91IG1heSBub3QgZGlzdHJpYnV0ZSBpdC5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBLdWFsaSwgSW5jLiBQcmUtUmVsZWFzZSBMaWNlbnNlXG4gKiBBZ3JlZW1lbnQgd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgcGxlYXNlIHdyaXRlIHRvIGxpY2Vuc2VAa3VhbGkuY28uXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcE1vZGVsIHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0Jhc2VTdGVwTW9kZWwnXG4gIHN0YXRpYyB0eXBlID0gJ2Jhc2Utc3RlcC1tb2RlbCdcblxuICBjb25zdHJ1Y3RvciAoZGF0YSA9IHt9KSB7XG4gICAgY29uc3QgeyBkaXNwbGF5TmFtZSwgdHlwZSB9ID0gdGhpcy5jb25zdHJ1Y3RvclxuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCBkaXNwbGF5TmFtZVxuICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICB0aGlzLl9pZCA9IGRhdGEuX2lkXG4gIH1cblxuICB2YWxpZGF0ZSAoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHRvSlNPTiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgeWV0IGltcGxlbWVudGVkJylcbiAgfVxufVxuIl19