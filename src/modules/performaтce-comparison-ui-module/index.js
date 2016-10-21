import BasicModule from "../../core/basic-module.js";
import UiDevTool from "../../core/base.js";

const PerformanceCheck = UiDevTool.applications.PerformanceCheck;
const ControlPanel = UiDevTool.applications.ControlPanel;
const StatisticsRender = UiDevTool.applications.StatisticsRender;

export default class PerformanceComparisonUiModule extends BasicModule {

    constructor() {
        this.perfromanceCheckProcess = PerformanceCheck.createProcess();

        this.controlPanel = new ControlPanel();
        this.statisticsRender = new StatisticsRender();

        this.controlPanel.on('start', ()=> {
            this.perfromanceCheckProcess.start();
        });

        this.controlPanel.on('stop', ()=> {
            this.perfromanceCheckProcess.stop();
            this.perfromanceCheckProcess.getResults()
        });
    }
}
