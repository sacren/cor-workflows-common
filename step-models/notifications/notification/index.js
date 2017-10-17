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
  INVALID_FORMAT: 'Notification Step data has an invalid format',
  MISSING_RECIPIENT: 'Notification Steps require a recipient',
  MISSING_SUBJECT: 'Notification Steps require a subject',
  MISSING_SOURCES: 'Notification Steps require sources'

  /**
   * Creates a notification step
   * requires the following params:
   * {
   *   recipient: <context>,
   *   type: 'email',
   *   subject: '',
   *   body: '',
   *   sources: {
   *     key1: <context>,
   *     key2: <context>
   *   }
   * }
   */
};
var NotificationModel = function (_StepModel) {
  _inherits(NotificationModel, _StepModel);

  function NotificationModel(data) {
    _classCallCheck(this, NotificationModel);

    var _this = _possibleConstructorReturn(this, (NotificationModel.__proto__ || Object.getPrototypeOf(NotificationModel)).call(this, data));

    var recipient = data.recipient,
        _data$type = data.type,
        type = _data$type === undefined ? 'email' : _data$type,
        subject = data.subject,
        body = data.body,
        _data$sources = data.sources,
        sources = _data$sources === undefined ? {} : _data$sources;

    _this.meta = {
      type: type,
      recipient: recipient,
      subject: subject,
      body: body,
      sources: sources
    };
    return _this;
  }

  _createClass(NotificationModel, [{
    key: 'validate',
    value: function validate() {
      if (!this.meta) throw new Error(i18n.INVALID_FORMAT);
      var _meta = this.meta,
          recipient = _meta.recipient,
          subject = _meta.subject,
          sources = _meta.sources;

      if (!recipient) throw new Error(i18n.MISSING_RECIPIENT);
      if (!subject) throw new Error(i18n.MISSING_SUBJECT);
      if (!sources) throw new Error(i18n.MISSING_SOURCES);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var persistable = (0, _lodash.pick)(this, ['_id', 'name', 'type']);
      var recipient = _contextUtils2.default.deflate(this.meta.recipient);
      var sources = (0, _lodash.mapValues)(this.meta.sources, function (src) {
        return _contextUtils2.default.deflate(src);
      });
      persistable.meta = _extends({}, this.meta, { recipient: recipient, sources: sources });
      return persistable;
    }
  }]);

  return NotificationModel;
}(_index2.default);

NotificationModel.displayName = 'Notification';
NotificationModel.type = 'notification';
exports.default = NotificationModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAtbW9kZWxzL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9uL2luZGV4LmpzIl0sIm5hbWVzIjpbImkxOG4iLCJJTlZBTElEX0ZPUk1BVCIsIk1JU1NJTkdfUkVDSVBJRU5UIiwiTUlTU0lOR19TVUJKRUNUIiwiTUlTU0lOR19TT1VSQ0VTIiwiTm90aWZpY2F0aW9uTW9kZWwiLCJkYXRhIiwicmVjaXBpZW50IiwidHlwZSIsInN1YmplY3QiLCJib2R5Iiwic291cmNlcyIsIm1ldGEiLCJFcnJvciIsInBlcnNpc3RhYmxlIiwiZGVmbGF0ZSIsInNyYyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFUQTs7Ozs7Ozs7O0FBV0EsSUFBTUEsT0FBTztBQUNYQyxrQkFBZ0IsOENBREw7QUFFWEMscUJBQW1CLHdDQUZSO0FBR1hDLG1CQUFpQixzQ0FITjtBQUlYQyxtQkFBaUI7O0FBR25COzs7Ozs7Ozs7Ozs7OztBQVBhLENBQWI7SUFxQnFCQyxpQjs7O0FBSW5CLDZCQUFhQyxJQUFiLEVBQW1CO0FBQUE7O0FBQUEsc0lBQ1hBLElBRFc7O0FBQUEsUUFFVEMsU0FGUyxHQUVrREQsSUFGbEQsQ0FFVEMsU0FGUztBQUFBLHFCQUVrREQsSUFGbEQsQ0FFRUUsSUFGRjtBQUFBLFFBRUVBLElBRkYsOEJBRVMsT0FGVDtBQUFBLFFBRWtCQyxPQUZsQixHQUVrREgsSUFGbEQsQ0FFa0JHLE9BRmxCO0FBQUEsUUFFMkJDLElBRjNCLEdBRWtESixJQUZsRCxDQUUyQkksSUFGM0I7QUFBQSx3QkFFa0RKLElBRmxELENBRWlDSyxPQUZqQztBQUFBLFFBRWlDQSxPQUZqQyxpQ0FFMkMsRUFGM0M7O0FBR2pCLFVBQUtDLElBQUwsR0FBWTtBQUNWSixnQkFEVTtBQUVWRCwwQkFGVTtBQUdWRSxzQkFIVTtBQUlWQyxnQkFKVTtBQUtWQztBQUxVLEtBQVo7QUFIaUI7QUFVbEI7Ozs7K0JBRVc7QUFDVixVQUFJLENBQUMsS0FBS0MsSUFBVixFQUFnQixNQUFNLElBQUlDLEtBQUosQ0FBVWIsS0FBS0MsY0FBZixDQUFOO0FBRE4sa0JBRThCLEtBQUtXLElBRm5DO0FBQUEsVUFFRkwsU0FGRSxTQUVGQSxTQUZFO0FBQUEsVUFFU0UsT0FGVCxTQUVTQSxPQUZUO0FBQUEsVUFFa0JFLE9BRmxCLFNBRWtCQSxPQUZsQjs7QUFHVixVQUFJLENBQUNKLFNBQUwsRUFBZ0IsTUFBTSxJQUFJTSxLQUFKLENBQVViLEtBQUtFLGlCQUFmLENBQU47QUFDaEIsVUFBSSxDQUFDTyxPQUFMLEVBQWMsTUFBTSxJQUFJSSxLQUFKLENBQVViLEtBQUtHLGVBQWYsQ0FBTjtBQUNkLFVBQUksQ0FBQ1EsT0FBTCxFQUFjLE1BQU0sSUFBSUUsS0FBSixDQUFVYixLQUFLSSxlQUFmLENBQU47QUFDZjs7OzZCQUVTO0FBQ1IsVUFBTVUsY0FBYyxrQkFBSyxJQUFMLEVBQVcsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixNQUFoQixDQUFYLENBQXBCO0FBQ0EsVUFBTVAsWUFBWSx1QkFBSVEsT0FBSixDQUFZLEtBQUtILElBQUwsQ0FBVUwsU0FBdEIsQ0FBbEI7QUFDQSxVQUFNSSxVQUFVLHVCQUFVLEtBQUtDLElBQUwsQ0FBVUQsT0FBcEIsRUFBNkI7QUFBQSxlQUFPLHVCQUFJSSxPQUFKLENBQVlDLEdBQVosQ0FBUDtBQUFBLE9BQTdCLENBQWhCO0FBQ0FGLGtCQUFZRixJQUFaLGdCQUF3QixLQUFLQSxJQUE3QixJQUFtQ0wsb0JBQW5DLEVBQThDSSxnQkFBOUM7QUFDQSxhQUFPRyxXQUFQO0FBQ0Q7Ozs7OztBQTlCa0JULGlCLENBQ1pZLFcsR0FBYyxjO0FBREZaLGlCLENBRVpHLEksR0FBTyxjO2tCQUZLSCxpQiIsImZpbGUiOiJzdGVwLW1vZGVscy9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbi9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCDCqSAyMDE2IEt1YWxpLCBJbmMuIC0gQWxsIFJpZ2h0cyBSZXNlcnZlZFxuICogWW91IG1heSB1c2UgYW5kIG1vZGlmeSB0aGlzIGNvZGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBLdWFsaSwgSW5jLlxuICogUHJlLVJlbGVhc2UgTGljZW5zZSBBZ3JlZW1lbnQuIFlvdSBtYXkgbm90IGRpc3RyaWJ1dGUgaXQuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgS3VhbGksIEluYy4gUHJlLVJlbGVhc2UgTGljZW5zZVxuICogQWdyZWVtZW50IHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHBsZWFzZSB3cml0ZSB0byBsaWNlbnNlQGt1YWxpLmNvLlxuICovXG5pbXBvcnQgeyBtYXBWYWx1ZXMsIHBpY2sgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgU3RlcE1vZGVsIGZyb20gJy4uLy4uL2luZGV4J1xuaW1wb3J0IGN0eCBmcm9tICcuLi8uLi8uLi9kYXRhLWRpY3Rpb25hcnkvY29udGV4dC11dGlscydcblxuY29uc3QgaTE4biA9IHtcbiAgSU5WQUxJRF9GT1JNQVQ6ICdOb3RpZmljYXRpb24gU3RlcCBkYXRhIGhhcyBhbiBpbnZhbGlkIGZvcm1hdCcsXG4gIE1JU1NJTkdfUkVDSVBJRU5UOiAnTm90aWZpY2F0aW9uIFN0ZXBzIHJlcXVpcmUgYSByZWNpcGllbnQnLFxuICBNSVNTSU5HX1NVQkpFQ1Q6ICdOb3RpZmljYXRpb24gU3RlcHMgcmVxdWlyZSBhIHN1YmplY3QnLFxuICBNSVNTSU5HX1NPVVJDRVM6ICdOb3RpZmljYXRpb24gU3RlcHMgcmVxdWlyZSBzb3VyY2VzJ1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBub3RpZmljYXRpb24gc3RlcFxuICogcmVxdWlyZXMgdGhlIGZvbGxvd2luZyBwYXJhbXM6XG4gKiB7XG4gKiAgIHJlY2lwaWVudDogPGNvbnRleHQ+LFxuICogICB0eXBlOiAnZW1haWwnLFxuICogICBzdWJqZWN0OiAnJyxcbiAqICAgYm9keTogJycsXG4gKiAgIHNvdXJjZXM6IHtcbiAqICAgICBrZXkxOiA8Y29udGV4dD4sXG4gKiAgICAga2V5MjogPGNvbnRleHQ+XG4gKiAgIH1cbiAqIH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9uTW9kZWwgZXh0ZW5kcyBTdGVwTW9kZWwge1xuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnTm90aWZpY2F0aW9uJ1xuICBzdGF0aWMgdHlwZSA9ICdub3RpZmljYXRpb24nXG5cbiAgY29uc3RydWN0b3IgKGRhdGEpIHtcbiAgICBzdXBlcihkYXRhKVxuICAgIGNvbnN0IHsgcmVjaXBpZW50LCB0eXBlID0gJ2VtYWlsJywgc3ViamVjdCwgYm9keSwgc291cmNlcyA9IHt9IH0gPSBkYXRhXG4gICAgdGhpcy5tZXRhID0ge1xuICAgICAgdHlwZSxcbiAgICAgIHJlY2lwaWVudCxcbiAgICAgIHN1YmplY3QsXG4gICAgICBib2R5LFxuICAgICAgc291cmNlc1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlICgpIHtcbiAgICBpZiAoIXRoaXMubWV0YSkgdGhyb3cgbmV3IEVycm9yKGkxOG4uSU5WQUxJRF9GT1JNQVQpXG4gICAgY29uc3QgeyByZWNpcGllbnQsIHN1YmplY3QsIHNvdXJjZXMgfSA9IHRoaXMubWV0YVxuICAgIGlmICghcmVjaXBpZW50KSB0aHJvdyBuZXcgRXJyb3IoaTE4bi5NSVNTSU5HX1JFQ0lQSUVOVClcbiAgICBpZiAoIXN1YmplY3QpIHRocm93IG5ldyBFcnJvcihpMThuLk1JU1NJTkdfU1VCSkVDVClcbiAgICBpZiAoIXNvdXJjZXMpIHRocm93IG5ldyBFcnJvcihpMThuLk1JU1NJTkdfU09VUkNFUylcbiAgfVxuXG4gIHRvSlNPTiAoKSB7XG4gICAgY29uc3QgcGVyc2lzdGFibGUgPSBwaWNrKHRoaXMsIFsnX2lkJywgJ25hbWUnLCAndHlwZSddKVxuICAgIGNvbnN0IHJlY2lwaWVudCA9IGN0eC5kZWZsYXRlKHRoaXMubWV0YS5yZWNpcGllbnQpXG4gICAgY29uc3Qgc291cmNlcyA9IG1hcFZhbHVlcyh0aGlzLm1ldGEuc291cmNlcywgc3JjID0+IGN0eC5kZWZsYXRlKHNyYykpXG4gICAgcGVyc2lzdGFibGUubWV0YSA9IHsgLi4udGhpcy5tZXRhLCByZWNpcGllbnQsIHNvdXJjZXMgfVxuICAgIHJldHVybiBwZXJzaXN0YWJsZVxuICB9XG59XG4iXX0=