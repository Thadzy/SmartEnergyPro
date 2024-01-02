#include <WiFi.h>
#include <HTTPClient.h>

// Replace with your Wi-Fi credentials
const char* ssid = "Siwa";
const char* password = "999999999";

// Replace with your Google Sheets API script ID
const char* scriptId = "AKfycbxX-tbvfIx5NLTBGmglO8-zqHXPkWpJsQf0w9PFspbC6uFHOomPBJcIv1VKl3ODcQubaA";

// PZEM-004T
#define RXD2 16
#define TXD2 17
uint8_t bufferModbus[25];
float fVoltage;
float fCurrent;
float fPower;
float fEnergy;
float fFrequency;
unsigned long timeOut_PZEM = millis();

WiFiClient espClient;

void initWiFi()
{
  Serial.print("Connecting to WiFi");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to AP");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect()
{
  Serial.println("Reconnecting WiFi");
  int status = WiFi.status();
  if (status != WL_CONNECTED)
  {
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
      delay(500);
      Serial.print(".");
    }
    Serial.println("Connected to AP");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  }
}

void setup()
{
  Serial.begin(9600);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
  while (!Serial2)
    ;

  Serial.println("-------------------------");
  Serial.println("ESP32-PZEM-004T-GoogleSheets");
  initWiFi();
}


void loop()
{
  if (WiFi.status() != WL_CONNECTED)
  {
    reconnect();
  }

  if (millis() - timeOut_PZEM > 2222)
  {
    Serial2.write(0xF8);
    Serial2.write(0x04);
    Serial2.write(0x00);
    Serial2.write(0x00);
    Serial2.write(0x00);
    Serial2.write(0x0A);
    Serial2.write(0x64);
    Serial2.write(0x64);
    timeOut_PZEM = millis();
  }

  if (Serial2.available())
  {
    for (int i = 0; i < 25; i++)
    {
      if (!Serial2.available())
      {
        Serial.println("data not match");
        break;
      }
      bufferModbus[i] = Serial2.read();
    }

    uint32_t voltage = (uint32_t)bufferModbus[3] << 8 | (uint32_t)bufferModbus[4];
    uint32_t current = (uint32_t)bufferModbus[5] << 8 | (uint32_t)bufferModbus[6] | (uint32_t)bufferModbus[7] << 24 | (uint32_t)bufferModbus[8] << 16;
    uint32_t power = (uint32_t)bufferModbus[9] << 8 | (uint32_t)bufferModbus[10] | (uint32_t)bufferModbus[11] << 24 | (uint32_t)bufferModbus[12] << 16;
    uint32_t energy = (uint32_t)bufferModbus[13] << 8 | (uint32_t)bufferModbus[14] | (uint32_t)bufferModbus[15] << 24 | (uint32_t)bufferModbus[16] << 16;
    uint32_t frequecy = (uint32_t)bufferModbus[17] << 8 | (uint32_t)bufferModbus[18];

    fVoltage = voltage * 0.1;
    fCurrent = current * 0.001;
    fPower = power * 0.1;
    fEnergy = energy * 0.001;
    fFrequency = frequecy * 0.1;

    Serial.println("------------------------------");
    Serial.println("Voltage = " + String(fVoltage));
    Serial.println("Current = " + String(fCurrent));
    Serial.println("Power   = " + String(fPower));
    Serial.println("Energy  = " + String(fEnergy));
    Serial.println("Freq    = " + String(fFrequency));

    while (Serial2.available())
    {
      Serial2.read();
    }

    sendDataToGoogleSheets(fVoltage, fCurrent, fPower, fEnergy, fFrequency);
  }
  delay(5000);
}

void sendDataToGoogleSheets(float voltage, float current, float power, float energy, float frequency)
{
  HTTPClient http;

  String url = "https://script.google.com/macros/s/" + String(scriptId) + "/exec";
  url += "?voltage=" + String(voltage);
  url += "&current=" + String(current);
  url += "&power=" + String(power);
  url += "&energy=" + String(energy);
  url += "&frequency=" + String(frequency);

  Serial.print("Sending data to Google Sheets...");

  http.begin(url);
  int httpCode = http.GET();
  if (httpCode == HTTP_CODE_OK)
  {
    Serial.println("Failed to send data to Google Sheets");
  }
  else
  {
    Serial.println("Data sent successfully!");
  }
  http.end();
}