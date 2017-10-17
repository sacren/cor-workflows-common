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

var _context = require('../../../data-dictionary/context');

var _context2 = _interopRequireDefault(_context);

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
  MISSING_FORM: 'Unable to create a Form Approval step without a form',
  MISSING_APPROVER: 'Unable to create a Form Approval step without an approver',
  MISSING_VOTING: 'Unable to create a Form Approval step without voting rules'

  /**
   * Creates a FormApprovalModel
   * requires the following params:
   * data = {
   *   name: [optional] string,
   *   form: context,
   *   approver: context,
   *   voting: object
   * }
   */
};
var FormApprovalModel = function (_StepModel) {
  _inherits(FormApprovalModel, _StepModel);

  function FormApprovalModel(data) {
    _classCallCheck(this, FormApprovalModel);

    var _this = _possibleConstructorReturn(this, (FormApprovalModel.__proto__ || Object.getPrototypeOf(FormApprovalModel)).call(this, data));

    _this.meta = {};
    if (data) {
      var form = data.form,
          approver = data.approver,
          voting = data.voting;

      Object.assign(_this.meta, { form: form, approver: approver, voting: voting });
    }
    return _this;
  }

  _createClass(FormApprovalModel, [{
    key: 'validate',
    value: function validate() {
      var _meta = this.meta,
          form = _meta.form,
          approver = _meta.approver,
          voting = _meta.voting;

      if (!form || !(form instanceof _context2.default)) throw new Error(i18n.MISSING_FORM);
      if (!approver || !(approver instanceof _context2.default)) {
        throw new Error(i18n.MISSING_APPROVER);
      }
      if (!voting) throw new Error(i18n.MISSING_VOTING);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var persistable = (0, _lodash.pick)(this, ['_id', 'name', 'type']);
      var _meta2 = this.meta,
          form = _meta2.form,
          approver = _meta2.approver,
          voting = _meta2.voting;

      persistable.meta = {
        form: _contextUtils2.default.deflate(form),
        approver: _contextUtils2.default.deflate(approver),
        voting: voting
      };
      return persistable;
    }
  }]);

  return FormApprovalModel;
}(_index2.default);

FormApprovalModel.displayName = 'Form Approval';
FormApprovalModel.type = 'form-approval';
exports.default = FormApprovalModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAtbW9kZWxzL2FwcHJvdmFscy91bmlmaWVkLWZvcm0tYXBwcm92YWwvaW5kZXguanMiXSwibmFtZXMiOlsiaTE4biIsIk1JU1NJTkdfRk9STSIsIk1JU1NJTkdfQVBQUk9WRVIiLCJNSVNTSU5HX1ZPVElORyIsIkZvcm1BcHByb3ZhbE1vZGVsIiwiZGF0YSIsIm1ldGEiLCJmb3JtIiwiYXBwcm92ZXIiLCJ2b3RpbmciLCJPYmplY3QiLCJhc3NpZ24iLCJFcnJvciIsInBlcnNpc3RhYmxlIiwiZGVmbGF0ZSIsImRpc3BsYXlOYW1lIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFPQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7K2VBWEE7Ozs7Ozs7OztBQWFBLElBQU1BLE9BQU87QUFDWEMsZ0JBQWMsc0RBREg7QUFFWEMsb0JBQWtCLDJEQUZQO0FBR1hDLGtCQUFnQjs7QUFHbEI7Ozs7Ozs7Ozs7QUFOYSxDQUFiO0lBZ0JxQkMsaUI7OztBQUluQiw2QkFBYUMsSUFBYixFQUFtQjtBQUFBOztBQUFBLHNJQUNYQSxJQURXOztBQUVqQixVQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFFBQUlELElBQUosRUFBVTtBQUFBLFVBQ0FFLElBREEsR0FDMkJGLElBRDNCLENBQ0FFLElBREE7QUFBQSxVQUNNQyxRQUROLEdBQzJCSCxJQUQzQixDQUNNRyxRQUROO0FBQUEsVUFDZ0JDLE1BRGhCLEdBQzJCSixJQUQzQixDQUNnQkksTUFEaEI7O0FBRVJDLGFBQU9DLE1BQVAsQ0FBYyxNQUFLTCxJQUFuQixFQUF5QixFQUFFQyxVQUFGLEVBQVFDLGtCQUFSLEVBQWtCQyxjQUFsQixFQUF6QjtBQUNEO0FBTmdCO0FBT2xCOzs7OytCQUVXO0FBQUEsa0JBQ3lCLEtBQUtILElBRDlCO0FBQUEsVUFDRkMsSUFERSxTQUNGQSxJQURFO0FBQUEsVUFDSUMsUUFESixTQUNJQSxRQURKO0FBQUEsVUFDY0MsTUFEZCxTQUNjQSxNQURkOztBQUVWLFVBQUksQ0FBQ0YsSUFBRCxJQUFTLEVBQUVBLGlDQUFGLENBQWIsRUFBeUMsTUFBTSxJQUFJSyxLQUFKLENBQVVaLEtBQUtDLFlBQWYsQ0FBTjtBQUN6QyxVQUFJLENBQUNPLFFBQUQsSUFBYSxFQUFFQSxxQ0FBRixDQUFqQixFQUFpRDtBQUMvQyxjQUFNLElBQUlJLEtBQUosQ0FBVVosS0FBS0UsZ0JBQWYsQ0FBTjtBQUNEO0FBQ0QsVUFBSSxDQUFDTyxNQUFMLEVBQWEsTUFBTSxJQUFJRyxLQUFKLENBQVVaLEtBQUtHLGNBQWYsQ0FBTjtBQUNkOzs7NkJBRVM7QUFDUixVQUFNVSxjQUFjLGtCQUFLLElBQUwsRUFBVyxDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE1BQWhCLENBQVgsQ0FBcEI7QUFEUSxtQkFFMkIsS0FBS1AsSUFGaEM7QUFBQSxVQUVBQyxJQUZBLFVBRUFBLElBRkE7QUFBQSxVQUVNQyxRQUZOLFVBRU1BLFFBRk47QUFBQSxVQUVnQkMsTUFGaEIsVUFFZ0JBLE1BRmhCOztBQUdSSSxrQkFBWVAsSUFBWixHQUFtQjtBQUNqQkMsY0FBTSx1QkFBSU8sT0FBSixDQUFZUCxJQUFaLENBRFc7QUFFakJDLGtCQUFVLHVCQUFJTSxPQUFKLENBQVlOLFFBQVosQ0FGTztBQUdqQkM7QUFIaUIsT0FBbkI7QUFLQSxhQUFPSSxXQUFQO0FBQ0Q7Ozs7OztBQS9Ca0JULGlCLENBQ1pXLFcsR0FBYyxlO0FBREZYLGlCLENBRVpZLEksR0FBTyxlO2tCQUZLWixpQiIsImZpbGUiOiJzdGVwLW1vZGVscy9hcHByb3ZhbHMvdW5pZmllZC1mb3JtLWFwcHJvdmFsL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IMKpIDIwMTYgS3VhbGksIEluYy4gLSBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKiBZb3UgbWF5IHVzZSBhbmQgbW9kaWZ5IHRoaXMgY29kZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEt1YWxpLCBJbmMuXG4gKiBQcmUtUmVsZWFzZSBMaWNlbnNlIEFncmVlbWVudC4gWW91IG1heSBub3QgZGlzdHJpYnV0ZSBpdC5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBLdWFsaSwgSW5jLiBQcmUtUmVsZWFzZSBMaWNlbnNlXG4gKiBBZ3JlZW1lbnQgd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgcGxlYXNlIHdyaXRlIHRvIGxpY2Vuc2VAa3VhbGkuY28uXG4gKi9cbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgU3RlcE1vZGVsIGZyb20gJy4uLy4uL2luZGV4J1xuaW1wb3J0IGN0eFxuICBmcm9tICcuLi8uLi8uLi9kYXRhLWRpY3Rpb25hcnkvY29udGV4dC11dGlscydcbmltcG9ydCBDb250ZXh0IGZyb20gJy4uLy4uLy4uL2RhdGEtZGljdGlvbmFyeS9jb250ZXh0J1xuXG5jb25zdCBpMThuID0ge1xuICBNSVNTSU5HX0ZPUk06ICdVbmFibGUgdG8gY3JlYXRlIGEgRm9ybSBBcHByb3ZhbCBzdGVwIHdpdGhvdXQgYSBmb3JtJyxcbiAgTUlTU0lOR19BUFBST1ZFUjogJ1VuYWJsZSB0byBjcmVhdGUgYSBGb3JtIEFwcHJvdmFsIHN0ZXAgd2l0aG91dCBhbiBhcHByb3ZlcicsXG4gIE1JU1NJTkdfVk9USU5HOiAnVW5hYmxlIHRvIGNyZWF0ZSBhIEZvcm0gQXBwcm92YWwgc3RlcCB3aXRob3V0IHZvdGluZyBydWxlcydcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgRm9ybUFwcHJvdmFsTW9kZWxcbiAqIHJlcXVpcmVzIHRoZSBmb2xsb3dpbmcgcGFyYW1zOlxuICogZGF0YSA9IHtcbiAqICAgbmFtZTogW29wdGlvbmFsXSBzdHJpbmcsXG4gKiAgIGZvcm06IGNvbnRleHQsXG4gKiAgIGFwcHJvdmVyOiBjb250ZXh0LFxuICogICB2b3Rpbmc6IG9iamVjdFxuICogfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtQXBwcm92YWxNb2RlbCBleHRlbmRzIFN0ZXBNb2RlbCB7XG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdGb3JtIEFwcHJvdmFsJ1xuICBzdGF0aWMgdHlwZSA9ICdmb3JtLWFwcHJvdmFsJ1xuXG4gIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgc3VwZXIoZGF0YSlcbiAgICB0aGlzLm1ldGEgPSB7fVxuICAgIGlmIChkYXRhKSB7XG4gICAgICBjb25zdCB7IGZvcm0sIGFwcHJvdmVyLCB2b3RpbmcgfSA9IGRhdGFcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5tZXRhLCB7IGZvcm0sIGFwcHJvdmVyLCB2b3RpbmcgfSlcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZSAoKSB7XG4gICAgY29uc3QgeyBmb3JtLCBhcHByb3Zlciwgdm90aW5nIH0gPSB0aGlzLm1ldGFcbiAgICBpZiAoIWZvcm0gfHwgIShmb3JtIGluc3RhbmNlb2YgQ29udGV4dCkpIHRocm93IG5ldyBFcnJvcihpMThuLk1JU1NJTkdfRk9STSlcbiAgICBpZiAoIWFwcHJvdmVyIHx8ICEoYXBwcm92ZXIgaW5zdGFuY2VvZiBDb250ZXh0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGkxOG4uTUlTU0lOR19BUFBST1ZFUilcbiAgICB9XG4gICAgaWYgKCF2b3RpbmcpIHRocm93IG5ldyBFcnJvcihpMThuLk1JU1NJTkdfVk9USU5HKVxuICB9XG5cbiAgdG9KU09OICgpIHtcbiAgICBjb25zdCBwZXJzaXN0YWJsZSA9IHBpY2sodGhpcywgWydfaWQnLCAnbmFtZScsICd0eXBlJ10pXG4gICAgY29uc3QgeyBmb3JtLCBhcHByb3Zlciwgdm90aW5nIH0gPSB0aGlzLm1ldGFcbiAgICBwZXJzaXN0YWJsZS5tZXRhID0ge1xuICAgICAgZm9ybTogY3R4LmRlZmxhdGUoZm9ybSksXG4gICAgICBhcHByb3ZlcjogY3R4LmRlZmxhdGUoYXBwcm92ZXIpLFxuICAgICAgdm90aW5nXG4gICAgfVxuICAgIHJldHVybiBwZXJzaXN0YWJsZVxuICB9XG59XG4iXX0=