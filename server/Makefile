.PHONY: all clean test

CC = gcc

#CFALGS
LDFLAGS = -pthread -lmysqlclient


main: main.cpp
	g++ -o main $(mysql_config --cflags) main.cpp $(mysql_config --libs)

clean:
	rm -rf main test

test: test.cpp
	g++ -o test test.cpp
