#7-sensor-led
**This app plots the values a potentiometer and turns on an LED if a voltage threshold is crossed**

##Setting up the hardware

I used an [arduino mega](https://www.arduino.cc/en/Main/ArduinoBoardMega2560) for this example, but any of the [boards](http://johnny-five.io/platform-support/) supported by johnny-five should work.

First you need to make sure the [StandardFirmata](https://github.com/firmata/protocol) firmware is running on the board

- Download the [Arduino IDE](https://www.arduino.cc/en/Main/Software)
- Plug in your Arduino or Arduino compatible microcontroller via USB
- Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
- Click the "Upload" button
- If the upload was successful, the board is now prepared and you can close the Arduino IDE

Connect an LED directly to pin 12 and a potentiometer to A0

<img src="./assets/board.png" width="500">

##Setting up the code


To run, first clone the repo and npm install the example directory

```
git clone https://github.com/sofroniewn/electron-johnny-five-examples
cd electron-johnny-five-examples/7-sensor-led
npm install
```

Unfortunately the serial port may not work right away and might need to be rebuilt

```
./node_modules/.bin/electron-rebuild
```

At this point if you try to starting the app with

```
npm start
```
You may get an error if the path to <code>serialport.node</code> is wrong

```
Uncaught Error: Cannot find module '/Users/sofroniewn/github/electron-johnny-five-examples/1-led/node_modules/johnny-five/node_modules/serialport/build/Release/node-v47-darwin-x64/serialport.node'
```

This can easily be fixed by

```
mv ./node_modules/johnny-five/node_modules/serialport/build/Release/electron-v0.36-darwin-x64/ ./node_modules/johnny-five/node_modules/serialport/build/Release/node-v47-darwin-x64/
```

You're now ready to run the app!

For more information about that error and using electron with johnny-five and node-serialport in general, check out this super helpful [blog post](http://meow.noopkat.com/using-node-serialport-in-an-electron-app/) by [@noopkat](https://github.com/noopkat)

##Running the app
After setting up the [hardware](https://github.com/sofroniewn/electron-johnny-five-examples/tree/master/7-sensor-led#setting-up-the-hardware) and the [code](https://github.com/sofroniewn/electron-johnny-five-examples/tree/master/7-sensor-led#setting-up-the-code) you are now ready to run the app with 

```
npm start
```

Once the board has been found and the green status light in the top right has turned on, you should be able to click the **start** button in the top left corner. Sensor values will then start being acquired and plotted to the screen using a [lightning](http://lightning-viz.org/) vizualization. If these values exceed a threshold the LED will turn on.

<img src="./assets/screenshot.png" width="500">

**Congrats!** Check out the next example [8-sensor-strobe](https://github.com/sofroniewn/electron-johnny-five-examples/tree/master/8-sensor-strobe)