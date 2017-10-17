'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  INVALID_FORMAT: 'Log Step data has an invalid format',
  MISSING_TEMPLATE: 'Log Steps require a template',
  MISSING_VARIABLES: 'Log Steps require variables'

  /**
   * Creates a log step
   * requires the following params:
   * {
   *   template: 'Took path: {{key}}',
   *   variables: {
   *     key: <context>
   *   }
   * }
   */
};
var LogModel = function (_StepModel) {
  _inherits(LogModel, _StepModel);

  function LogModel(data) {
    _classCallCheck(this, LogModel);

    var _this = _possibleConstructorReturn(this, (LogModel.__proto__ || Object.getPrototypeOf(LogModel)).call(this, data));

    _this.meta = {
      template: data.template,
      variables: data.variables || {}
    };
    return _this;
  }

  _createClass(LogModel, [{
    key: 'validate',
    value: function validate() {
      if (!this.meta) throw new Error(i18n.INVALID_FORMAT);
      var _meta = this.meta,
          template = _meta.template,
          variables = _meta.variables;

      if (!template) throw new Error(i18n.MISSING_TEMPLATE);
      if (!variables) throw new Error(i18n.MISSING_VARIABLES);
    }

    /**
     * Returns the following format
     * {
     *   _id,
     *   name,
     *   type,
     *   meta: {
     *     template: 'Took path: {{key}}',
     *     variables: {
     *       key: <context>
     *     }
     *   }
     * }
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var persistable = (0, _lodash.pick)(this, ['_id', 'name', 'type']);
      var variables = (0, _lodash.mapValues)(this.meta.variables, function (v) {
        return _contextUtils2.default.deflate(v);
      });
      persistable.meta = _extends({}, this.meta, { variables: variables });
      return persistable;
    }
  }]);

  return LogModel;
}(_index2.default);

LogModel.displayName = 'Log';
LogModel.type = 'log';
exports.default = LogModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAtbW9kZWxzL3N5c3RlbS9sb2cvaW5kZXguanMiXSwibmFtZXMiOlsiaTE4biIsIklOVkFMSURfRk9STUFUIiwiTUlTU0lOR19URU1QTEFURSIsIk1JU1NJTkdfVkFSSUFCTEVTIiwiTG9nTW9kZWwiLCJkYXRhIiwibWV0YSIsInRlbXBsYXRlIiwidmFyaWFibGVzIiwiRXJyb3IiLCJwZXJzaXN0YWJsZSIsImRlZmxhdGUiLCJ2IiwiZGlzcGxheU5hbWUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFUQTs7Ozs7Ozs7O0FBV0EsSUFBTUEsT0FBTztBQUNYQyxrQkFBZ0IscUNBREw7QUFFWEMsb0JBQWtCLDhCQUZQO0FBR1hDLHFCQUFtQjs7QUFHckI7Ozs7Ozs7Ozs7QUFOYSxDQUFiO0lBZ0JxQkMsUTs7O0FBSW5CLG9CQUFhQyxJQUFiLEVBQW1CO0FBQUE7O0FBQUEsb0hBQ1hBLElBRFc7O0FBRWpCLFVBQUtDLElBQUwsR0FBWTtBQUNWQyxnQkFBVUYsS0FBS0UsUUFETDtBQUVWQyxpQkFBV0gsS0FBS0csU0FBTCxJQUFrQjtBQUZuQixLQUFaO0FBRmlCO0FBTWxCOzs7OytCQUVXO0FBQ1YsVUFBSSxDQUFDLEtBQUtGLElBQVYsRUFBZ0IsTUFBTSxJQUFJRyxLQUFKLENBQVVULEtBQUtDLGNBQWYsQ0FBTjtBQUROLGtCQUVzQixLQUFLSyxJQUYzQjtBQUFBLFVBRUZDLFFBRkUsU0FFRkEsUUFGRTtBQUFBLFVBRVFDLFNBRlIsU0FFUUEsU0FGUjs7QUFHVixVQUFJLENBQUNELFFBQUwsRUFBZSxNQUFNLElBQUlFLEtBQUosQ0FBVVQsS0FBS0UsZ0JBQWYsQ0FBTjtBQUNmLFVBQUksQ0FBQ00sU0FBTCxFQUFnQixNQUFNLElBQUlDLEtBQUosQ0FBVVQsS0FBS0csaUJBQWYsQ0FBTjtBQUNqQjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBY1U7QUFDUixVQUFNTyxjQUFjLGtCQUFLLElBQUwsRUFBVyxDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE1BQWhCLENBQVgsQ0FBcEI7QUFDQSxVQUFNRixZQUFZLHVCQUFVLEtBQUtGLElBQUwsQ0FBVUUsU0FBcEIsRUFBK0I7QUFBQSxlQUFLLHVCQUFJRyxPQUFKLENBQVlDLENBQVosQ0FBTDtBQUFBLE9BQS9CLENBQWxCO0FBQ0FGLGtCQUFZSixJQUFaLGdCQUF3QixLQUFLQSxJQUE3QixJQUFtQ0Usb0JBQW5DO0FBQ0EsYUFBT0UsV0FBUDtBQUNEOzs7Ozs7QUF0Q2tCTixRLENBQ1pTLFcsR0FBYyxLO0FBREZULFEsQ0FFWlUsSSxHQUFPLEs7a0JBRktWLFEiLCJmaWxlIjoic3RlcC1tb2RlbHMvc3lzdGVtL2xvZy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCDCqSAyMDE2IEt1YWxpLCBJbmMuIC0gQWxsIFJpZ2h0cyBSZXNlcnZlZFxuICogWW91IG1heSB1c2UgYW5kIG1vZGlmeSB0aGlzIGNvZGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBLdWFsaSwgSW5jLlxuICogUHJlLVJlbGVhc2UgTGljZW5zZSBBZ3JlZW1lbnQuIFlvdSBtYXkgbm90IGRpc3RyaWJ1dGUgaXQuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgS3VhbGksIEluYy4gUHJlLVJlbGVhc2UgTGljZW5zZVxuICogQWdyZWVtZW50IHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHBsZWFzZSB3cml0ZSB0byBsaWNlbnNlQGt1YWxpLmNvLlxuICovXG5pbXBvcnQgeyBtYXBWYWx1ZXMsIHBpY2sgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgU3RlcE1vZGVsIGZyb20gJy4uLy4uL2luZGV4J1xuaW1wb3J0IGN0eCBmcm9tICcuLi8uLi8uLi9kYXRhLWRpY3Rpb25hcnkvY29udGV4dC11dGlscydcblxuY29uc3QgaTE4biA9IHtcbiAgSU5WQUxJRF9GT1JNQVQ6ICdMb2cgU3RlcCBkYXRhIGhhcyBhbiBpbnZhbGlkIGZvcm1hdCcsXG4gIE1JU1NJTkdfVEVNUExBVEU6ICdMb2cgU3RlcHMgcmVxdWlyZSBhIHRlbXBsYXRlJyxcbiAgTUlTU0lOR19WQVJJQUJMRVM6ICdMb2cgU3RlcHMgcmVxdWlyZSB2YXJpYWJsZXMnXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGxvZyBzdGVwXG4gKiByZXF1aXJlcyB0aGUgZm9sbG93aW5nIHBhcmFtczpcbiAqIHtcbiAqICAgdGVtcGxhdGU6ICdUb29rIHBhdGg6IHt7a2V5fX0nLFxuICogICB2YXJpYWJsZXM6IHtcbiAqICAgICBrZXk6IDxjb250ZXh0PlxuICogICB9XG4gKiB9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ01vZGVsIGV4dGVuZHMgU3RlcE1vZGVsIHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0xvZydcbiAgc3RhdGljIHR5cGUgPSAnbG9nJ1xuXG4gIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgc3VwZXIoZGF0YSlcbiAgICB0aGlzLm1ldGEgPSB7XG4gICAgICB0ZW1wbGF0ZTogZGF0YS50ZW1wbGF0ZSxcbiAgICAgIHZhcmlhYmxlczogZGF0YS52YXJpYWJsZXMgfHwge31cbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZSAoKSB7XG4gICAgaWYgKCF0aGlzLm1ldGEpIHRocm93IG5ldyBFcnJvcihpMThuLklOVkFMSURfRk9STUFUKVxuICAgIGNvbnN0IHsgdGVtcGxhdGUsIHZhcmlhYmxlcyB9ID0gdGhpcy5tZXRhXG4gICAgaWYgKCF0ZW1wbGF0ZSkgdGhyb3cgbmV3IEVycm9yKGkxOG4uTUlTU0lOR19URU1QTEFURSlcbiAgICBpZiAoIXZhcmlhYmxlcykgdGhyb3cgbmV3IEVycm9yKGkxOG4uTUlTU0lOR19WQVJJQUJMRVMpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZm9sbG93aW5nIGZvcm1hdFxuICAgKiB7XG4gICAqICAgX2lkLFxuICAgKiAgIG5hbWUsXG4gICAqICAgdHlwZSxcbiAgICogICBtZXRhOiB7XG4gICAqICAgICB0ZW1wbGF0ZTogJ1Rvb2sgcGF0aDoge3trZXl9fScsXG4gICAqICAgICB2YXJpYWJsZXM6IHtcbiAgICogICAgICAga2V5OiA8Y29udGV4dD5cbiAgICogICAgIH1cbiAgICogICB9XG4gICAqIH1cbiAgICovXG4gIHRvSlNPTiAoKSB7XG4gICAgY29uc3QgcGVyc2lzdGFibGUgPSBwaWNrKHRoaXMsIFsnX2lkJywgJ25hbWUnLCAndHlwZSddKVxuICAgIGNvbnN0IHZhcmlhYmxlcyA9IG1hcFZhbHVlcyh0aGlzLm1ldGEudmFyaWFibGVzLCB2ID0+IGN0eC5kZWZsYXRlKHYpKVxuICAgIHBlcnNpc3RhYmxlLm1ldGEgPSB7IC4uLnRoaXMubWV0YSwgdmFyaWFibGVzIH1cbiAgICByZXR1cm4gcGVyc2lzdGFibGVcbiAgfVxufVxuIl19