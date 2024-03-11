# Electrical Energy Inspection Project

## Introduction

This project aims to provide real-time monitoring of your electrical power consumption, helping you identify areas for energy conservation and potentially saving you money on your electricity bills.  It's inspired by the common concern of forgetting to turn off appliances, especially when rushing in the morning.

## Components

* **Arduino ESP32** (image: [https://static.cytron.io/image/cache/catalog/products/NODEMCU-ESP32/NODEMCU-ESP32-800x800.jpg])
* **PZEM-004T Sensor** (image: [https://esphome.io/_images/pzem-ac.png])

## Hardware Architecture
(image: [https://media.discordapp.net/attachments/821655672536956942/1216679242377592912/image.png?ex=660143d8&is=65eeced8&hm=4552127bcd29e7637fd6b3d2e51fd5b18390aca26f4b10faad2593fbad6f33d7&=&format=webp&quality=lossless&width=1052&height=662])
## Functionality

1. **Data Collection:**
   - The ESP32 communicates with the PZEM-004T sensor to retrieve real-time readings of voltage, current, power, energy consumption (kWh), and frequency.

2. **Data Transmission:**
   - The ESP32 transmits the collected data to a Google Sheet using the Sheety API. This allows you to easily access the data from any device with an internet connection.

3. **Mobile App (Future Development):**
   - A mobile application built with React Native will be developed to fetch data from the Google Sheet using the Sheety API. This will provide a convenient way to view your real-time energy consumption on your smartphone.

## Future Enhancements

* **Energy Consumption Prediction:**
   - Explore machine learning models to train on the collected data and predict future energy consumption. This can help you optimize your energy usage and potentially save even more.
* **Automated Energy Saving Actions (Highly Experimental):**
   - Consider implementing automated actions based on the predicted consumption data. This could potentially involve turning off appliances when not in use (with proper safety precautions in mind).  **Caution**: This is a very complex area with safety considerations and potential for unintended consequences. It's strongly recommended to exercise extreme caution and consult with a qualified electrician before attempting any automated control of appliances. 

## Getting Started

Detailed instructions on hardware setup, software configuration, and code examples will be provided in separate documentation (not included in this README.md).

## Disclaimer

- While the project promotes energy savings, automated control of appliances can be risky. Always prioritize safety and consult an electrician before implementing such mechanisms.
