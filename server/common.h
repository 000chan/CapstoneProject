#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <arpa/inet.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <semaphore.h>
#include <pthread.h>
//#include <mysql.h>

#define SERVERPORT      12000
#define CLIENT_MAX      100
#define BUFFSIZE        1024


struct gps_data{
        char UserName[64];
        char Longitude[32];
        char Latitude[32];
        // char MacAdr[32];
};
