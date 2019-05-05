/* 
*   C code for DFRobot SIM908 Arduino gprs/gps/gsm shield module.
*   Original template based on DFRobot's github geoLocator, based on N4RF's work: 
*   https://github.com/DFRobot/GPS-GPRS-GSM-Shield-V3.0/tree/master/geoLocator
*   Improved version with error and response control based on cooking-hacks/libelium work:
*   http://www.libelium.com 
*   httpS://www.cooking-hacks.com/documentation/tutorials/geolocation-tracker-gprs-gps-geoposition-sim908-arduino-raspberry-pi#realtime-geolocation-tracking
*   Using tzikis md5 embeddable library
*
*   Security double-hash protocol for Merotracker project by Alberto Menchen
*/

#include <MD5.h>

char pin[]          = "613408";
char apn[]          = "airtelwap.es";
char user_name[]    = "wap@wap";
char password[]     = "wap125";
char url[]          = "http://92.58.189.46:3000/api/positions/arduino";
char publichash[]   = "2fLx0CbqRpYwPQ4Y";
char privatehash[]  = "dBvINo3tEKWW4swW";

char latitude[15];
char longitude[15];
char altitude[6];
char date[16];
char time[7];
char satellites[3];
char speedOTG[10];
char course[10];
char checksum[32];
int8_t answer;
char data[100];
int data_size;
char aux_str[100];
char aux;
int x = 0;
char N_S,W_E;
char frame[300];
char *md5str;


void setup(){

    pinMode(3,OUTPUT);
    pinMode(4,OUTPUT);
    pinMode(5,OUTPUT);
    pinMode(13,OUTPUT);

    digitalWrite(13,LOW);
    
    digitalWrite(5,HIGH);
    delay(1500);
    digitalWrite(5,LOW); 
    
    Serial.begin(9600);
    
    digitalWrite(3,LOW);//enable GSM
    digitalWrite(4,HIGH);//disable GPS
    
    delay(2000);

    power_on();

    delay(2000);

    //sets the PIN code
    snprintf(aux_str, sizeof(aux_str), "AT+CPIN=%s", pin);
    sendATcommand(aux_str, "OK", 2000);

    delay(2000);

    while (sendATcommand("AT+CREG?", "+CREG: 0,1", 2000) == 0);

    delay(2000);
    
    snprintf(aux_str, sizeof(aux_str), "AT+SAPBR=3,1,\"APN\",\"%s\"", apn);
    sendATcommand(aux_str, "OK", 2000);
    
    delay(2000);
    
    snprintf(aux_str, sizeof(aux_str), "AT+SAPBR=3,1,\"USER\",\"%s\"", user_name);
    sendATcommand(aux_str, "OK", 2000);
    
    delay(2000);
    
    snprintf(aux_str, sizeof(aux_str), "AT+SAPBR=3,1,\"PWD\",\"%s\"", password);
    sendATcommand(aux_str, "OK", 2000);
    
    delay(2000);

    sendATcommand("AT+SAPBR=3,1,\"Contype\",\"GPRS\"", "OK", 2000);

    delay(2000);

    // gets the GPRS bearer
    while (sendATcommand("AT+SAPBR=1,1", "OK", 20000) == 0)
    {
        delay(2000);
    }

    sendATcommand("AT+HTTPINIT", "OK", 10000);

    delay(2000);

    sendATcommand("AT+HTTPPARA=\"CID\",1", "OK", 5000);

    delay(5000);

    sendATcommand("AT+CGPSIPR=9600", "OK", 2000);

    delay(2000);
    
    sendATcommand("AT+CGPSPWR=1", "OK", 2000);

    delay(2000);
    
    sendATcommand("AT+CGPSRST=0", "OK", 2000);

    delay(2000);
    
    start_GPS();

    delay(2000);
 
    digitalWrite(13,HIGH);

}

void loop()
{
    get_GPS();

    delay(3000);
    
    send_HTTP();
            
    delay(5000);
}

void generatehash(){
    sprintf(aux_str,"%s%s%s%s%s\0",latitude,longitude,date,publichash,privatehash);
    unsigned char* hash = MD5::make_hash(aux_str);
    md5str = MD5::make_digest(hash, 16);
    sprintf(aux_str,"%s",md5str);
    free(md5str);
    free(hash);
}

void power_on(){

    uint8_t answer=0;

    answer = sendATcommand("AT", "OK", 2000);
    if (answer == 0)
    {
        while(answer == 0){    
            answer = sendATcommand("AT", "OK", 2000);    
        }
    }

}

int8_t start_GPS(){
    while(( (sendATcommand("AT+CGPSSTATUS?", "2D Fix", 5000) || 
        sendATcommand("AT+CGPSSTATUS?", "3D Fix", 5000)) == 0 ));
}

int8_t get_GPS(){

    int8_t counter, answer;
    long previous;

    while( Serial.available() > 0) Serial.read(); 
    sendATcommand("AT+CGPSINF=0", "AT+CGPSINF=0\r\n\r\n", 2000);

    counter = 0;
    answer = 0;
    memset(frame, '\0', 100);
    previous = millis();

    do{

        if(Serial.available() != 0){    
            frame[counter] = Serial.read();
            counter++;
            
            if (strstr(frame, "OK") != NULL)    
            {
                answer = 1;
            }
        }

    }
    while((answer == 0) && ((millis() - previous) < 2000));  

    frame[counter-3] = '\0'; 
    
    strtok(frame, ",");
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

void send_HTTP(){
            sprintf(aux_str, "AT+HTTPPARA=\"URL\",\"%s", url);
            Serial.print(aux_str);
            sprintf(frame, "?visor=false&latitude=%s&longitude=%s&altitude=%s&time=%s&satellites=%s&speedOTG=%s&course=%s\0",
            latitude, longitude, altitude, date, satellites, speedOTG, course);
            Serial.print(frame);
            sendATcommand("\"", "OK", 5000);
            sendATcommand("AT+HTTPACTION=0", "+HTTPACTION:0,200", 30000);
            delay(5000);
}


int8_t sendATcommand(char* ATcommand, char* expected_answer1, unsigned int timeout){

    uint8_t x=0,  answer=0;
    char response[100];
    unsigned long previous;

    memset(response, '\0', 100);    // Initialize the string

    delay(100);

    while( Serial.available() > 0) Serial.read();    // Clean the input buffer

    Serial.println(ATcommand);    // Send the AT command 


        x = 0;
    previous = millis();

    // this loop waits for the answer
    do{
        if(Serial.available() != 0){    
            response[x] = Serial.read();
            x++;
            // check if the desired answer is in the response of the module
            if (strstr(response, expected_answer1) != NULL)    
            {
                answer = 1;
            }
        }
        // Waits for the asnwer with time out
    }
    while((answer == 0) && ((millis() - previous) < timeout));    

    return answer;
}
    
