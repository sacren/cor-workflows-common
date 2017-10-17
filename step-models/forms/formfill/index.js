'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _contextUtils = require('../../../data-dictionary/context-utils');

var _contextUtils2 = _interopRequireDefault(_contextUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright © 2016 Kuali, Inc. - All Rights Reserved
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may use and modify this code under the terms of the Kuali, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Pre-Release License Agreement. You may not distribute it.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You should have received a copy of the Kuali, Inc. Pre-Release License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Agreement with this file. If not, please write to license@kuali.co.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var i18n = {
  MISSING_FORM: 'Unable to create a Formfill step without a form'
};

var FormfillModel = function (_StepModel) {
  _inherits(FormfillModel, _StepModel);

  function FormfillModel(data) {
    _classCallCheck(this, FormfillModel);

    var _this = _possibleConstructorReturn(this, (FormfillModel.__proto__ || Object.getPrototypeOf(FormfillModel)).call(this, data));

    if (!data || !data.form) {
      throw new Error(i18n.MISSING_FORM);
    }
    _this.meta = {
      form: data.form
    };
    return _this;
  }

  _createClass(FormfillModel, [{
    key: 'toJSON',
    value: function toJSON() {
      var persistable = (0, _lodash.pick)(this, ['_id', 'name', 'type']);
      persistable.meta = {
        form: _contextUtils2.default.deflate(this.meta.form)
      };
      return persistable;
    }
  }]);

  return FormfillModel;
}(_index2.default);

FormfillModel.displayName = 'Formfill';
FormfillModel.type = 'formfill';
exports.default = FormfillModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAtbW9kZWxzL2Zvcm1zL2Zvcm1maWxsL2luZGV4LmpzIl0sIm5hbWVzIjpbImkxOG4iLCJNSVNTSU5HX0ZPUk0iLCJGb3JtZmlsbE1vZGVsIiwiZGF0YSIsImZvcm0iLCJFcnJvciIsIm1ldGEiLCJwZXJzaXN0YWJsZSIsImRlZmxhdGUiLCJkaXNwbGF5TmFtZSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBT0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFUQTs7Ozs7Ozs7O0FBV0EsSUFBTUEsT0FBTztBQUNYQyxnQkFBYztBQURILENBQWI7O0lBSXFCQyxhOzs7QUFJbkIseUJBQWFDLElBQWIsRUFBbUI7QUFBQTs7QUFBQSw4SEFDWEEsSUFEVzs7QUFFakIsUUFBSSxDQUFDQSxJQUFELElBQVMsQ0FBQ0EsS0FBS0MsSUFBbkIsRUFBeUI7QUFDdkIsWUFBTSxJQUFJQyxLQUFKLENBQVVMLEtBQUtDLFlBQWYsQ0FBTjtBQUNEO0FBQ0QsVUFBS0ssSUFBTCxHQUFZO0FBQ1ZGLFlBQU1ELEtBQUtDO0FBREQsS0FBWjtBQUxpQjtBQVFsQjs7Ozs2QkFFUztBQUNSLFVBQU1HLGNBQWMsa0JBQUssSUFBTCxFQUFXLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0IsTUFBaEIsQ0FBWCxDQUFwQjtBQUNBQSxrQkFBWUQsSUFBWixHQUFtQjtBQUNqQkYsY0FBTSx1QkFBSUksT0FBSixDQUFZLEtBQUtGLElBQUwsQ0FBVUYsSUFBdEI7QUFEVyxPQUFuQjtBQUdBLGFBQU9HLFdBQVA7QUFDRDs7Ozs7O0FBcEJrQkwsYSxDQUNaTyxXLEdBQWMsVTtBQURGUCxhLENBRVpRLEksR0FBTyxVO2tCQUZLUixhIiwiZmlsZSI6InN0ZXAtbW9kZWxzL2Zvcm1zL2Zvcm1maWxsL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IMKpIDIwMTYgS3VhbGksIEluYy4gLSBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKiBZb3UgbWF5IHVzZSBhbmQgbW9kaWZ5IHRoaXMgY29kZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEt1YWxpLCBJbmMuXG4gKiBQcmUtUmVsZWFzZSBMaWNlbnNlIEFncmVlbWVudC4gWW91IG1heSBub3QgZGlzdHJpYnV0ZSBpdC5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBLdWFsaSwgSW5jLiBQcmUtUmVsZWFzZSBMaWNlbnNlXG4gKiBBZ3JlZW1lbnQgd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgcGxlYXNlIHdyaXRlIHRvIGxpY2Vuc2VAa3VhbGkuY28uXG4gKi9cbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgU3RlcE1vZGVsIGZyb20gJy4uLy4uL2luZGV4J1xuaW1wb3J0IGN0eCBmcm9tICcuLi8uLi8uLi9kYXRhLWRpY3Rpb25hcnkvY29udGV4dC11dGlscydcblxuY29uc3QgaTE4biA9IHtcbiAgTUlTU0lOR19GT1JNOiAnVW5hYmxlIHRvIGNyZWF0ZSBhIEZvcm1maWxsIHN0ZXAgd2l0aG91dCBhIGZvcm0nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1maWxsTW9kZWwgZXh0ZW5kcyBTdGVwTW9kZWwge1xuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnRm9ybWZpbGwnXG4gIHN0YXRpYyB0eXBlID0gJ2Zvcm1maWxsJ1xuXG4gIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgc3VwZXIoZGF0YSlcbiAgICBpZiAoIWRhdGEgfHwgIWRhdGEuZm9ybSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGkxOG4uTUlTU0lOR19GT1JNKVxuICAgIH1cbiAgICB0aGlzLm1ldGEgPSB7XG4gICAgICBmb3JtOiBkYXRhLmZvcm1cbiAgICB9XG4gIH1cblxuICB0b0pTT04gKCkge1xuICAgIGNvbnN0IHBlcnNpc3RhYmxlID0gcGljayh0aGlzLCBbJ19pZCcsICduYW1lJywgJ3R5cGUnXSlcbiAgICBwZXJzaXN0YWJsZS5tZXRhID0ge1xuICAgICAgZm9ybTogY3R4LmRlZmxhdGUodGhpcy5tZXRhLmZvcm0pXG4gICAgfVxuICAgIHJldHVybiBwZXJzaXN0YWJsZVxuICB9XG59XG4iXX0=