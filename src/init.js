import UiDevTool from "./core/base.js";
import PerformanceCheck from "./applications/performance-check/index.js";
import PerformanceComparisonUiModule  from "./modules/performaтce-comparison-ui-module/index.js";

UiDevTool.registerApplication('PerformanceCheck', new PerformanceCheck());
UiDevTool.registerModule('PerformanceComparisonUiModule', PerformanceComparisonUiModule);

