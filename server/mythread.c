
#include <mysql.h>

void* client_connection( void* arg ) {
	MYSQL_RES *result;
	MYSQLROW row;
	MYSQL *connection, mysql;
	int state;

	// 동기화 이슈
	mysql_init(&mysql);
	connection = mysql_real_connect(&mysql, "localhost", "root",
		"DKUcap23!", "AKBScapstone", 0, 0, 0);

	/* 에러 검사 */
	if(connection == NULL) {
		printf(mysql_error(&mysql));
		return 1;
	}


	int client_sock = (int)arg;
	char msg[BUFFSIZE] = {0};
	int str_len = 0;
	int i;

	struct gps_data Gps;


	while(1) {
		str_len = read(client_sock, msg, sizeof(msg));
		if (str_len <= 0) {
			printf("Session is disconnected ");
			printf("Client [%d] close\n", client_sock);
			break;
		}
		printf("%s\n", msg);


		/* msg = 식별번호 + 경도(180) + 위도(90) */
		pthread_mutex_lock(&g_muxtex);
		strcpy(Gps.UserName, strtok(msg, " "));
		strcpy(Gps.Longitude, strtok(NULL, " "));
		strcpy(Gps.Latitude, strtok(NULL, " "));
		pthread_mutex_unlock(&g_mutex);


		/* Msg Data Processing */

		


	}

	pthread_mutex_lock(&g_mutex);
	for(i = 0; i < g_client_count; i++) {
		if (client_sock == g_client_socks[i]) {
			for(; i < g_client_count -1; i++)
				g_client_socks[i] = g_client_socks[ i + 1];
			break;
		}// end if
	}// end for
	pthread_mutex_unlock(&g_mutex);

	// MySQL에 데이터 삭제 명령 한번 해야함.

	mysql_close(connection);
	close(client_sock);
	pthread_exit(0);
	return NULL;
}
