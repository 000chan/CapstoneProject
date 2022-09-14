#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "./hiredis-master/hiredis-master/hiredis.h"


int main(){
	redisContext *c = redisConnect("127.0.0.1", 6379);
	redisReply *reply;

	if (c == NULL || c->err) {
    		if (c) {
       			printf("Error: %s\n", c->errstr);
        // handle error
    		} else {
        		printf("Can't allocate redis context\n");
    		}
	}else{
		printf("Connected to Redis\n");
	}

	reply = redisCommand(c,"SET %s %s", "foo", "hello world");
   	printf("SET: %s\n", reply->str);
    	freeReplyObject(reply);

	redisFree(c);


	printf("HelloRedis!\n");
	return 0;
}
