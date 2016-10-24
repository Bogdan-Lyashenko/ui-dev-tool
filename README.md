#Framework for extended UI debugging

##Initial applications
* control panel
* logger
* performance check
* statistics render
* user auth

### Performance check application. 
It allows to detect performance lacks during start-end points. 

Get application.
```javascript
let PerformanceCheck = UiDevTool.applications.PerformanceCheck;
```
Create a process for exact operation
```javascript
const SUM_COMPUTING_PROCESS_ID = '#SumComputingProcessId';
let sumComputingProcess = PerformanceCheck.createProcess(SUM_COMPUTING_PROCESS_ID);

sumComputingProcess.start();
/*
... complex computing
*/
sumComputingProcess.end();
```
Use a marker to highlight exact state in logic 
```javascript
sumComputingProcess.addMarker('Marker 1', 'red');
```
Get results of performance monitoring
```javascript
console.log(sumComputingProcess.getResults());
>{
  iterationsNumber: N,
  iterationPerformance: V %,
  pointsList: [{val: V %, time: T_STAMP}, ...]
}

```
or work with background process through process id.
```javascript
const SUM_COMPUTING_PROCESS_ID = '#SumComputingProcessId';

PerformanceCheck.start(SUM_COMPUTING_PROCESS_ID);
/*
... complex computing
*/
PerformanceCheck.end(SUM_COMPUTING_PROCESS_ID);
```

### Logger application. 
Logs end-point with different sources

Get application.
```javascript
let Logger = UiDevTool.applications.Logger;
```
Init default (browser) console 
```javascript
Logger.setupBrowserConsole();
```
Add additional sources
```javascript
Logger.addSource((log)=> {
  //log into custom output
});
```
Log to all registered sources
```javascript
Logger.info('Message 1..');
Logger.warn('Message 2..');
Logger.error('Message 2..');
```
Get paired log markers to log connected operations. I.e. server request-response. It helps to analyze paired logs by unique id.
```javascript
var log = Logger.getPairedLogMarkers();

Logger.info(`Process start ${log.start}`);
//.. processing..
Logger.info(`Process end ${log.end}`);
```

### User auth application.
Configure permissions for usage of different applications. 

### Statistics render application. 
Render interactive graphs. I.e. performance check results.  

##Register your own applications
```javascript
 class YourApp extends BasicApplication {
     constructor() { }
 }
  
 try {
    UiDevTool.registerApplication('YourApp', new YourApp());
 } catch (e) {
    //${app.name} already exists. Please use different name.`
 }
```
