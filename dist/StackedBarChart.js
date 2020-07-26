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
import React from "react";
import { View } from "react-native";
import { G, Rect, Svg, Text } from "react-native-svg";
import AbstractChart from "./AbstractChart";
var barWidth = 32;
var StackedBarChart = /** @class */ (function(_super) {
  __extends(StackedBarChart, _super);
  function StackedBarChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.getBarPercentage = function() {
      var _a = _this.props.chartConfig.barPercentage,
        barPercentage = _a === void 0 ? 1 : _a;
      return barPercentage;
    };
    _this.getBarRadius = function(ret, x) {
      return _this.props.chartConfig.barRadius && ret.length === x.length - 1
        ? _this.props.chartConfig.barRadius
        : 0;
    };
    _this.renderBars = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        border = _a.border,
        colors = _a.colors,
        _b = _a.stackedBar,
        stackedBar = _b === void 0 ? false : _b;
      return data.map(function(x, i) {
        var barWidth = 32 * _this.getBarPercentage();
        var ret = [];
        var h = 0;
        var st = paddingTop;
        var fac = 1;
        if (stackedBar) {
          fac = 0.7;
        }
        for (var z = 0; z < x.length; z++) {
          h = (height - 55) * (x[z] / border);
          var y = (height / 4) * 3 - h + st;
          var xC =
            (paddingRight +
              (i * (width - paddingRight)) / data.length +
              barWidth / 2) *
            fac;
          ret.push(
            <Rect
              key={Math.random()}
              x={xC}
              y={y}
              rx={_this.getBarRadius(ret, x)}
              ry={_this.getBarRadius(ret, x)}
              width={barWidth}
              height={h}
              fill={colors[z]}
            />
          );
          if (!_this.props.hideLegend) {
            ret.push(
              <Text
                key={Math.random()}
                x={xC + 7 + barWidth / 2}
                textAnchor="end"
                y={h > 15 ? y + 15 : y + 7}
                {..._this.getPropsForLabels()}
              >
                {x[z]}
              </Text>
            );
          }
          st -= h;
        }
        return ret;
      });
    };
    _this.renderLegend = function(_a) {
      var legend = _a.legend,
        colors = _a.colors,
        width = _a.width,
        height = _a.height;
      return legend.map(function(x, i) {
        return (
          <G key={Math.random()}>
            <Rect
              width="16px"
              height="16px"
              fill={colors[i]}
              rx={8}
              ry={8}
              x={width * 0.71}
              y={height * 0.7 - i * 50}
            />
            <Text
              x={width * 0.78}
              y={height * 0.76 - i * 50}
              {..._this.getPropsForLabels()}
            >
              {x}
            </Text>
          </G>
        );
      });
    };
    return _this;
  }
  StackedBarChart.prototype.render = function() {
    var paddingTop = 15;
    var paddingRight = 50;
    var _a = this.props,
      width = _a.width,
      height = _a.height,
      _b = _a.style,
      style = _b === void 0 ? {} : _b,
      data = _a.data,
      _c = _a.withHorizontalLabels,
      withHorizontalLabels = _c === void 0 ? true : _c,
      _d = _a.withVerticalLabels,
      withVerticalLabels = _d === void 0 ? true : _d,
      _e = _a.segments,
      segments = _e === void 0 ? 4 : _e,
      decimalPlaces = _a.decimalPlaces;
    var _f = style.borderRadius,
      borderRadius = _f === void 0 ? 0 : _f;
    var config = {
      width: width,
      height: height
    };
    var border = 0;
    for (var i = 0; i < data.data.length; i++) {
      var actual = data.data[i].reduce(function(pv, cv) {
        return pv + cv;
      }, 0);
      if (actual > border) {
        border = actual;
      }
    }
    var stackedBar = data.legend && data.legend.length == 0 ? false : true;
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs(
            __assign(__assign({}, config), this.props.chartConfig)
          )}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {this.renderHorizontalLines(
              __assign(__assign({}, config), {
                count: segments,
                paddingTop: paddingTop
              })
            )}
          </G>
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels(
                  __assign(__assign({}, config), {
                    count: segments,
                    data: [0, border],
                    paddingTop: paddingTop,
                    paddingRight: paddingRight,
                    decimalPlaces: decimalPlaces
                  })
                )
              : null}
          </G>
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels(
                  __assign(__assign({}, config), {
                    labels: data.labels,
                    paddingRight: paddingRight + 28,
                    stackedBar: stackedBar,
                    paddingTop: paddingTop,
                    horizontalOffset: barWidth
                  })
                )
              : null}
          </G>
          <G>
            {this.renderBars(
              __assign(__assign({}, config), {
                data: data.data,
                border: border,
                colors: this.props.data.barColors,
                paddingTop: paddingTop,
                paddingRight: paddingRight + 20,
                stackedBar: stackedBar
              })
            )}
          </G>
          {data.legend &&
            data.legend.length != 0 &&
            this.renderLegend(
              __assign(__assign({}, config), {
                legend: data.legend,
                colors: this.props.data.barColors
              })
            )}
        </Svg>
      </View>
    );
  };
  return StackedBarChart;
})(AbstractChart);
export default StackedBarChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tlZEJhckNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YWNrZWRCYXJDaGFydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxJQUFJLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXRELE9BQU8sYUFHTixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQTZDcEI7SUFBOEIsbUNBRzdCO0lBSEQ7UUFBQSxxRUF3TkM7UUFwTkMsc0JBQWdCLEdBQUc7WUFDVCxJQUFBLEtBQXNCLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxjQUEzQixFQUFqQixhQUFhLG1CQUFHLENBQUMsS0FBQSxDQUE0QjtZQUNyRCxPQUFPLGFBQWEsQ0FBQztRQUN2QixDQUFDLENBQUM7UUFFRixrQkFBWSxHQUFHLFVBQUMsR0FBbUIsRUFBRSxDQUFpQjtZQUNwRCxPQUFPLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDcEUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUM7UUFFRixnQkFBVSxHQUFHLFVBQUMsRUFnQmI7Z0JBZkMsSUFBSSxVQUFBLEVBQ0osS0FBSyxXQUFBLEVBQ0wsTUFBTSxZQUFBLEVBQ04sVUFBVSxnQkFBQSxFQUNWLFlBQVksa0JBQUEsRUFDWixNQUFNLFlBQUEsRUFDTixNQUFNLFlBQUEsRUFDTixrQkFBa0Is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Q0FBQyxDQUNIO1VBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksdUJBQ1osTUFBTSxLQUNULE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUNqQyxDQUNOO1FBQUEsRUFBRSxHQUFHLENBQ1A7TUFBQSxFQUFFLElBQUksQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBeE5ELENBQThCLGFBQWEsR0F3TjFDO0FBRUQsZUFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFZpZXcsIFZpZXdTdHlsZSB9IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcclxuaW1wb3J0IHsgRywgUmVjdCwgU3ZnLCBUZXh0IH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcclxuXHJcbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7XHJcbiAgQWJzdHJhY3RDaGFydENvbmZpZyxcclxuICBBYnN0cmFjdENoYXJ0UHJvcHNcclxufSBmcm9tIFwiLi9BYnN0cmFjdENoYXJ0XCI7XHJcblxyXG5jb25zdCBiYXJXaWR0aCA9IDMyO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGFja2VkQmFyQ2hhcnREYXRhIHtcclxuICBsYWJlbHM6IHN0cmluZ1tdO1xyXG4gIGxlZ2VuZDogc3RyaW5nW107XHJcbiAgZGF0YTogbnVtYmVyW11bXTtcclxuICBiYXJDb2xvcnM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrZWRCYXJDaGFydFByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzIHtcclxuICAvKipcclxuICAgKiBFLmcuXHJcbiAgICogYGBgamF2YXNjcmlwdFxyXG4gICAqIGNvbnN0IGRhdGEgPSB7XHJcbiAgICogICBsYWJlbHM6IFtcIlRlc3QxXCIsIFwiVGVzdDJcIl0sXHJcbiAgICogICBsZWdlbmQ6IFtcIkwxXCIsIFwiTDJcIiwgXCJMM1wiXSxcclxuICAgKiAgIGRhdGE6IFtbNjAsIDYwLCA2MF0sIFszMCwgMzAsIDYwXV0sXHJcbiAgICogICBiYXJDb2xvcnM6IFtcIiNkZmU0ZWFcIiwgXCIjY2VkNmUwXCIsIFwiI2E0YjBiZVwiXVxyXG4gICAqIH07XHJcbiAgICogYGBgXHJcbiAgICovXHJcbiAgZGF0YTogU3RhY2tlZEJhckNoYXJ0RGF0YTtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIGNoYXJ0Q29uZmlnOiBBYnN0cmFjdENoYXJ0Q29uZmlnO1xyXG4gIGhpZGVMZWdlbmQ6IGJvb2xlYW47XHJcbiAgc3R5bGU/OiBQYXJ0aWFsPFZpZXdTdHlsZT47XHJcbiAgYmFyUGVyY2VudGFnZT86IG51bWJlcjtcclxuICBkZWNpbWFsUGxhY2VzPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgdmVydGljYWwgbGFiZWxzIC0gZGVmYXVsdDogVHJ1ZS5cclxuICAgKi9cclxuICB3aXRoVmVydGljYWxMYWJlbHM/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgaG9yaXpvbnRhbCBsYWJlbHMgLSBkZWZhdWx0OiBUcnVlLlxyXG4gICAqL1xyXG4gIHdpdGhIb3Jpem9udGFsTGFiZWxzPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBUaGUgbnVtYmVyIG9mIGhvcml6b250YWwgbGluZXNcclxuICAgKi9cclxuICBzZWdtZW50cz86IG51bWJlcjtcclxufVxyXG5cclxudHlwZSBTdGFja2VkQmFyQ2hhcnRTdGF0ZSA9IHt9O1xyXG5cclxuY2xhc3MgU3RhY2tlZEJhckNoYXJ0IGV4dGVuZHMgQWJzdHJhY3RDaGFydDxcclxuICBTdGFja2VkQmFyQ2hhcnRQcm9wcyxcclxuICBTdGFja2VkQmFyQ2hhcnRTdGF0ZVxyXG4+IHtcclxuICBnZXRCYXJQZXJjZW50YWdlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBiYXJQZXJjZW50YWdlID0gMSB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcclxuICAgIHJldHVybiBiYXJQZXJjZW50YWdlO1xyXG4gIH07XHJcblxyXG4gIGdldEJhclJhZGl1cyA9IChyZXQ6IHN0cmluZyB8IGFueVtdLCB4OiBzdHJpbmcgfCBhbnlbXSkgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hhcnRDb25maWcuYmFyUmFkaXVzICYmIHJldC5sZW5ndGggPT09IHgubGVuZ3RoIC0gMVxyXG4gICAgICA/IHRoaXMucHJvcHMuY2hhcnRDb25maWcuYmFyUmFkaXVzXHJcbiAgICAgIDogMDtcclxuICB9O1xyXG5cclxuICByZW5kZXJCYXJzID0gKHtcclxuICAgIGRhdGEsXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIHBhZGRpbmdUb3AsXHJcbiAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICBib3JkZXIsXHJcbiAgICBjb2xvcnMsXHJcbiAgICBzdGFja2VkQmFyID0gZmFsc2VcclxuICB9OiBQaWNrPFxyXG4gICAgT21pdDxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcImRhdGFcIj4sXHJcbiAgICBcIndpZHRoXCIgfCBcImhlaWdodFwiIHwgXCJwYWRkaW5nUmlnaHRcIiB8IFwicGFkZGluZ1RvcFwiIHwgXCJzdGFja2VkQmFyXCJcclxuICA+ICYge1xyXG4gICAgYm9yZGVyOiBudW1iZXI7XHJcbiAgICBjb2xvcnM6IHN0cmluZ1tdO1xyXG4gICAgZGF0YTogbnVtYmVyW11bXTtcclxuICB9KSA9PlxyXG4gICAgZGF0YS5tYXAoKHgsIGkpID0+IHtcclxuICAgICAgY29uc3QgYmFyV2lkdGggPSAzMiAqIHRoaXMuZ2V0QmFyUGVyY2VudGFnZSgpO1xyXG4gICAgICBjb25zdCByZXQgPSBbXTtcclxuICAgICAgbGV0IGggPSAwO1xyXG4gICAgICBsZXQgc3QgPSBwYWRkaW5nVG9wO1xyXG5cclxuICAgICAgbGV0IGZhYyA9IDE7XHJcbiAgICAgIGlmIChzdGFja2VkQmFyKSB7XHJcbiAgICAgICAgZmFjID0gMC43O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IHgubGVuZ3RoOyB6KyspIHtcclxuICAgICAgICBoID0gKGhlaWdodCAtIDU1KSAqICh4W3pdIC8gYm9yZGVyKTtcclxuXHJcbiAgICAgICAgY29uc3QgeSA9IChoZWlnaHQgLyA0KSAqIDMgLSBoICsgc3Q7XHJcbiAgICAgICAgY29uc3QgeEMgPVxyXG4gICAgICAgICAgKHBhZGRpbmdSaWdodCArXHJcbiAgICAgICAgICAgIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyBkYXRhLmxlbmd0aCArXHJcbiAgICAgICAgICAgIGJhcldpZHRoIC8gMikgKlxyXG4gICAgICAgICAgZmFjO1xyXG5cclxuICAgICAgICByZXQucHVzaChcclxuICAgICAgICAgIDxSZWN0XHJcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgeD17eEN9XHJcbiAgICAgICAgICAgIHk9e3l9XHJcbiAgICAgICAgICAgIHJ4PXt0aGlzLmdldEJhclJhZGl1cyhyZXQsIHgpfVxyXG4gICAgICAgICAgICByeT17dGhpcy5nZXRCYXJSYWRpdXMocmV0LCB4KX1cclxuICAgICAgICAgICAgd2lkdGg9e2JhcldpZHRofVxyXG4gICAgICAgICAgICBoZWlnaHQ9e2h9XHJcbiAgICAgICAgICAgIGZpbGw9e2NvbG9yc1t6XX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhpZGVMZWdlbmQpIHtcclxuICAgICAgICAgIHJldC5wdXNoKFxyXG4gICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cclxuICAgICAgICAgICAgICB4PXt4QyArIDcgKyBiYXJXaWR0aCAvIDJ9XHJcbiAgICAgICAgICAgICAgdGV4dEFuY2hvcj1cImVuZFwiXHJcbiAgICAgICAgICAgICAgeT17aCA+IDE1ID8geSArIDE1IDogeSArIDd9XHJcbiAgICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt4W3pdfVxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3QgLT0gaDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0pO1xyXG5cclxuICByZW5kZXJMZWdlbmQgPSAoe1xyXG4gICAgbGVnZW5kLFxyXG4gICAgY29sb3JzLFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHRcclxuICB9OiBQaWNrPEFic3RyYWN0Q2hhcnRDb25maWcsIFwid2lkdGhcIiB8IFwiaGVpZ2h0XCI+ICYge1xyXG4gICAgbGVnZW5kOiBzdHJpbmdbXTtcclxuICAgIGNvbG9yczogc3RyaW5nW107XHJcbiAgfSkgPT5cclxuICAgIGxlZ2VuZC5tYXAoKHgsIGkpID0+IHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8RyBrZXk9e01hdGgucmFuZG9tKCl9PlxyXG4gICAgICAgICAgPFJlY3RcclxuICAgICAgICAgICAgd2lkdGg9XCIxNnB4XCJcclxuICAgICAgICAgICAgaGVpZ2h0PVwiMTZweFwiXHJcbiAgICAgICAgICAgIGZpbGw9e2NvbG9yc1tpXX1cclxuICAgICAgICAgICAgcng9ezh9XHJcbiAgICAgICAgICAgIHJ5PXs4fVxyXG4gICAgICAgICAgICB4PXt3aWR0aCAqIDAuNzF9XHJcbiAgICAgICAgICAgIHk9e2hlaWdodCAqIDAuNyAtIGkgKiA1MH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICB4PXt3aWR0aCAqIDAuNzh9XHJcbiAgICAgICAgICAgIHk9e2hlaWdodCAqIDAuNzYgLSBpICogNTB9XHJcbiAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt4fVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgIDwvRz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBwYWRkaW5nVG9wID0gMTU7XHJcbiAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSA1MDtcclxuXHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIHN0eWxlID0ge30sXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIHdpdGhIb3Jpem9udGFsTGFiZWxzID0gdHJ1ZSxcclxuICAgICAgd2l0aFZlcnRpY2FsTGFiZWxzID0gdHJ1ZSxcclxuICAgICAgc2VnbWVudHMgPSA0LFxyXG4gICAgICBkZWNpbWFsUGxhY2VzXHJcbiAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCB7IGJvcmRlclJhZGl1cyA9IDAgfSA9IHN0eWxlO1xyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBib3JkZXIgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgYWN0dWFsID0gZGF0YS5kYXRhW2ldLnJlZHVjZSgocHYsIGN2KSA9PiBwdiArIGN2LCAwKTtcclxuICAgICAgaWYgKGFjdHVhbCA+IGJvcmRlcikge1xyXG4gICAgICAgIGJvcmRlciA9IGFjdHVhbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFja2VkQmFyID0gZGF0YS5sZWdlbmQgJiYgZGF0YS5sZWdlbmQubGVuZ3RoID09IDAgPyBmYWxzZSA6IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFZpZXcgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICA8U3ZnIGhlaWdodD17aGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxyXG4gICAgICAgICAge3RoaXMucmVuZGVyRGVmcyh7XHJcbiAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZ1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8UmVjdFxyXG4gICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxyXG4gICAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cclxuICAgICAgICAgICAgcng9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgcnk9e2JvcmRlclJhZGl1c31cclxuICAgICAgICAgICAgZmlsbD1cInVybCgjYmFja2dyb3VuZEdyYWRpZW50KVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt0aGlzLnJlbmRlckhvcml6b250YWxMaW5lcyh7XHJcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgIGNvdW50OiBzZWdtZW50cyxcclxuICAgICAgICAgICAgICBwYWRkaW5nVG9wXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt3aXRoSG9yaXpvbnRhbExhYmVsc1xyXG4gICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJIb3Jpem9udGFsTGFiZWxzKHtcclxuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICBjb3VudDogc2VnbWVudHMsXHJcbiAgICAgICAgICAgICAgICAgIGRhdGE6IFswLCBib3JkZXJdLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgIGRlY2ltYWxQbGFjZXNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgPC9HPlxyXG4gICAgICAgICAgPEc+XHJcbiAgICAgICAgICAgIHt3aXRoVmVydGljYWxMYWJlbHNcclxuICAgICAgICAgICAgICA/IHRoaXMucmVuZGVyVmVydGljYWxMYWJlbHMoe1xyXG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgICAgIGxhYmVsczogZGF0YS5sYWJlbHMsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZ1JpZ2h0ICsgMjgsXHJcbiAgICAgICAgICAgICAgICAgIHN0YWNrZWRCYXIsXHJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXHJcbiAgICAgICAgICAgICAgICAgIGhvcml6b250YWxPZmZzZXQ6IGJhcldpZHRoXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIDogbnVsbH1cclxuICAgICAgICAgIDwvRz5cclxuICAgICAgICAgIDxHPlxyXG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJCYXJzKHtcclxuICAgICAgICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxyXG4gICAgICAgICAgICAgIGJvcmRlcixcclxuICAgICAgICAgICAgICBjb2xvcnM6IHRoaXMucHJvcHMuZGF0YS5iYXJDb2xvcnMsXHJcbiAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcclxuICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCArIDIwLFxyXG4gICAgICAgICAgICAgIHN0YWNrZWRCYXJcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L0c+XHJcbiAgICAgICAgICB7ZGF0YS5sZWdlbmQgJiZcclxuICAgICAgICAgICAgZGF0YS5sZWdlbmQubGVuZ3RoICE9IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmQoe1xyXG4gICAgICAgICAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgICAgICAgICBsZWdlbmQ6IGRhdGEubGVnZW5kLFxyXG4gICAgICAgICAgICAgIGNvbG9yczogdGhpcy5wcm9wcy5kYXRhLmJhckNvbG9yc1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICA8L1N2Zz5cclxuICAgICAgPC9WaWV3PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YWNrZWRCYXJDaGFydDtcclxuIl19
