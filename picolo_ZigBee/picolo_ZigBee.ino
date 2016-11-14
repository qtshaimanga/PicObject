#include <Servo.h>

Servo myservo;

void setup() {
  //myservo.attach(9);  // attaches the servo on pin 9 to the servo object

  Serial.begin(9600);       //initialize serial
  pinMode(9, OUTPUT);  //set pin 9 as output
}

void loop() {
  while (Serial.available()) { 
    char getData = Serial.read();  
    
    if (getData == '-') {
      myservo.attach(9);
      myservo.write(-200);    //gauche
      delay(200.0);           // duree de la course 
      
      Serial.println("Gauche");
      myservo.detach();

    } else if (getData == '+') {
      myservo.attach(9);
      myservo.write(+200); 
      delay(199.99); 

      Serial.println("Droite");
      myservo.detach();
    }
  }
}

