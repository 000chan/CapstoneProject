#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <fcntl.h>

#include <unistd.h>
#include <string.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <netdb.h>
#include <errno.h>


char* SERVERIP = (char*)"127.0.0.1";
#define SERVERPORT	12000
#define BUFSIZE		512

int main()
{
	int retval;

	int sock = socket(AF_INET, SOCK_STREAM, 0);
	
	struct sockaddr_in serveraddr;
	memset(&serveraddr, 0, sizeof(serveraddr));
	serveraddr.sin_family = AF_INET;
	inet_pton(AF_INET, SERVERIP, &serveraddr.sin_addr);
	serveraddr.sin_port = htons(SERVERPORT);

	connect(sock, (struct sockaddr*)&serveraddr,sizeof(serveraddr));


	char buf[BUFSIZE + 1] = "0 Device1 30.144 30.155 \0";
	while (1)
	{

		send(sock, buf, (int)strlen(buf), 0);
	        printf("%s\n",buf);



		sleep(3);
	}


}
