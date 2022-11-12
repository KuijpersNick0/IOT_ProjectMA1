
//Transmit via lora includes
#include <SPI.h>
#include <LoRa.h>

// include the DHT Sensor Library
#include "DHT.h"

// DHT digital pin and sensor type
#define DHTPIN 12
#define DHTTYPE DHT11

// Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE, 15);

void setup() {
  
   // Serial
  Serial.begin(9600);

  // Init DHT 
  dht.begin();

  while(!Serial);
  Serial.println("LoRa Sender");

  if(!LoRa.begin(433E6)){
    Serial.println("Starting LoRa failed!");
    while(1);
  }
}

void loop() {
  
  // Reading temperature and humidity
  float humidity = dht.readHumidity();
  
  // Read temperature as Celsius
  float temperature = dht.readTemperature();

  Serial.println("Sending packet: ");

  //Send packet
  LoRa.beginPacket();
  
  LoRa.print("Humidity: ");
  LoRa.print(humidity);
  LoRa.print("%");

  LoRa.print("Temperature: ");
  LoRa.print(temperature);
  LoRa.print("C");

  LoRa.endPacket();

  delay(1000);
  
  // Display
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" C");

  

  // Wait  
  delay(500);
}
