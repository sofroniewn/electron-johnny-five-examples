#1-led
**This app allows you to control an LED**

##Setting up the hardware

I used an [arduino mega](https://www.arduino.cc/en/Main/ArduinoBoardMega2560) for this example, but any of the [boards](http://johnny-five.io/platform-support/) supported by johnny-five should work.

First you need to make sure the [StandardFirmata](https://github.com/firmata/protocol) firmware is running on the board

- Download the [Arduino IDE](https://www.arduino.cc/en/Main/Software)
- Plug in your Arduino or Arduino compatible microcontroller via USB
- Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
- Click the "Upload" button
- If the upload was successful, the board is now prepared and you can close the Arduino IDE

Connect an LED directly to pin 12

<img src="./assets/board.png" width="500">

##Setting up the code


To run, first clone the repo and npm install the example directory

```
git clone https://github.com/sofroniewn/electron-johnny-five-examples
cd electron-johnny-five-examples/1-led
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
After setting up the [hardware](https://github.com/sofroniewn/electron-johnny-five-examples/tree/master/1-led#setting-up-the-hardware) and the [code](https://github.com/sofroniewn/electron-johnny-five-examples/tree/master/1-led#setting-up-the-code) you are now ready to run the app with 

```
npm start
```

You should see a screen that looks like this:

<img src="./assets/screenshot-disabled.png" width="500">

The **Click me!** button is currently disabled and the board status light in the top right corner is grey while the app tries to connect to the board.

Once the board has been found and is ready the status light will turn green and **Click me!** button will become enabled. The screen should now look like this:

<img src="./assets/screenshot-ready.png" width="500">

If you press **Click me!** the LED should turn on!!!

<img src="./assets/screenshot.png" width="500">

**Congrats!** Check out the next example [2-switch](https://github.com/sofroniewn/electron-johnny-five-examples/tree/master/2-switch)
