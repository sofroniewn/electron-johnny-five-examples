Arduino + electron examples - under construction

This repo will contain demos of controlling an arduino from an electron app using johnny-five. Each demo will be installable as its own npm module. It is currently under construction!

DEMO 1 switch-software: button LED on/off include picture of LED

DEMO 2 switch-hardware: respond to hardware switch to turn LED on/off, include picture of LED

DEMO 3 servo: Servo control
Set position in software, servo goes to that position, graphic updates

DEMO 4 servo-closedLoop: Closed-loop servo control
Reads potentiometer value, displays position in software, servo goes to that position, graphic updates

DEMO 5 sensor: Acquiring and plot data from AO at a fixed frequency. Have start/stop button. Use a lightning visualization to display results.

DEMO 6 sensor-servo: Acquiring and plot data from AO at a fixed frequency. Have start/stop button. Use a lightning visualization to display results. Update servo position based on value.

DEMO 7 sensor-led: Acquiring and plot data from AO at a fixed frequency. Have start/stop button. Use a lightning visualization to display results. Turn on LED if fixed threshold crossed. Include picture of icon of LED turning on / off

DEMO 8 sensor-strobe: Pulse train output + sensor display
Set duration and frequency of pulses on DO, and loop output back into AO channel, and display results

DEMO 9 sensor-log: Pulse train output + sensor display
Set duration and frequency of pulses on DO, and loop output back into AO channel, and display results. Save indexed data of sensor and pulses to JSON file along with high resolution timestamp.