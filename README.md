Electrical Energy Inspection Project

Introduction

This project aims to provide real-time monitoring of your electrical power consumption, helping you identify areas for energy conservation and potentially saving you money on your electricity bills.  It's inspired by the common concern of forgetting to turn off appliances, especially when rushing in the morning.

Components

Arduino ESP32 (image: ): A powerful microcontroller board with built-in Wi-Fi and Bluetooth capabilities. It will be the heart of your project, collecting data from the PZEM-004T sensor and communicating with the cloud.
Image of Arduino ESP32Opens in a new window
store.arduino.cc
Arduino ESP32
PZEM-004T Sensor (image: ): This module measures various electrical parameters, including voltage, current, power, energy consumption (kWh), and frequency. It connects to the ESP32 and delivers the real-time data you need.
Image of PZEM004T sensorOpens in a new window
www.nn-digital.com
PZEM004T sensor
Functionality

Data Collection:

The ESP32 communicates with the PZEM-004T sensor to retrieve real-time readings of voltage, current, power, energy consumption (kWh), and frequency.
Data Transmission:

The ESP32 transmits the collected data to a Google Sheet using the Sheety API. This allows you to easily access the data from any device with an internet connection.
Mobile App (Future Development):

A mobile application built with React Native will be developed to fetch data from the Google Sheet using the Sheety API. This will provide a convenient way to view your real-time energy consumption on your smartphone.
Future Enhancements

Energy Consumption Prediction:
Explore machine learning models to train on the collected data and predict future energy consumption. This can help you optimize your energy usage and potentially save even more.
Automated Energy Saving Actions (Highly Experimental):
Consider implementing automated actions based on the predicted consumption data. This could potentially involve turning off appliances when not in use (with proper safety precautions in mind). Caution: This is a very complex area with safety considerations and potential for unintended consequences. It's strongly recommended to exercise extreme caution and consult with a qualified electrician before attempting any automated control of appliances.
Getting Started

Detailed instructions on hardware setup, software configuration, and code examples will be provided in separate documentation (not included in this README.md).

Disclaimer

While the project promotes energy savings, automated control of appliances can be risky. Always prioritize safety and consult an electrician before implementing such mechanisms.
