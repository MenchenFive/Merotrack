// C code for DFRobot SIM908 Arduino gprs/gps/gsm shield module.
// Original template cloned from DFRobot's github: 
// https://github.com/DFRobot/GPS-GPRS-GSM-Shield-V3.0/tree/master/geoLocator
// Original implementation by N4RF

// TO-DO Implement security protocol for merotracker


// Important parameters:
char apnname[]      = "airtelwap.es";
char apnuser[]      = "wap@wap";
char apnpassword[]  = "wap125";
char baseurl[]      = "merotracker.duckdns.org:3000/trackapi/vehicle_positions";

// Other global variables
char aux_str[30];
char aux;

char latitude[15];
char longitude[15];

char inChar;
int index;
char inData[200];


void setup() {
    //Init the driver pins for GSM function
    pinMode(3,OUTPUT);
    pinMode(4,OUTPUT);
    pinMode(5,OUTPUT);
    
    //Output GSM Timing 
    digitalWrite(5,HIGH);
    delay(1500);
    digitalWrite(5,LOW); 
    
    Serial.begin(9600);
    
    digitalWrite(3,LOW);//enable GSM
    digitalWrite(4,HIGH);//disable GPS
    
    delay(5000);

    start_GSM();
    
    delay(10000);
    
    start_GPS();
}

void loop()    
{    
   read_GPS();
   delay(2000);
   send_GPRS();
   delay(15000);
 }
 
 void start_GSM(){
     //Configuracion GPRS Claro Argentina
    Serial.println("AT");
    delay(2000);
    Serial.println("AT+CREG?");
    delay(2000);
    Serial.print("AT+SAPBR=3,1,\"APN\",\"");
    Serial.print(apnname);
    Serial.println("\"");
    delay(2000);
    Serial.print("AT+SAPBR=3,1,\"USER\",\"");
    Serial.print(apnuser);
    Serial.println("\"");
    delay(2000);
    Serial.print("AT+SAPBR=3,1,\"PWD\",\"");
    Serial.print(apnpassword);
    Serial.println("\"");
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
    Serial.print("AT+HTTPPARA=\"URL\",\"89.44.60.42:3000/trackapi/vehicle_positions?latitude=");
    Serial.print(latitude);
    Serial.print("&longitude=");
    Serial.print(longitude);
    Serial.println("\"");
    delay(2000);
    Serial.println("AT+HTTPACTION=0"); // 0-get, 1-post, 2-head
    delay(2000);
 }
 
 void start_GPS(){
    Serial.print("AT");
    delay(1000);
    Serial.println("AT+CGPSIPR=9600");// (set the baud rate)
    delay(1000);
    Serial.println("AT+CGPSPWR=1"); // （turn on GPS power supply）
    delay(1000);
    Serial.println("AT+CGPSRST=1"); //（reset GPS in autonomy mode）
    delay(10000); //delay para esperar señal del GPS
 }
 
 void read_GPS(){
    Serial.println("AT+CGPSINF=0");
    
    read_String();
    
    strtok(inData, ",");
    strcpy(longitude,strtok(NULL, ",")); // Gets longitude
    strcpy(latitude,strtok(NULL, ",")); // Gets latitude
    
    
    convert2Degrees(latitude);
    convert2Degrees(longitude);
}
 
void read_String() {
    index=0;
      
    while(Serial.available() > 0) // Don't read unless you know there is data
    {
        if(index < 199) // One less than the size of the array
        {
           inChar = Serial.read(); // Read a character
           inData[index] = inChar; // Store it
           index++; // Increment where to write next
           inData[index] = '\0'; // Null terminate the string
        }
    }
}
 
int8_t convert2Degrees(char* input){
    float deg;
    float minutes;
    boolean neg = false;    

    //aux var
    char aux[10];

    if (input[0] == '-')
    {
        neg = true;
        strcpy(aux, strtok(input+1, "."));

    }
    else
    {
        strcpy(aux, strtok(input, "."));
    }

    deg = atof(aux);

    strcpy(aux, strtok(NULL, '\0'));
    minutes=atof(aux);
    minutes/=1000000;
    if (deg < 100)
    {
        minutes += deg;
        deg = 0;
    }
    else
    {
        minutes += int(deg) % 100;
        deg = int(deg) / 100;    
    }

    deg=deg+minutes/60;


    if (neg == true)
    {
        deg*=-1.0;
    }

    neg = false;

    if( deg < 0 ){
        neg = true;
        deg*=-1;
    }
    
    float numberFloat=deg; 
    int intPart[10];
    int cifra; 
    long number=(long)numberFloat;  
    int size=0;
    
    while(1){
        size=size+1;
        cifra=number%10;
        number=number/10;
        intPart[size-1]=cifra; 
        if (number==0){
            break;
        }
    }
   
    int indx=0;
    if( neg ){
        indx++;
        input[0]='-';
    }
    for (int i=size-1; i >= 0; i--)
    {
        input[indx]=intPart[i]+'0'; 
        indx++;
    }

    input[indx]='.';
    indx++;

    numberFloat=(numberFloat-(int)numberFloat);
    for (int i=1; i<=6 ; i++)
    {
        numberFloat=numberFloat*10;
        cifra= (long)numberFloat;          
        numberFloat=numberFloat-cifra;
        input[indx]=char(cifra)+48;
        indx++;
    }
    input[indx]='\0';

}
