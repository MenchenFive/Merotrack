#include <MD5.h>

char aux_str[30];
char aux;

char latitude[15];
char longitude[15];
char altitude[6];
char date[16];
char time[7];
char satellites[3];
char speedOTG[10];
char course[10];

char inChar;
int index;
char inData[200];
char aux_str_digest[100];
char md5_str[50];
char *md5str;

char publichash[]   = "2fLx0CbqRpYwPQ4Y";
char privatehash[]  = "dBvINo3tEKWW4swW";
char pin[]          = "613408";
char apn[]          = "airtelwap.es";
char user_name[]    = "wap@wap";
char password[]     = "wap125";
char url[]          = "http://92.58.189.46:3000/api/positions/arduino";


void setup()
 {
   //Init the driver pins for GSM function
    pinMode(3,OUTPUT);
    pinMode(4,OUTPUT);
    pinMode(5,OUTPUT);
    pinMode(13,OUTPUT);

    digitalWrite(13,LOW);

    digitalWrite(5,HIGH);
    delay(1500);
    digitalWrite(5,LOW); 
    
    Serial.begin(9600);
        // Use these commands instead of the hardware switch 'UART select' in order to enable each mode
    // If you want to use both GMS and GPS. enable the required one in your code and disable the other one for each access.
    digitalWrite(3,LOW);//enable GSM TX、RX
    digitalWrite(4,HIGH);//disable GPS TX、RX
    
    delay(10000);
    start_GSM();
    delay(5000);
    start_GPS();
    delay(120000);

    digitalWrite(13,HIGH);
 }
 
 void loop()    
 {    
   get_GPS();
   delay(1000);
   send_GPRS();
   delay(4000);
 }
 
 void start_GSM(){
     //Configuracion GPRS Claro Argentina
    Serial.println("AT");
    delay(2000);
    Serial.println("AT+CPIN=613408");
    delay(2000);
    Serial.println("AT+CREG?");
    delay(2000);
    Serial.println("AT+SAPBR=3,1,\"APN\",\"airtelwap.es\"");
    delay(2000);
    Serial.println("AT+SAPBR=3,1,\"USER\",\"wap@wap\"");
    delay(2000);
    Serial.println("AT+SAPBR=3,1,\"PWD\",\"wap125\"");
    delay(2000);
    Serial.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
    delay(2000);
    Serial.println("AT+SAPBR=1,1");
    delay(10000);
    Serial.println("AT+HTTPINIT");
    delay(2000);
    Serial.println("AT+HTTPPARA=\"CID\",1");
    delay(2000);
 }
 
 void send_GPRS(){
          generatehash();      
          Serial.print("AT+HTTPPARA=\"URL\",\"http://92.58.189.46:3000/api/positions/arduino?latitude=");
          Serial.print(latitude);
          Serial.print("&longitude=");
          Serial.print(longitude);
          Serial.print("&altitude=0");
          Serial.print(altitude);
          Serial.print("&time=");
          Serial.print(date);
          Serial.print("&satellites=0");
          Serial.print(satellites);
          Serial.print("&speedOTG=0");
          Serial.print(speedOTG);
          Serial.print("&course=0");
          Serial.print(course);
          Serial.print("&vehicle=");
          Serial.print(publichash);
          Serial.print("&sum=");
          Serial.print(md5_str);
          Serial.println("\"");
          delay(2000);
          Serial.println("AT+HTTPACTION=0"); //now GET action
          delay(2000);
 }
 
 
 void start_GPS(){
    Serial.println("AT");
    delay(1000);
    Serial.println("AT+CGPSIPR=9600");// (set the baud rate)
    delay(1000);
    Serial.println("AT+CGPSPWR=1"); // （turn on GPS power supply）
    delay(1000);
    Serial.println("AT+CGPSRST=0"); //（reset GPS in autonomy mode）
    delay(10000); 
 }

 void generatehash(){
    sprintf(aux_str_digest,"%s%s%s%s%s\0",latitude,longitude,date,publichash,privatehash);
    unsigned char* hash = MD5::make_hash(aux_str_digest);
    md5str = MD5::make_digest(hash, 16);
    sprintf(md5_str,"%s\0",md5str);
    free(md5str);
    free(hash);
}


int8_t get_GPS(){

    int8_t counter, answer;
    long previous;

    while( Serial.available() > 0) Serial.read(); 
    Serial.println("AT+CGPSINF=0");

    counter = 0;
    answer = 0;
    memset(inData, '\0', 100);
    previous = millis();

    do{
        if(Serial.available() != 0){    
            inData[counter] = Serial.read();
            counter++;
            
            if (strstr(inData, "OK") != NULL)    
            {
                answer = 1;
            }
        }

    }while((answer == 0) && ((millis() - previous) < 2000)); 

    inData[counter-3] = '\0'; 
    
    strtok(inData, ",");
    strcpy(longitude,strtok(NULL, ",")); // Gets longitude
    strcpy(latitude,strtok(NULL, ",")); // Gets latitude
    strcpy(altitude,strtok(NULL, ".")); // Gets altitude 
    strtok(NULL, ",");    
    strcpy(date,strtok(NULL, ".")); // Gets date
    strtok(NULL, ",");
    strtok(NULL, ",");  
    strcpy(satellites,strtok(NULL, ",")); // Gets satellites
    strcpy(speedOTG,strtok(NULL, ",")); // Gets speed over ground. Unit is knots.
    strcpy(course,strtok(NULL, "\r")); // Gets course

    return answer;
}

/* void read_GPS(){
    
    
    Serial.println("AT+CGPSINF=0");
    
    read_String();
    
    strtok(inData, ",");
    strcpy(longitude,strtok(NULL, ",")); // Gets longitude
    strcpy(latitude,strtok(NULL, ",")); // Gets latitude
    strcpy(altitude,strtok(NULL, ".")); // Gets altitude 
    strtok(NULL, ",");    
    strcpy(date,strtok(NULL, ".")); // Gets date
    strtok(NULL, ",");
    strtok(NULL, ",");  
    strcpy(satellites,strtok(NULL, ",")); // Gets satellites
    strcpy(speedOTG,strtok(NULL, ",")); // Gets speed over ground. Unit is knots.
    strcpy(course,strtok(NULL, "\r")); // Gets course
    
 }
 
 
 void read_String() {
      index=0;
      
      while(Serial.available() > 0) // Don't read unless
                                                  // there you know there is data
   {
       if(index < 199) // One less than the size of the array
       {
           inChar = Serial.read(); // Read a character
           inData[index] = inChar; // Store it
           index++; // Increment where to write next
           inData[index] = '\0'; // Null terminate the string
       }
   }
 }*/
 
