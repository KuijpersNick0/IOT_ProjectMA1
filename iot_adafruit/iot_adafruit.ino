
// include the DHT Sensor Library
#include "DHT.h"

// DHT digital pin and sensor type
#define DHTPIN 12
#define DHTTYPE DHT11

// Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE, 15);

void setup() {
  // put your setup code here, to run once:
  
   // Serial
  Serial.begin(115200);

  // Init DHT 
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  
  // Reading temperature and humidity
  float humidity = dht.readHumidity();
  
  // Read temperature as Celsius
  float temperature = dht.readTemperature();

  // Display
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" C");

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  // Wait  
  delay(500);

}
