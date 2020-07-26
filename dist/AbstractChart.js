var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import React, { Component } from "react";
import { Defs, Line, LinearGradient, Stop, Text } from "react-native-svg";
var AbstractChart = /** @class */ (function(_super) {
  __extends(AbstractChart, _super);
  function AbstractChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.calcScaler = function(data) {
      if (_this.props.fromZero) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [0])) -
            Math.min.apply(Math, __spreadArrays(data, [0])) || 1
        );
      } else {
        return Math.max.apply(Math, data) - Math.min.apply(Math, data) || 1;
      }
    };
    _this.calcBaseHeight = function(data, height) {
      var min = Math.min.apply(Math, data);
      var max = Math.max.apply(Math, data);
      if (min >= 0 && max >= 0) {
        return height;
      } else if (min < 0 && max <= 0) {
        return 0;
      } else if (min < 0 && max > 0) {
        return (height * max) / _this.calcScaler(data);
      }
    };
    _this.calcHeight = function(val, data, height) {
      var max = Math.max.apply(Math, data);
      var min = Math.min.apply(Math, data);
      if (min < 0 && max > 0) {
        return height * (val / _this.calcScaler(data));
      } else if (min >= 0 && max >= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - min) / _this.calcScaler(data));
      } else if (min < 0 && max <= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - max) / _this.calcScaler(data));
      }
    };
    _this.renderHorizontalLines = function(config) {
      var count = config.count,
        width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight;
      var basePosition = height - height / 4;
      return __spreadArrays(new Array(count + 1)).map(function(_, i) {
        var y = (basePosition / count) * i + paddingTop;
        return (
          <Line
            key={Math.random()}
            x1={paddingRight}
            y1={y}
            x2={width}
            y2={y}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderHorizontalLine = function(config) {
      var width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight;
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={height - height / 4 + paddingTop}
          x2={width}
          y2={height - height / 4 + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderHorizontalLabels = function(config) {
      var count = config.count,
        data = config.data,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.horizontalLabelRotation,
        horizontalLabelRotation = _a === void 0 ? 0 : _a,
        _b = config.decimalPlaces,
        decimalPlaces = _b === void 0 ? 2 : _b,
        _c = config.formatYLabel,
        formatYLabel =
          _c === void 0
            ? function(yLabel) {
                return yLabel;
              }
            : _c;
      var _d = _this.props,
        _e = _d.yAxisLabel,
        yAxisLabel = _e === void 0 ? "" : _e,
        _f = _d.yAxisSuffix,
        yAxisSuffix = _f === void 0 ? "" : _f,
        _g = _d.yLabelsOffset,
        yLabelsOffset = _g === void 0 ? 12 : _g;
      return new Array(count === 1 ? 1 : count + 1).fill(1).map(function(_, i) {
        var yLabel = String(i * count);
        if (count === 1) {
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(data[0].toFixed(decimalPlaces)) +
            yAxisSuffix;
        } else {
          var label = _this.props.fromZero
            ? (_this.calcScaler(data) / count) * i +
              Math.min.apply(Math, __spreadArrays(data, [0]))
            : (_this.calcScaler(data) / count) * i + Math.min.apply(Math, data);
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(label.toFixed(decimalPlaces)) +
            yAxisSuffix;
        }
        var basePosition = height - height / 4;
        var x = paddingRight - yLabelsOffset;
        var y =
          count === 1 && _this.props.fromZero
            ? paddingTop + 4
            : (height * 3) / 4 - (basePosition / count) * i + paddingTop;
        return (
          <Text
            rotation={horizontalLabelRotation}
            origin={x + ", " + y}
            key={Math.random()}
            x={x}
            textAnchor="end"
            y={y}
            {..._this.getPropsForLabels()}
          >
            {yLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLabels = function(_a) {
      var _b = _a.labels,
        labels = _b === void 0 ? [] : _b,
        width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        _c = _a.horizontalOffset,
        horizontalOffset = _c === void 0 ? 0 : _c,
        _d = _a.stackedBar,
        stackedBar = _d === void 0 ? false : _d,
        _e = _a.verticalLabelRotation,
        verticalLabelRotation = _e === void 0 ? 0 : _e,
        _f = _a.formatXLabel,
        formatXLabel =
          _f === void 0
            ? function(xLabel) {
                return xLabel;
              }
            : _f;
      var _g = _this.props,
        _h = _g.xAxisLabel,
        xAxisLabel = _h === void 0 ? "" : _h,
        _j = _g.xLabelsOffset,
        xLabelsOffset = _j === void 0 ? 0 : _j,
        _k = _g.hidePointsAtIndex,
        hidePointsAtIndex = _k === void 0 ? [] : _k;
      var fontSize = 12;
      var fac = 1;
      if (stackedBar) {
        fac = 0.71;
      }
      return labels.map(function(label, i) {
        if (hidePointsAtIndex.includes(i)) {
          return null;
        }
        var x =
          (((width - paddingRight) / labels.length) * i +
            paddingRight +
            horizontalOffset) *
          fac;
        var y = (height * 3) / 4 + paddingTop + fontSize * 2 + xLabelsOffset;
        return (
          <Text
            origin={x + ", " + y}
            rotation={verticalLabelRotation}
            key={Math.random()}
            x={x}
            y={y}
            textAnchor={verticalLabelRotation === 0 ? "middle" : "start"}
            {..._this.getPropsForLabels()}
          >
            {"" + formatXLabel(label) + xAxisLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLines = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight;
      var _b = _this.props.yAxisInterval,
        yAxisInterval = _b === void 0 ? 1 : _b;
      return __spreadArrays(
        new Array(Math.ceil(data.length / yAxisInterval))
      ).map(function(_, i) {
        return (
          <Line
            key={Math.random()}
            x1={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y1={0}
            x2={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y2={height - height / 4 + paddingTop}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderVerticalLine = function(_a) {
      var height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight;
      return (
        <Line
          key={Math.random()}
          x1={Math.floor(paddingRight)}
          y1={0}
          x2={Math.floor(paddingRight)}
          y2={height - height / 4 + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderDefs = function(config) {
      var width = config.width,
        height = config.height,
        backgroundGradientFrom = config.backgroundGradientFrom,
        backgroundGradientTo = config.backgroundGradientTo,
        useShadowColorFromDataset = config.useShadowColorFromDataset,
        data = config.data;
      var fromOpacity = config.hasOwnProperty("backgroundGradientFromOpacity")
        ? config.backgroundGradientFromOpacity
        : 1.0;
      var toOpacity = config.hasOwnProperty("backgroundGradientToOpacity")
        ? config.backgroundGradientToOpacity
        : 1.0;
      var fillShadowGradient = config.hasOwnProperty("fillShadowGradient")
        ? config.fillShadowGradient
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientOpacity = config.hasOwnProperty(
        "fillShadowGradientOpacity"
      )
        ? config.fillShadowGradientOpacity
        : 0.1;
      return (
        <Defs>
          <LinearGradient
            id="backgroundGradient"
            x1={0}
            y1={height}
            x2={width}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset="0"
              stopColor={backgroundGradientFrom}
              stopOpacity={fromOpacity}
            />
            <Stop
              offset="1"
              stopColor={backgroundGradientTo}
              stopOpacity={toOpacity}
            />
          </LinearGradient>
          {useShadowColorFromDataset ? (
            data.map(function(dataset, index) {
              return (
                <LinearGradient
                  id={"fillShadowGradient_" + index}
                  key={"" + index}
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={height}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop
                    offset="0"
                    stopColor={
                      dataset.color ? dataset.color(1.0) : fillShadowGradient
                    }
                    stopOpacity={fillShadowGradientOpacity}
                  />
                  <Stop
                    offset="1"
                    stopColor={
                      dataset.color
                        ? dataset.color(fillShadowGradientOpacity)
                        : fillShadowGradient
                    }
                    stopOpacity="0"
                  />
                </LinearGradient>
              );
            })
          ) : (
            <LinearGradient
              id="fillShadowGradient"
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset="0"
                stopColor={fillShadowGradient}
                stopOpacity={fillShadowGradientOpacity}
              />
              <Stop offset="1" stopColor={fillShadowGradient} stopOpacity="0" />
            </LinearGradient>
          )}
        </Defs>
      );
    };
    return _this;
  }
  AbstractChart.prototype.getPropsForBackgroundLines = function() {
    var _a = this.props.chartConfig.propsForBackgroundLines,
      propsForBackgroundLines = _a === void 0 ? {} : _a;
    return __assign(
      {
        stroke: this.props.chartConfig.color(0.2),
        strokeDasharray: "5, 10",
        strokeWidth: 1
      },
      propsForBackgroundLines
    );
  };
  AbstractChart.prototype.getPropsForLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForLabels,
      propsForLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fontSize: 12, fill: labelColor(0.8) }, propsForLabels);
  };
  return AbstractChart;
})(Component);
export default AbstractChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWtDMUU7SUFHVSxpQ0FBbUU7SUFIN0U7UUFBQSxxRUFtWUM7UUEvWEMsZ0JBQVUsR0FBRyxVQUFDLElBQWM7WUFDMUIsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLENBQUMsTUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxFQUFRLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksRUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLENBQUM7UUFFRixvQkFBYyxHQUFHLFVBQUMsSUFBYyxFQUFFLE1BQWM7WUFDOUMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLEVBQVEsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLEVBQVEsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7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RXpDO1lBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQ2pFO1VBQUEsRUFBRSxjQUFjLENBQUMsQ0FDbEIsQ0FDSDtNQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FBQztRQUNKLENBQUMsQ0FBQzs7SUFDSixDQUFDO0lBMVZDLGtEQUEwQixHQUExQjtRQUNVLElBQUEsS0FBaUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLHdCQUEzQixFQUE1Qix1QkFBdUIsbUJBQUcsRUFBRSxLQUFBLENBQTRCO1FBQ2hFLGtCQUNFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3pDLGVBQWUsRUFBRSxPQUFPLEVBQ3hCLFdBQVcsRUFBRSxDQUFDLElBQ1gsdUJBQXVCLEVBQzFCO0lBQ0osQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNRLElBQUEsS0FJRixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFIeEIsc0JBQW1CLEVBQW5CLGNBQWMsbUJBQUcsRUFBRSxLQUFBLEVBQ25CLEtBQUssV0FBQSxFQUNMLGtCQUFrQixFQUFsQixVQUFVLG1CQUFHLEtBQUssS0FDTSxDQUFDO1FBQzNCLGtCQUNFLFFBQVEsRUFBRSxFQUFFLEVBQ1osSUFBSSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFDbEIsY0FBYyxFQUNqQjtJQUNKLENBQUM7SUFxVUgsb0JBQUM7QUFBRCxDQUFDLEFBbllELENBR1UsU0FBUyxHQWdZbEI7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgRGVmcywgTGluZSwgTGluZWFyR3JhZGllbnQsIFN0b3AsIFRleHQgfSBmcm9tIFwicmVhY3QtbmF0aXZlLXN2Z1wiO1xyXG5cclxuaW1wb3J0IHsgQ2hhcnRDb25maWcsIERhdGFzZXQsIFBhcnRpYWxCeSB9IGZyb20gXCIuL0hlbHBlclR5cGVzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0Q2hhcnRQcm9wcyB7XHJcbiAgZnJvbVplcm8/OiBib29sZWFuO1xyXG4gIGNoYXJ0Q29uZmlnPzogQWJzdHJhY3RDaGFydENvbmZpZztcclxuICB5QXhpc0xhYmVsPzogc3RyaW5nO1xyXG4gIHlBeGlzU3VmZml4Pzogc3RyaW5nO1xyXG4gIHlMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgeUF4aXNJbnRlcnZhbD86IG51bWJlcjtcclxuICB4QXhpc0xhYmVsPzogc3RyaW5nO1xyXG4gIHhMYWJlbHNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgaGlkZVBvaW50c0F0SW5kZXg/OiBudW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBYnN0cmFjdENoYXJ0Q29uZmlnIGV4dGVuZHMgQ2hhcnRDb25maWcge1xyXG4gIGNvdW50PzogbnVtYmVyO1xyXG4gIGRhdGE/OiBEYXRhc2V0W107XHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbiAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gIHBhZGRpbmdUb3A/OiBudW1iZXI7XHJcbiAgcGFkZGluZ1JpZ2h0PzogbnVtYmVyO1xyXG4gIGhvcml6b250YWxMYWJlbFJvdGF0aW9uPzogbnVtYmVyO1xyXG4gIGZvcm1hdFlMYWJlbD86ICh5TGFiZWw6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIGxhYmVscz86IHN0cmluZ1tdO1xyXG4gIGhvcml6b250YWxPZmZzZXQ/OiBudW1iZXI7XHJcbiAgc3RhY2tlZEJhcj86IGJvb2xlYW47XHJcbiAgdmVydGljYWxMYWJlbFJvdGF0aW9uPzogbnVtYmVyO1xyXG4gIGZvcm1hdFhMYWJlbD86ICh4TGFiZWw6IHN0cmluZykgPT4gc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBBYnN0cmFjdENoYXJ0U3RhdGUgPSB7fTtcclxuXHJcbmNsYXNzIEFic3RyYWN0Q2hhcnQ8XHJcbiAgSVByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzLFxyXG4gIElTdGF0ZSBleHRlbmRzIEFic3RyYWN0Q2hhcnRTdGF0ZVxyXG4+IGV4dGVuZHMgQ29tcG9uZW50PEFic3RyYWN0Q2hhcnRQcm9wcyAmIElQcm9wcywgQWJzdHJhY3RDaGFydFN0YXRlICYgSVN0YXRlPiB7XHJcbiAgY2FsY1NjYWxlciA9IChkYXRhOiBudW1iZXJbXSkgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZnJvbVplcm8pIHtcclxuICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLmRhdGEsIDApIC0gTWF0aC5taW4oLi4uZGF0YSwgMCkgfHwgMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBNYXRoLm1heCguLi5kYXRhKSAtIE1hdGgubWluKC4uLmRhdGEpIHx8IDE7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY2FsY0Jhc2VIZWlnaHQgPSAoZGF0YTogbnVtYmVyW10sIGhlaWdodDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5kYXRhKTtcclxuICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLmRhdGEpO1xyXG4gICAgaWYgKG1pbiA+PSAwICYmIG1heCA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA8IDAgJiYgbWF4IDw9IDApIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA8IDAgJiYgbWF4ID4gMCkge1xyXG4gICAgICByZXR1cm4gKGhlaWdodCAqIG1heCkgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY2FsY0hlaWdodCA9ICh2YWw6IG51bWJlciwgZGF0YTogbnVtYmVyW10sIGhlaWdodDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kYXRhKTtcclxuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmRhdGEpO1xyXG5cclxuICAgIGlmIChtaW4gPCAwICYmIG1heCA+IDApIHtcclxuICAgICAgcmV0dXJuIGhlaWdodCAqICh2YWwgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpO1xyXG4gICAgfSBlbHNlIGlmIChtaW4gPj0gMCAmJiBtYXggPj0gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mcm9tWmVyb1xyXG4gICAgICAgID8gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSlcclxuICAgICAgICA6IGhlaWdodCAqICgodmFsIC0gbWluKSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XHJcbiAgICB9IGVsc2UgaWYgKG1pbiA8IDAgJiYgbWF4IDw9IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICA/IGhlaWdodCAqICh2YWwgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpXHJcbiAgICAgICAgOiBoZWlnaHQgKiAoKHZhbCAtIG1heCkgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCkge1xyXG4gICAgY29uc3QgeyBwcm9wc0ZvckJhY2tncm91bmRMaW5lcyA9IHt9IH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3Ryb2tlOiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDAuMiksXHJcbiAgICAgIHN0cm9rZURhc2hhcnJheTogXCI1LCAxMFwiLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgLi4ucHJvcHNGb3JCYWNrZ3JvdW5kTGluZXNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRQcm9wc0ZvckxhYmVscygpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgcHJvcHNGb3JMYWJlbHMgPSB7fSxcclxuICAgICAgY29sb3IsXHJcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxyXG4gICAgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgIGZpbGw6IGxhYmVsQ29sb3IoMC44KSxcclxuICAgICAgLi4ucHJvcHNGb3JMYWJlbHNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZW5kZXJIb3Jpem9udGFsTGluZXMgPSBjb25maWcgPT4ge1xyXG4gICAgY29uc3QgeyBjb3VudCwgd2lkdGgsIGhlaWdodCwgcGFkZGluZ1RvcCwgcGFkZGluZ1JpZ2h0IH0gPSBjb25maWc7XHJcbiAgICBjb25zdCBiYXNlUG9zaXRpb24gPSBoZWlnaHQgLSBoZWlnaHQgLyA0O1xyXG5cclxuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KGNvdW50ICsgMSldLm1hcCgoXywgaSkgPT4ge1xyXG4gICAgICBjb25zdCB5ID0gKGJhc2VQb3NpdGlvbiAvIGNvdW50KSAqIGkgKyBwYWRkaW5nVG9wO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxMaW5lXHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICB4MT17cGFkZGluZ1JpZ2h0fVxyXG4gICAgICAgICAgeTE9e3l9XHJcbiAgICAgICAgICB4Mj17d2lkdGh9XHJcbiAgICAgICAgICB5Mj17eX1cclxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckhvcml6b250YWxMaW5lID0gY29uZmlnID0+IHtcclxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgcGFkZGluZ1RvcCwgcGFkZGluZ1JpZ2h0IH0gPSBjb25maWc7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TGluZVxyXG4gICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICB4MT17cGFkZGluZ1JpZ2h0fVxyXG4gICAgICAgIHkxPXtoZWlnaHQgLSBoZWlnaHQgLyA0ICsgcGFkZGluZ1RvcH1cclxuICAgICAgICB4Mj17d2lkdGh9XHJcbiAgICAgICAgeTI9e2hlaWdodCAtIGhlaWdodCAvIDQgKyBwYWRkaW5nVG9wfVxyXG4gICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlckhvcml6b250YWxMYWJlbHMgPSAoXHJcbiAgICBjb25maWc6IE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+ICYgeyBkYXRhOiBudW1iZXJbXSB9XHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvdW50LFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgIHBhZGRpbmdSaWdodCxcclxuICAgICAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24gPSAwLFxyXG4gICAgICBkZWNpbWFsUGxhY2VzID0gMixcclxuICAgICAgZm9ybWF0WUxhYmVsID0gKHlMYWJlbDogc3RyaW5nKSA9PiB5TGFiZWxcclxuICAgIH0gPSBjb25maWc7XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICB5QXhpc0xhYmVsID0gXCJcIixcclxuICAgICAgeUF4aXNTdWZmaXggPSBcIlwiLFxyXG4gICAgICB5TGFiZWxzT2Zmc2V0ID0gMTJcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIG5ldyBBcnJheShjb3VudCA9PT0gMSA/IDEgOiBjb3VudCArIDEpLmZpbGwoMSkubWFwKChfLCBpKSA9PiB7XHJcbiAgICAgIGxldCB5TGFiZWwgPSBTdHJpbmcoaSAqIGNvdW50KTtcclxuXHJcbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXHJcbiAgICAgICAgICBkYXRhWzBdLnRvRml4ZWQoZGVjaW1hbFBsYWNlcylcclxuICAgICAgICApfSR7eUF4aXNTdWZmaXh9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMucHJvcHMuZnJvbVplcm9cclxuICAgICAgICAgID8gKHRoaXMuY2FsY1NjYWxlcihkYXRhKSAvIGNvdW50KSAqIGkgKyBNYXRoLm1pbiguLi5kYXRhLCAwKVxyXG4gICAgICAgICAgOiAodGhpcy5jYWxjU2NhbGVyKGRhdGEpIC8gY291bnQpICogaSArIE1hdGgubWluKC4uLmRhdGEpO1xyXG4gICAgICAgIHlMYWJlbCA9IGAke3lBeGlzTGFiZWx9JHtmb3JtYXRZTGFiZWwoXHJcbiAgICAgICAgICBsYWJlbC50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpXHJcbiAgICAgICAgKX0ke3lBeGlzU3VmZml4fWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAtIGhlaWdodCAvIDQ7XHJcbiAgICAgIGNvbnN0IHggPSBwYWRkaW5nUmlnaHQgLSB5TGFiZWxzT2Zmc2V0O1xyXG4gICAgICBjb25zdCB5ID1cclxuICAgICAgICBjb3VudCA9PT0gMSAmJiB0aGlzLnByb3BzLmZyb21aZXJvXHJcbiAgICAgICAgICA/IHBhZGRpbmdUb3AgKyA0XHJcbiAgICAgICAgICA6IChoZWlnaHQgKiAzKSAvIDQgLSAoYmFzZVBvc2l0aW9uIC8gY291bnQpICogaSArIHBhZGRpbmdUb3A7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRleHRcclxuICAgICAgICAgIHJvdGF0aW9uPXtob3Jpem9udGFsTGFiZWxSb3RhdGlvbn1cclxuICAgICAgICAgIG9yaWdpbj17YCR7eH0sICR7eX1gfVxyXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxyXG4gICAgICAgICAgeD17eH1cclxuICAgICAgICAgIHRleHRBbmNob3I9XCJlbmRcIlxyXG4gICAgICAgICAgeT17eX1cclxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3lMYWJlbH1cclxuICAgICAgICA8L1RleHQ+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZW5kZXJWZXJ0aWNhbExhYmVscyA9ICh7XHJcbiAgICBsYWJlbHMgPSBbXSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1JpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIGhvcml6b250YWxPZmZzZXQgPSAwLFxyXG4gICAgc3RhY2tlZEJhciA9IGZhbHNlLFxyXG4gICAgdmVydGljYWxMYWJlbFJvdGF0aW9uID0gMCxcclxuICAgIGZvcm1hdFhMYWJlbCA9IHhMYWJlbCA9PiB4TGFiZWxcclxuICB9OiBQaWNrPFxyXG4gICAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICAgIHwgXCJsYWJlbHNcIlxyXG4gICAgfCBcIndpZHRoXCJcclxuICAgIHwgXCJoZWlnaHRcIlxyXG4gICAgfCBcInBhZGRpbmdSaWdodFwiXHJcbiAgICB8IFwicGFkZGluZ1RvcFwiXHJcbiAgICB8IFwiaG9yaXpvbnRhbE9mZnNldFwiXHJcbiAgICB8IFwic3RhY2tlZEJhclwiXHJcbiAgICB8IFwidmVydGljYWxMYWJlbFJvdGF0aW9uXCJcclxuICAgIHwgXCJmb3JtYXRYTGFiZWxcIlxyXG4gID4pID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgeEF4aXNMYWJlbCA9IFwiXCIsXHJcbiAgICAgIHhMYWJlbHNPZmZzZXQgPSAwLFxyXG4gICAgICBoaWRlUG9pbnRzQXRJbmRleCA9IFtdXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCBmb250U2l6ZSA9IDEyO1xyXG5cclxuICAgIGxldCBmYWMgPSAxO1xyXG4gICAgaWYgKHN0YWNrZWRCYXIpIHtcclxuICAgICAgZmFjID0gMC43MTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWxzLm1hcCgobGFiZWwsIGkpID0+IHtcclxuICAgICAgaWYgKGhpZGVQb2ludHNBdEluZGV4LmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHggPVxyXG4gICAgICAgICgoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIGxhYmVscy5sZW5ndGgpICogaSArXHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQgK1xyXG4gICAgICAgICAgaG9yaXpvbnRhbE9mZnNldCkgKlxyXG4gICAgICAgIGZhYztcclxuXHJcbiAgICAgIGNvbnN0IHkgPSAoaGVpZ2h0ICogMykgLyA0ICsgcGFkZGluZ1RvcCArIGZvbnRTaXplICogMiArIHhMYWJlbHNPZmZzZXQ7XHJcblxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUZXh0XHJcbiAgICAgICAgICBvcmlnaW49e2Ake3h9LCAke3l9YH1cclxuICAgICAgICAgIHJvdGF0aW9uPXt2ZXJ0aWNhbExhYmVsUm90YXRpb259XHJcbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgICAgICB4PXt4fVxyXG4gICAgICAgICAgeT17eX1cclxuICAgICAgICAgIHRleHRBbmNob3I9e3ZlcnRpY2FsTGFiZWxSb3RhdGlvbiA9PT0gMCA/IFwibWlkZGxlXCIgOiBcInN0YXJ0XCJ9XHJcbiAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtgJHtmb3JtYXRYTGFiZWwobGFiZWwpfSR7eEF4aXNMYWJlbH1gfVxyXG4gICAgICAgIDwvVGV4dD5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlclZlcnRpY2FsTGluZXMgPSAoe1xyXG4gICAgZGF0YSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgcGFkZGluZ1RvcCxcclxuICAgIHBhZGRpbmdSaWdodFxyXG4gIH06IE9taXQ8XHJcbiAgICBQaWNrPFxyXG4gICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgICBcImRhdGFcIiB8IFwid2lkdGhcIiB8IFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCJcclxuICAgID4sXHJcbiAgICBcImRhdGFcIlxyXG4gID4gJiB7IGRhdGE6IG51bWJlcltdIH0pID0+IHtcclxuICAgIGNvbnN0IHsgeUF4aXNJbnRlcnZhbCA9IDEgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoTWF0aC5jZWlsKGRhdGEubGVuZ3RoIC8geUF4aXNJbnRlcnZhbCkpXS5tYXAoXHJcbiAgICAgIChfLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxMaW5lXHJcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgeDE9e01hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgKCh3aWR0aCAtIHBhZGRpbmdSaWdodCkgLyAoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSkgKiBpICtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodFxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB5MT17MH1cclxuICAgICAgICAgICAgeDI9e01hdGguZmxvb3IoXHJcbiAgICAgICAgICAgICAgKCh3aWR0aCAtIHBhZGRpbmdSaWdodCkgLyAoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSkgKiBpICtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodFxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB5Mj17aGVpZ2h0IC0gaGVpZ2h0IC8gNCArIHBhZGRpbmdUb3B9XHJcbiAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyVmVydGljYWxMaW5lID0gKHtcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHRcclxuICB9OiBQaWNrPEFic3RyYWN0Q2hhcnRDb25maWcsIFwiaGVpZ2h0XCIgfCBcInBhZGRpbmdSaWdodFwiIHwgXCJwYWRkaW5nVG9wXCI+KSA9PiAoXHJcbiAgICA8TGluZVxyXG4gICAgICBrZXk9e01hdGgucmFuZG9tKCl9XHJcbiAgICAgIHgxPXtNYXRoLmZsb29yKHBhZGRpbmdSaWdodCl9XHJcbiAgICAgIHkxPXswfVxyXG4gICAgICB4Mj17TWF0aC5mbG9vcihwYWRkaW5nUmlnaHQpfVxyXG4gICAgICB5Mj17aGVpZ2h0IC0gaGVpZ2h0IC8gNCArIHBhZGRpbmdUb3B9XHJcbiAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XHJcbiAgICAvPlxyXG4gICk7XHJcblxyXG4gIHJlbmRlckRlZnMgPSAoXHJcbiAgICBjb25maWc6IFBpY2s8XHJcbiAgICAgIFBhcnRpYWxCeTxcclxuICAgICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxyXG4gICAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiXHJcbiAgICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudFwiXHJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxyXG4gICAgICA+LFxyXG4gICAgICB8IFwid2lkdGhcIlxyXG4gICAgICB8IFwiaGVpZ2h0XCJcclxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21cIlxyXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50VG9cIlxyXG4gICAgICB8IFwidXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldFwiXHJcbiAgICAgIHwgXCJkYXRhXCJcclxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudEZyb21PcGFjaXR5XCJcclxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiXHJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRcIlxyXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVwiXHJcbiAgICA+XHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIGJhY2tncm91bmRHcmFkaWVudEZyb20sXHJcbiAgICAgIGJhY2tncm91bmRHcmFkaWVudFRvLFxyXG4gICAgICB1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0LFxyXG4gICAgICBkYXRhXHJcbiAgICB9ID0gY29uZmlnO1xyXG5cclxuICAgIGNvbnN0IGZyb21PcGFjaXR5ID0gY29uZmlnLmhhc093blByb3BlcnR5KFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcIilcclxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcclxuICAgICAgOiAxLjA7XHJcbiAgICBjb25zdCB0b09wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcIilcclxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XHJcbiAgICAgIDogMS4wO1xyXG5cclxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudCA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImZpbGxTaGFkb3dHcmFkaWVudFwiKVxyXG4gICAgICA/IGNvbmZpZy5maWxsU2hhZG93R3JhZGllbnRcclxuICAgICAgOiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDEuMCk7XHJcblxyXG4gICAgY29uc3QgZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcclxuICAgICAgXCJmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XCJcclxuICAgIClcclxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eVxyXG4gICAgICA6IDAuMTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8RGVmcz5cclxuICAgICAgICA8TGluZWFyR3JhZGllbnRcclxuICAgICAgICAgIGlkPVwiYmFja2dyb3VuZEdyYWRpZW50XCJcclxuICAgICAgICAgIHgxPXswfVxyXG4gICAgICAgICAgeTE9e2hlaWdodH1cclxuICAgICAgICAgIHgyPXt3aWR0aH1cclxuICAgICAgICAgIHkyPXswfVxyXG4gICAgICAgICAgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICBvZmZzZXQ9XCIwXCJcclxuICAgICAgICAgICAgc3RvcENvbG9yPXtiYWNrZ3JvdW5kR3JhZGllbnRGcm9tfVxyXG4gICAgICAgICAgICBzdG9wT3BhY2l0eT17ZnJvbU9wYWNpdHl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFN0b3BcclxuICAgICAgICAgICAgb2Zmc2V0PVwiMVwiXHJcbiAgICAgICAgICAgIHN0b3BDb2xvcj17YmFja2dyb3VuZEdyYWRpZW50VG99XHJcbiAgICAgICAgICAgIHN0b3BPcGFjaXR5PXt0b09wYWNpdHl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvTGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAge3VzZVNoYWRvd0NvbG9yRnJvbURhdGFzZXQgPyAoXHJcbiAgICAgICAgICBkYXRhLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgPExpbmVhckdyYWRpZW50XHJcbiAgICAgICAgICAgICAgaWQ9e2BmaWxsU2hhZG93R3JhZGllbnRfJHtpbmRleH1gfVxyXG4gICAgICAgICAgICAgIGtleT17YCR7aW5kZXh9YH1cclxuICAgICAgICAgICAgICB4MT17MH1cclxuICAgICAgICAgICAgICB5MT17MH1cclxuICAgICAgICAgICAgICB4Mj17MH1cclxuICAgICAgICAgICAgICB5Mj17aGVpZ2h0fVxyXG4gICAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8U3RvcFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0PVwiMFwiXHJcbiAgICAgICAgICAgICAgICBzdG9wQ29sb3I9e1xyXG4gICAgICAgICAgICAgICAgICBkYXRhc2V0LmNvbG9yID8gZGF0YXNldC5jb2xvcigxLjApIDogZmlsbFNoYWRvd0dyYWRpZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdG9wT3BhY2l0eT17ZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxTdG9wXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ9XCIxXCJcclxuICAgICAgICAgICAgICAgIHN0b3BDb2xvcj17XHJcbiAgICAgICAgICAgICAgICAgIGRhdGFzZXQuY29sb3JcclxuICAgICAgICAgICAgICAgICAgICA/IGRhdGFzZXQuY29sb3IoZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eSlcclxuICAgICAgICAgICAgICAgICAgICA6IGZpbGxTaGFkb3dHcmFkaWVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RvcE9wYWNpdHk9XCIwXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L0xpbmVhckdyYWRpZW50PlxyXG4gICAgICAgICAgKSlcclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPExpbmVhckdyYWRpZW50XHJcbiAgICAgICAgICAgIGlkPVwiZmlsbFNoYWRvd0dyYWRpZW50XCJcclxuICAgICAgICAgICAgeDE9ezB9XHJcbiAgICAgICAgICAgIHkxPXswfVxyXG4gICAgICAgICAgICB4Mj17MH1cclxuICAgICAgICAgICAgeTI9e2hlaWdodH1cclxuICAgICAgICAgICAgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPFN0b3BcclxuICAgICAgICAgICAgICBvZmZzZXQ9XCIwXCJcclxuICAgICAgICAgICAgICBzdG9wQ29sb3I9e2ZpbGxTaGFkb3dHcmFkaWVudH1cclxuICAgICAgICAgICAgICBzdG9wT3BhY2l0eT17ZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPFN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj17ZmlsbFNoYWRvd0dyYWRpZW50fSBzdG9wT3BhY2l0eT1cIjBcIiAvPlxyXG4gICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cclxuICAgICAgICApfVxyXG4gICAgICA8L0RlZnM+XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0Q2hhcnQ7XHJcbiJdfQ==
