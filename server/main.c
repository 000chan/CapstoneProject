#include "common.h"
#include "mythread.h"



int g_client_socks[CLIENT_MAX];
int g_client_count;
pthread_mutex_t g_mutex;



/*
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
		printf("%s\n ", msg);

		/*  msg = 식별번호  +  경도(180) +  위도 (90) + 맥주소 *

		strcpy(Gps.id_num, strtok(msg," "));
		strcpy(Gps.longitude, strtok(NULL," "));
		strcpy(Gps.latitude, strtok(NULL," "));
		strcpy(Gps.macadr, strtok(NULL, ""));

		/* msg data processing */


		/* Redis Part *
		printf("hmset %s longitude %s latitude %s macadr %s", Gps.id_num, Gps.longitude, Gps.latitude, Gps.macadr);
		reply = redisCommand(c,"hmset %s longitude %s latitude %s macadr %s",
				     Gps.id_num,
				     Gps.longitude,
				     Gps.latitude,
				     Gps.macadr);
		printf("%s Good\n", reply->str);
		freeReplyObject(reply);
		printf("-------------------------------------------------------\n\n");


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
//*/



int main(int argc, char** argv) {

	/* Deamon process code*/
	int pid;

	/////////////////////////////

	int listen_sock;
	int client_sock;

	pthread_t t_thread;


	struct sockaddr_in server_addr;
	memset(&server_addr, 0, sizeof(server_addr));

	struct sockaddr_in client_addr;
	int client_addr_size;


	pthread_mutex_init(&g_mutex, NULL);

	listen_sock = socket(AF_INET, SOCK_STREAM, 0);

	server_addr.sin_family = AF_INET;
	server_addr.sin_addr.s_addr = htonl(INADDR_ANY);
	server_addr.sin_port = htons(SERVERPORT);


	if (bind(listen_sock, (struct sockaddr*)&server_addr, sizeof(server_addr)) == -1) {
		err_quit("bind()");
	}

	/* fork() for Deamon  */
	pid = fork();
	if (pid > 0){
		printf("Parent process id: %d \n", getpid());
		exit(0);
	}
	else if (pid == 0) {
		sleep(1);
		printf("Childprocess pid: %d, ppid: %d\n",getpid(), getppid());
		close(0);	close(1);	close(2);
		setsid();
		printf("Deamon Process started");

	}
	//////////////////////////////

	int retval;

	if (listen(listen_sock, SOMAXCONN) == -1) {
		err_quit("listen()");
	}

		//* Nonblocking Socket
	int flags = fcntl(listen_sock, F_GETFL);
	flags |= 0_NONBLOCK;
	fcntl(listen_sock, F_SETFL, flags);
	//*/

	// TCP SO_KEEPALIVE Option
	int bEnable = 1;
	if(setsockopt(listen_sock, SOL_SOCKET, SO_KEEPALIVE, &bEnable, sizeof(bEnable)) == SO_ERROR)
		err_quit("setsockopt()");


	// TCP SO_LINGER Option
	struct linger optval;
	optval.l_onoff = 0;
	optval.l_linger = 0;
	// Make TIME_WAIT 0
	retval = setsockopt(listen_sock, SOL_SOCKET, SO_LINGER, &optval, sizeof(optval));
	if(retval == SOCKET_ERROR)
		err_quit("setsockopt()");






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
