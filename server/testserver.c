#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include<arpa/inet.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<pthread.h>

#include"./hiredis-master/hiredis-master/hiredis.h"


#define CLIENT_MAX 10
#define BUFFSIZE 1000


int g_client_socks[CLIENT_MAX];
int g_client_count = 0;
pthread_mutex_t g_mutex;


struct gps_data {
	char id_num[10];
	char longitude[30];
	char latitude[30];
	char macadr[20];
};



void* client_connection(void* arg) {

	// redis part /////////////////////
	redisContext *c = redisConnect("127.0.0.1", 6379);
	redisReply *reply;

	if (c == NULL || c -> err) {
		if (c) {
			printf("Error: %s\n", c->errstr);
			// handle error
		} else {
			printf("Can't allocate redis context\n");
		}
	}else {
		printf("Connected to Redis\n");
	}
	/////////////////////////////////////////////////////////////////


	int client_sock = (int)arg;
	char msg[BUFFSIZE];
	int str_len = 0;
	int i;

	struct gps_data Gps;


	while (1) {
		str_len = read(client_sock, msg, sizeof(msg));

		if (str_len <= 0) {
			printf("session is disconnected ");
			printf("client[%d] close\n", client_sock);
			break;
			}
		//printf("%d",str_len);
		printf("%s\n ", msg);

		/*  msg = 식별번호  +  경도(180) +  위도 (90) */
		//part = strtok(msg," ");
		//while (part != NULL){
		//	message[j++] = part;
		//	part = strtok(NULL, " ");

//		pthread_mutex_lock(&g_mutex);

		strcpy(Gps.id_num, strtok(msg," "));
		//printf("please %s\n\n",Gps.id_num);
		strcpy(Gps.longitude, strtok(NULL," "));
		//printf("please %s\n",Gps.id_num);
		//printf("please %s\n\n",Gps.longitude);
		strcpy(Gps.latitude, strtok(NULL," "));
		//printf("please %s\n",Gps.id_num);
		//printf("please %s\n",Gps.longitude);
		//printf("please %s\n\n",Gps.latitude);
		strcpy(Gps.macadr, strtok(NULL, ""));

		/* msg data processing */


		/* Redis Part */
		//printf("GEOADD position %s %s %s\n", Gps.longitude, Gps.latitude, Gps.id_num);
		//reply = redisCommand(c,"GEOADD position %s %s %s", Gps.longitude, Gps.latitude, Gps.id_num);
		printf("hmset %s longitude %s latitude %s macadr %s\n", Gps.id_num, Gps.longitude, Gps.latitude, Gps.macadr);
		reply = redisCommand(c, "hmset %s longitude %s latitude %s macadr %s", Gps.id_num, Gps.longitude, Gps.latitude, Gps.macadr);
		printf("%s Good\n", reply->str);
		freeReplyObject(reply);
		printf("-------------------------------------------------------\n\n");


//		pthread_mutex_unlock(&g_mutex);



		}


	pthread_mutex_lock(&g_mutex);
	for (i = 0; i < g_client_count; i++) {
		if (client_sock == g_client_socks[i]) {
			for (;i < g_client_count - 1;i++)
				g_client_socks[i] = g_client_socks[i + 1];
			break;
		}//end if
	}//end for
	pthread_mutex_unlock(&g_mutex);


	redisFree(c);
	close(client_sock);
	pthread_exit(0);
	return NULL;

}




int main(int argc, char** argv) {




	int server_sock;
	int client_sock;

	pthread_t t_thread;


	struct sockaddr_in server_addr;
	struct sockaddr_in client_addr;
	int client_addr_size;


	pthread_mutex_init(&g_mutex, NULL);
	server_sock = socket(PF_INET, SOCK_STREAM, 0);


	server_addr.sin_family = AF_INET;
	server_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	server_addr.sin_port = htons(12000);



	if (bind(server_sock, (struct sockaddr*)&server_addr, sizeof(server_addr)) == -1) {
		printf("bind error");
	}

	if (listen(server_sock, 5) == -1) {
		printf("listen error");
	}


	char buff[200];
	int recieve_len = 0;

	while (1) {
		client_addr_size = sizeof(client_addr);
		client_sock = accept(server_sock, (struct sockaddr*)&client_addr, &client_addr_size);

		pthread_mutex_lock(&g_mutex);
		g_client_socks[g_client_count++] = client_sock;
		pthread_mutex_unlock(&g_mutex);

		pthread_create(&t_thread, NULL, client_connection, (void*)client_sock);


	}

	//close(client_sock);

};