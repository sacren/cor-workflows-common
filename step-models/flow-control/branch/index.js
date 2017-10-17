'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _flow = require('../../../api/flow');

var _flow2 = _interopRequireDefault(_flow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
  MISSING_CONDITIONS: 'Unable to create a Conditional step without routes'

  /**
   * Creates a ConditionalModel
   * requires the following params:
   * data = {
   *   _id: [optional <string>],
   *   name: [optional <string>],
   *   routes: [
   *     {
   *       name: [optional <string>],
   *       rule: [required <rule>],
   *       flow: [optional <workflow._id>]
   *     }
   *   ]
   * }
   */
};
var ConditionalModel = function (_StepModel) {
  _inherits(ConditionalModel, _StepModel);

  function ConditionalModel(data) {
    _classCallCheck(this, ConditionalModel);

    var _this = _possibleConstructorReturn(this, (ConditionalModel.__proto__ || Object.getPrototypeOf(ConditionalModel)).call(this, data));

    if (!data || !data.routes) {
      throw new Error(i18n.MISSING_CONDITIONS);
    }
    _this.meta = {
      routes: data.routes
    };
    return _this;
  }

  _createClass(ConditionalModel, [{
    key: 'createMissingFlows',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all(this.meta.routes.map(function (route, index) {
                  return route.flow ? Promise.resolve(route) : _this2.addFlowToRoute(route, index);
                }));

              case 2:
                this.meta.routes = _context.sent;

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createMissingFlows() {
        return _ref.apply(this, arguments);
      }

      return createMissingFlows;
    }()
  }, {
    key: 'addFlowToRoute',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(route, index) {
        var flowAPI, flow;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                flowAPI = new _flow2.default();
                _context2.next = 3;
                return flowAPI.create({
                  name: route.name || 'Route ' + index + ' Flow',
                  hidden: true
                });

              case 3:
                flow = _context2.sent;

                route.flow = flow._id;
                return _context2.abrupt('return', route);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addFlowToRoute(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return addFlowToRoute;
    }()
  }, {
    key: 'validate',
    value: function validate() {
      return true;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var persistable = (0, _lodash.pick)(this, ['_id', 'name', 'type']);
      var routes = this.meta.routes.map(function (r, index) {
        var pr = {
          name: r.name === undefined ? 'Route ' + index : r.name,
          flow: r.flow === undefined ? 'new-' + index + '.' + Date.now() : r.flow,
          rule: r.rule ? r.rule.toJSON() : undefined
        };
        return pr;
      });
      persistable.meta = { routes: routes };
      return persistable;
    }
  }]);

  return ConditionalModel;
}(_index2.default);

ConditionalModel.displayName = 'Conditional';
ConditionalModel.type = 'conditional';
exports.default = ConditionalModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0ZXAtbW9kZWxzL2Zsb3ctY29udHJvbC9icmFuY2gvaW5kZXguanMiXSwibmFtZXMiOlsiaTE4biIsIk1JU1NJTkdfQ09ORElUSU9OUyIsIkNvbmRpdGlvbmFsTW9kZWwiLCJkYXRhIiwicm91dGVzIiwiRXJyb3IiLCJtZXRhIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInJvdXRlIiwiaW5kZXgiLCJmbG93IiwicmVzb2x2ZSIsImFkZEZsb3dUb1JvdXRlIiwiZmxvd0FQSSIsImNyZWF0ZSIsIm5hbWUiLCJoaWRkZW4iLCJfaWQiLCJwZXJzaXN0YWJsZSIsInIiLCJwciIsInVuZGVmaW5lZCIsIkRhdGUiLCJub3ciLCJydWxlIiwidG9KU09OIiwiZGlzcGxheU5hbWUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQU9BOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OzsrZUFUQTs7Ozs7Ozs7O0FBV0EsSUFBTUEsT0FBTztBQUNYQyxzQkFBb0I7O0FBR3RCOzs7Ozs7Ozs7Ozs7Ozs7QUFKYSxDQUFiO0lBbUJxQkMsZ0I7OztBQUluQiw0QkFBYUMsSUFBYixFQUFtQjtBQUFBOztBQUFBLG9JQUNYQSxJQURXOztBQUVqQixRQUFJLENBQUNBLElBQUQsSUFBUyxDQUFDQSxLQUFLQyxNQUFuQixFQUEyQjtBQUN6QixZQUFNLElBQUlDLEtBQUosQ0FBVUwsS0FBS0Msa0JBQWYsQ0FBTjtBQUNEO0FBQ0QsVUFBS0ssSUFBTCxHQUFZO0FBQ1ZGLGNBQVFELEtBQUtDO0FBREgsS0FBWjtBQUxpQjtBQVFsQjs7Ozs7Ozs7Ozs7Ozt1QkFHMEJHLFFBQVFDLEdBQVIsQ0FDdkIsS0FBS0YsSUFBTCxDQUFVRixNQUFWLENBQWlCSyxHQUFqQixDQUNFLFVBQUNDLEtBQUQsRUFBUUMsS0FBUjtBQUFBLHlCQUNHRCxNQUFNRSxJQUFOLEdBQ0dMLFFBQVFNLE9BQVIsQ0FBZ0JILEtBQWhCLENBREgsR0FFRyxPQUFLSSxjQUFMLENBQW9CSixLQUFwQixFQUEyQkMsS0FBM0IsQ0FITjtBQUFBLGlCQURGLENBRHVCLEM7OztBQUF6QixxQkFBS0wsSUFBTCxDQUFVRixNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRGQVVVTSxLLEVBQU9DLEs7Ozs7OztBQUNyQkksdUIsR0FBVSxvQjs7dUJBQ0dBLFFBQVFDLE1BQVIsQ0FBZTtBQUNoQ0Msd0JBQU1QLE1BQU1PLElBQU4sZUFBdUJOLEtBQXZCLFVBRDBCO0FBRWhDTywwQkFBUTtBQUZ3QixpQkFBZixDOzs7QUFBYk4sb0I7O0FBSU5GLHNCQUFNRSxJQUFOLEdBQWFBLEtBQUtPLEdBQWxCO2tEQUNPVCxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBR0c7QUFDVixhQUFPLElBQVA7QUFDRDs7OzZCQUVTO0FBQ1IsVUFBTVUsY0FBYyxrQkFBSyxJQUFMLEVBQVcsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixNQUFoQixDQUFYLENBQXBCO0FBQ0EsVUFBTWhCLFNBQVMsS0FBS0UsSUFBTCxDQUFVRixNQUFWLENBQWlCSyxHQUFqQixDQUFxQixVQUFDWSxDQUFELEVBQUlWLEtBQUosRUFBYztBQUNoRCxZQUFNVyxLQUFLO0FBQ1RMLGdCQUFNSSxFQUFFSixJQUFGLEtBQVdNLFNBQVgsY0FBZ0NaLEtBQWhDLEdBQTBDVSxFQUFFSixJQUR6QztBQUVUTCxnQkFBTVMsRUFBRVQsSUFBRixLQUFXVyxTQUFYLFlBQThCWixLQUE5QixTQUF1Q2EsS0FBS0MsR0FBTCxFQUF2QyxHQUFzREosRUFBRVQsSUFGckQ7QUFHVGMsZ0JBQU1MLEVBQUVLLElBQUYsR0FBU0wsRUFBRUssSUFBRixDQUFPQyxNQUFQLEVBQVQsR0FBMkJKO0FBSHhCLFNBQVg7QUFLQSxlQUFPRCxFQUFQO0FBQ0QsT0FQYyxDQUFmO0FBUUFGLGtCQUFZZCxJQUFaLEdBQW1CLEVBQUVGLGNBQUYsRUFBbkI7QUFDQSxhQUFPZ0IsV0FBUDtBQUNEOzs7Ozs7QUFuRGtCbEIsZ0IsQ0FDWjBCLFcsR0FBYyxhO0FBREYxQixnQixDQUVaMkIsSSxHQUFPLGE7a0JBRkszQixnQiIsImZpbGUiOiJzdGVwLW1vZGVscy9mbG93LWNvbnRyb2wvYnJhbmNoL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IMKpIDIwMTYgS3VhbGksIEluYy4gLSBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKiBZb3UgbWF5IHVzZSBhbmQgbW9kaWZ5IHRoaXMgY29kZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEt1YWxpLCBJbmMuXG4gKiBQcmUtUmVsZWFzZSBMaWNlbnNlIEFncmVlbWVudC4gWW91IG1heSBub3QgZGlzdHJpYnV0ZSBpdC5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBLdWFsaSwgSW5jLiBQcmUtUmVsZWFzZSBMaWNlbnNlXG4gKiBBZ3JlZW1lbnQgd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgcGxlYXNlIHdyaXRlIHRvIGxpY2Vuc2VAa3VhbGkuY28uXG4gKi9cbmltcG9ydCB7IHBpY2sgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgU3RlcE1vZGVsIGZyb20gJy4uLy4uL2luZGV4J1xuaW1wb3J0IEZsb3dBUEkgZnJvbSAnLi4vLi4vLi4vYXBpL2Zsb3cnXG5cbmNvbnN0IGkxOG4gPSB7XG4gIE1JU1NJTkdfQ09ORElUSU9OUzogJ1VuYWJsZSB0byBjcmVhdGUgYSBDb25kaXRpb25hbCBzdGVwIHdpdGhvdXQgcm91dGVzJ1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBDb25kaXRpb25hbE1vZGVsXG4gKiByZXF1aXJlcyB0aGUgZm9sbG93aW5nIHBhcmFtczpcbiAqIGRhdGEgPSB7XG4gKiAgIF9pZDogW29wdGlvbmFsIDxzdHJpbmc+XSxcbiAqICAgbmFtZTogW29wdGlvbmFsIDxzdHJpbmc+XSxcbiAqICAgcm91dGVzOiBbXG4gKiAgICAge1xuICogICAgICAgbmFtZTogW29wdGlvbmFsIDxzdHJpbmc+XSxcbiAqICAgICAgIHJ1bGU6IFtyZXF1aXJlZCA8cnVsZT5dLFxuICogICAgICAgZmxvdzogW29wdGlvbmFsIDx3b3JrZmxvdy5faWQ+XVxuICogICAgIH1cbiAqICAgXVxuICogfVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25kaXRpb25hbE1vZGVsIGV4dGVuZHMgU3RlcE1vZGVsIHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0NvbmRpdGlvbmFsJ1xuICBzdGF0aWMgdHlwZSA9ICdjb25kaXRpb25hbCdcblxuICBjb25zdHJ1Y3RvciAoZGF0YSkge1xuICAgIHN1cGVyKGRhdGEpXG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLnJvdXRlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGkxOG4uTUlTU0lOR19DT05ESVRJT05TKVxuICAgIH1cbiAgICB0aGlzLm1ldGEgPSB7XG4gICAgICByb3V0ZXM6IGRhdGEucm91dGVzXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlTWlzc2luZ0Zsb3dzICgpIHtcbiAgICB0aGlzLm1ldGEucm91dGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICB0aGlzLm1ldGEucm91dGVzLm1hcChcbiAgICAgICAgKHJvdXRlLCBpbmRleCkgPT5cbiAgICAgICAgICAocm91dGUuZmxvd1xuICAgICAgICAgICAgPyBQcm9taXNlLnJlc29sdmUocm91dGUpXG4gICAgICAgICAgICA6IHRoaXMuYWRkRmxvd1RvUm91dGUocm91dGUsIGluZGV4KSlcbiAgICAgIClcbiAgICApXG4gIH1cblxuICBhc3luYyBhZGRGbG93VG9Sb3V0ZSAocm91dGUsIGluZGV4KSB7XG4gICAgY29uc3QgZmxvd0FQSSA9IG5ldyBGbG93QVBJKClcbiAgICBjb25zdCBmbG93ID0gYXdhaXQgZmxvd0FQSS5jcmVhdGUoe1xuICAgICAgbmFtZTogcm91dGUubmFtZSB8fCBgUm91dGUgJHtpbmRleH0gRmxvd2AsXG4gICAgICBoaWRkZW46IHRydWVcbiAgICB9KVxuICAgIHJvdXRlLmZsb3cgPSBmbG93Ll9pZFxuICAgIHJldHVybiByb3V0ZVxuICB9XG5cbiAgdmFsaWRhdGUgKCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICB0b0pTT04gKCkge1xuICAgIGNvbnN0IHBlcnNpc3RhYmxlID0gcGljayh0aGlzLCBbJ19pZCcsICduYW1lJywgJ3R5cGUnXSlcbiAgICBjb25zdCByb3V0ZXMgPSB0aGlzLm1ldGEucm91dGVzLm1hcCgociwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHByID0ge1xuICAgICAgICBuYW1lOiByLm5hbWUgPT09IHVuZGVmaW5lZCA/IGBSb3V0ZSAke2luZGV4fWAgOiByLm5hbWUsXG4gICAgICAgIGZsb3c6IHIuZmxvdyA9PT0gdW5kZWZpbmVkID8gYG5ldy0ke2luZGV4fS4ke0RhdGUubm93KCl9YCA6IHIuZmxvdyxcbiAgICAgICAgcnVsZTogci5ydWxlID8gci5ydWxlLnRvSlNPTigpIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICByZXR1cm4gcHJcbiAgICB9KVxuICAgIHBlcnNpc3RhYmxlLm1ldGEgPSB7IHJvdXRlcyB9XG4gICAgcmV0dXJuIHBlcnNpc3RhYmxlXG4gIH1cbn1cbiJdfQ==