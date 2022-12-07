#include <iostream>
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
#include <mysql.h>
#include <errno.h>

#define __LOG__


// define
#define SERVERPORT					12000
#define LOCAL_BUF_SIZE				256
#define RECV_GPS_DATA				0
#define RECV_NONE_GPS_DATA			1
#define RECV_TERMINATE				2
#define FIRST_RECV					3
#define	MAX_CLIENT					63
#define DEFAULT_RING_BUF_SIZE		1024
#define MAXFD						63

// 클래스 정의
template <typename T>
class CList
{
public:
	struct Node
	{
		T _data;
		Node* _Prev;
		Node* _Next;
	};

	class iterator
	{
	private:
	public:
		Node* _node;

	public:
		/* iterator();  */
		iterator(Node* node = nullptr) :_node(node) { }
		~iterator() { }

		iterator operator++(int)
		{
			iterator temp = *this;
			this->_node = this->_node->_Next;
			return temp;
		}
		iterator& operator++()
		{
			this->_node = this->_node->_Next;
			return *this;
		}
		iterator operator --(int)
		{
			iterator temp = *this;
			this->_node = this->_node->_Prev;
			return temp;
		}
		iterator& operator --()
		{
			this->_node = this->_node->_Prev;
			return *this;
		}
		T& operator*()
		{
			return this->_node->_data;
		}
		bool operator ==(const iterator& other)
		{
			if (this->_node == other._node)
				return true;
			return false;
		}
		bool operator!=(const iterator& other)
		{
			if (this->_node != other._node)
				return true;
			return false;
		}
	};

public:
	CList() :_size(0)
	{
		this->_head._Next = &this->_tail;
		this->_tail._Prev = &this->_head;

		this->_head._Prev = nullptr;
		this->_tail._Next = nullptr;

		this->_head._data = { 0, };
		this->_tail._data = { 0, };
	}
	~CList() {	}
	iterator begin()
	{
		CList<T>::iterator iter(this->_head._Next);
		return iter;
	}
	iterator end()
	{
		iterator iter(&this->_tail);
		return iter;
	}
	void push_front(T data);
	void push_back(T data);
	void pop_front();
	void pop_back();
	void clear();
	int size();
	bool empty();

	iterator erase(iterator iter)
	{
		iterator tmpIter = iter;
		++tmpIter;
		iter._node->_Prev->_Next = iter._node->_Next;
		iter._node->_Next->_Prev = iter._node->_Prev;
		delete iter._node;
		(this->_size)--;
		return tmpIter;
	}

	void remove(T Data)
	{
		CList<T>::iterator iter;
		for (iter = this->begin(); iter != this->end(); ++iter)
		{
			if (*iter == Data)
				erase(iter);
		}
	}
private:
	int _size;
	Node _head;
	Node _tail;
};


class CRingBuffer
{
public:
	CRingBuffer(void);
	CRingBuffer(int iBufferSize);
	~CRingBuffer();

	int GetBufferSize(void)		const;
	int	GetUseSize(void);
	int	GetFreeSize(void);

	int	Enqueue(char* chpData, int iSize);
	int	Dequeue(char* chpDest, int iSize);

	void ClearBuffer(void);

private:
	int iBufferSize;
	char* FrontPos;
	char* RearPos;
	char* MaxFrontPos;
	char* RingBufferQueue;
	char* Start;
	char* End;
};




// 구조체 정의.
typedef struct stUser
{
	int _flag;
	char deviceName[32];
	int targetNum;
	int userNum;
	char Longitude[16];
	char Latitude[16];
	int sock;
	CRingBuffer* RecvQ;

}stUSER;



// 전역 변수 정의
int g_listen_sock;
int g_nTotalClient;
CList<stUSER*> ObjectList;
char buf[LOCAL_BUF_SIZE];



MYSQL_RES* result;
MYSQL_ROW row;
MYSQL* connection, mysql;



// 사용할 함수 선언
bool AcceptProc();
bool RecvProc(stUSER*);
bool Disconnect(stUSER*);




// 메인 함수.
int main(int argc, char** argv)
{

	////////////////////////////////////////////////////////////////////////
	//		데몬 프로세스 생성 구간.
	///////////////////////////////////////////////////////////////////////

	int pid;
#ifndef __LOG__
	pid = fork();
	if (pid > 0) {
		printf("Parent process id: %d \n", getpid());
		exit(0);
	}
	else if (pid == 0) {
		sleep(1);
		printf("Childprocess pid: %d, ppid: %d\n", getpid(), getppid());
		close(0);       close(1);       close(2);
		setsid();
		printf("Deamon Process started");
	}
#endif
	int retval;

	g_listen_sock = socket(AF_INET, SOCK_STREAM, 0);
	if (g_listen_sock == -1)
	{
		printf("listen_sock");
		return -1;
	}

	struct sockaddr_in serveraddr;
	memset(&serveraddr, 0, sizeof(serveraddr));
	serveraddr.sin_family = AF_INET;
	serveraddr.sin_addr.s_addr = htonl(INADDR_ANY);
	serveraddr.sin_port = htons(SERVERPORT);
	retval = bind(g_listen_sock, (struct sockaddr*)&serveraddr, sizeof(serveraddr));
	if (retval == -1)
	{
		printf("bind()");
		return -1;
	}


	retval = listen(g_listen_sock, SOMAXCONN);
	if (retval == -1)
	{
		printf("listen()");
		return -1;
	}
#ifdef __LOG__
	printf("listen() ###########\n");
#endif

	// TCP SO_KEEPALIVE Option
	//*
	int bEnable = 1;
	if (( setsockopt(g_listen_sock, SOL_SOCKET, SO_KEEPALIVE, &bEnable, sizeof(bEnable)) ) == -1)
	{
		return -1;
	}
#ifdef __LOG__
	printf("SO_KERRPALIVE socket setting ###########\n");
#endif
	//*/


	// TCP SO_LINGER Option
	struct linger optval1;
	optval1.l_onoff = 0;
	optval1.l_linger = 0;
	// Make TIME_WAIT 0
	retval = setsockopt(g_listen_sock, SOL_SOCKET, SO_LINGER, &optval1, sizeof(optval1));
	if (retval == -1)
	{
		return -1;
	}
#ifdef __LOG__
		printf("SO_LINGER socket setting ###########\n");
#endif
	


	int flags;
	flags = fcntl(g_listen_sock, F_GETFL);
	flags |= O_NONBLOCK;
	fcntl(g_listen_sock, F_SETFL, flags);
#ifdef __LOG__
	printf("Non-blocking socket setting ###########\n");
#endif
	
	

	/* Connect Locol host Database */
	mysql_init(&mysql);
	connection = mysql_real_connect(&mysql, "localhost", "root",
		"DKUcap23!", "AKBScapstone", 0, 0, 0);
	if (connection == NULL)
	{
		printf("mysql_error(&mysql)");
		return 1;
	}
#ifdef __LOG__
	printf("Conect to MySQL ###########\n");
#endif


	fd_set rset;
	stUSER* pSession;

	while (1)
	{
		FD_ZERO(&rset);
		FD_SET(g_listen_sock, &rset);

		CList<stUSER*>::iterator set_iter = ObjectList.begin();
		for (; set_iter != ObjectList.end(); ++set_iter)
		{
			pSession = *set_iter;
			FD_SET(pSession->sock, &rset);
		}

		retval = select(MAXFD, &rset, NULL, NULL, NULL);
#ifdef __LOG__
		printf("# 반응이 온 Socket의 수 : %d\n", retval);
#endif
		if (retval == -1)
		{
#ifdef __LOG__
			printf("# Error :: 잘못된 Socket이 세팅되었습니다.\n");
#endif
			continue;
		}
		if (retval > 0)
		{
			if (FD_ISSET(g_listen_sock, &rset))
			{
				AcceptProc();
			}
			CList<stUSER*>::iterator isset_iter = ObjectList.begin();
			for (; isset_iter != ObjectList.end(); ++isset_iter)
			{
				if (*isset_iter == nullptr)
				{
					continue;
				}
				if (FD_ISSET((*isset_iter)->sock, &rset))
				{
					RecvProc((*isset_iter));
				}
			}// end for

		}// end if
		CList<stUSER*>::iterator erase_iter = ObjectList.begin();
		for (; erase_iter != ObjectList.end(); )
		{
			if (*erase_iter == nullptr)
			{
				erase_iter = ObjectList.erase(erase_iter);
				continue;
			}
			++erase_iter;
		}
	}



	mysql_free_result(result);
	mysql_close(connection);
	close(g_listen_sock);


	return 0;
}

// 함수 선언

bool AcceptProc()
{
	if (g_nTotalClient >= MAX_CLIENT)
	{
#ifdef __LOG__
		printf("# Warning :: 더 이상 연결할 수 없습니다.\n");
#endif
		return false;
	}

	stUSER* _ptr;
	char addr[INET_ADDRSTRLEN];

	_ptr = new stUSER;

	struct sockaddr_in clientaddr;
	int addrlen = sizeof(clientaddr);

	_ptr->sock = accept(g_listen_sock, (struct sockaddr*)&clientaddr, (socklen_t*)&addrlen);
	if (_ptr->sock == -1)
	{

#ifdef __LOG__
		printf("accept() Error ###############\n");
#endif
		return false;
	}
	g_nTotalClient++;

	inet_ntop(AF_INET, &clientaddr.sin_addr, addr, sizeof(addr));

#ifdef __LOG__
	printf("# 연결된 Client 소켓의 정보 // IP : %s, Port, %d\n", addr, ntohs(clientaddr.sin_port));
	printf("# 현재 연결된 Client의 수 : %d\n", g_nTotalClient);
#endif

	_ptr->_flag = false;
	_ptr->Latitude[0] ='\0';
	_ptr->Longitude[0] = '\0';
	_ptr->RecvQ = new CRingBuffer(1460);

	ObjectList.push_back(_ptr);
	return true;
}

bool RecvProc(stUSER* p_user_info)
{
	
	int retval;
	int readRetval;
	char* temp;
	int protocol;
	int mysql_state;
	char sqlBuf[LOCAL_BUF_SIZE];

	memset(buf, 0, LOCAL_BUF_SIZE);

	int getSize;
	if (p_user_info->RecvQ->GetFreeSize() > LOCAL_BUF_SIZE)
	{
		getSize = LOCAL_BUF_SIZE;
	}
	else
	{
		getSize = p_user_info->RecvQ->GetFreeSize();
	}

	readRetval = recv(p_user_info->sock, buf, getSize, 0);
	if (readRetval == -1)
	{
		if (readRetval != EWOULDBLOCK)
		{
			Disconnect(p_user_info);
			return true;
		}
		//Disconnect(p_user_info);
	}
	else if(readRetval == 0)
	{
		Disconnect(p_user_info);
		return true;
	}

	if ((retval = p_user_info->RecvQ->Enqueue(buf, readRetval)) != readRetval)
	{
		return false;
	}


	temp = strtok(buf, " ");
	protocol = atoi(temp);

	if (p_user_info->_flag != true)
	{
		temp = strtok(NULL, " ");
		strcpy(p_user_info->deviceName, temp);

		memset(sqlBuf, 0, LOCAL_BUF_SIZE);
		sprintf(sqlBuf, "SELECT TargetNum,UserNum FROM Device WHERE DeviceName = \'%s\';", p_user_info->deviceName);
#ifdef __LOG__
		printf("## %s :: %s\n", p_user_info->deviceName, sqlBuf);
#endif
		mysql_state = mysql_query(connection, sqlBuf);
		if (mysql_state != 0)
		{
			printf("잘못된 mysql 연결\n");
			return false;
		}
		result = mysql_store_result(connection);
		/*
		if (result > 1)
		{
			printf("중복된 디바이스 소유자\n");
			return false;
		}
		else if (result == 0)
		{
			printf("잘못된 디바이스 이름\n");
			return false;
		}
		//*/

		while ((row = mysql_fetch_row(result)) != NULL)
		{
		p_user_info->targetNum = atoi(row[0]);
		p_user_info->userNum = atoi(row[1]);
		}

		temp = strtok(NULL, " ");
		strcpy(p_user_info->Longitude, temp);
		temp = strtok(NULL, " ");
		strcpy(p_user_info->Latitude, temp);

		protocol = FIRST_RECV;

		p_user_info->_flag = true;
	}
	
	switch(protocol)
	{
		case RECV_GPS_DATA:
		{
			temp = strtok(NULL, " ");
			temp = strtok(NULL, " ");
			strcpy(p_user_info->Longitude, temp);
			temp = strtok(NULL, " ");
			strcpy(p_user_info->Latitude, temp);

			memset(sqlBuf, 0, LOCAL_BUF_SIZE);
			sprintf(sqlBuf, "INSERT INTO PastPath(TargetNum, UserNum, DeviceName, Latitude, Longitude) VALUES(%d, %d, \'%s\', %s, %s);", 
												p_user_info->targetNum,
												p_user_info->userNum,
												p_user_info->deviceName,
												p_user_info->Latitude,
												p_user_info->Longitude);
#ifdef __LOG__
			printf("## %s :: %s\n", p_user_info->deviceName, sqlBuf);
#endif
			mysql_state = mysql_query(connection, sqlBuf);
			if (mysql_state != 0)
			{
				printf("잘못된 mysql 연결\n");
				return false;
			}
			break;
		}
		case RECV_NONE_GPS_DATA:

			break;
		case FIRST_RECV:
			memset(sqlBuf, 0, LOCAL_BUF_SIZE);
			sprintf(sqlBuf, "INSERT INTO PastPath(TargetNum, UserNum, DeviceName, Latitude, Longitude) VALUES(%d, %d, \'%s\', %s, %s);",
											p_user_info->targetNum,
											p_user_info->userNum,
											p_user_info->deviceName,
											p_user_info->Latitude,
											p_user_info->Longitude);
#ifdef __LOG__
			printf("## %s :: %s\n", p_user_info->deviceName, sqlBuf);
#endif
			mysql_state = mysql_query(connection, sqlBuf);
			if (mysql_state != 0)
			{
				printf("잘못된 mysql 연결\n");
				return false;
			}
			break;
		case RECV_TERMINATE:
		default:

			Disconnect(p_user_info);
			break;
	}
	

	p_user_info->RecvQ->ClearBuffer();


	return true;
}


bool Disconnect(stUSER* p_user_info)
{
	printf("Disconnect()\n");
	CList<stUSER*>::iterator delete_iter;
	char sqlBuf[LOCAL_BUF_SIZE];
	int mysql_state;
	
	memset(sqlBuf, 0, LOCAL_BUF_SIZE);
	sprintf(sqlBuf, "DELETE FROM PastPath WHERE DeviceName = \'%s\';", p_user_info->deviceName);
	printf("# 소켓 연결을 종료합니다. 대상 : %s\n Query : %s\n", p_user_info->deviceName, sqlBuf);
	mysql_state = mysql_query(connection, sqlBuf);
	if (mysql_state != 0)
	{
		printf("잘못된 mysql 연결\n");
		return false;
	}
	delete p_user_info->RecvQ;
	// 소켓 클로즈
	close(p_user_info->sock);

	delete_iter = ObjectList.begin();
	for (; delete_iter != ObjectList.end(); ++delete_iter)
	{
		if (*delete_iter == p_user_info)
		{
			delete* delete_iter;
			*delete_iter = nullptr;
			break;
		}
	}
	g_nTotalClient--;

	return true;
}




// 링크드 리스트 정의부.
template <typename T>
void CList<T>::push_front(T data)
{
	Node* node = new Node;
	node->_data = data;
	node->_Prev = &this->_head;
	node->_Next = this->_head._Next;
	this->_head._Next = node;
	node->_Next->_Prev = node;
	this->_size++;
}

template <typename T>
void CList<T>::push_back(T data)
{
	Node* node = new Node;
	node->_data = data;
	node->_Next = &this->_tail;
	node->_Prev = this->_tail._Prev;
	this->_tail._Prev = node;
	node->_Prev->_Next = node;
	this->_size++;
}

template <typename T>
void CList<T>::pop_front()
{
	Node* temp = _head._Next;
	temp->_Prev->_Next = temp->_Next;
	temp->_Next->_Prev = &this->_head;
	this->_size--;
	delete temp;
}

template <typename T>
void CList<T>::pop_back()
{
	Node* temp = this->_tail._Prev;
	temp->_Prev->_Next = &this->_tail;
	temp->_Next->_Prev = temp->_Prev;
	this->_size--;
	delete temp;
}

template <typename T>
void CList<T>::clear()
{
	int temp = this->_size;
	for (int i = 0; i < temp; i++)
	{
		this->pop_front();
	}
}

template <typename T>
int CList<T>::size()
{
	return this->_size;
}

template <typename T>
bool CList<T>::empty()
{
	if (this->_head._Next == &this->_tail)
		return true;
	return false;
}



// 링버퍼 구현부
CRingBuffer::CRingBuffer(void) : CRingBuffer{ DEFAULT_RING_BUF_SIZE } { }
CRingBuffer::CRingBuffer(int iBufferSize) : iBufferSize{ iBufferSize }
{
	this->RingBufferQueue = new char[iBufferSize];
	this->RearPos = RingBufferQueue;				
	this->FrontPos = RingBufferQueue;					
	this->MaxFrontPos = this->RearPos - 1;

	this->Start = RingBufferQueue;
	this->End = RingBufferQueue + iBufferSize;			
}

CRingBuffer::~CRingBuffer()
{
	delete[] this->RingBufferQueue;
}

int CRingBuffer::GetBufferSize()	const
{
	return this->iBufferSize;
}

int CRingBuffer::GetUseSize()			// iBufferSize - 1 이 꽉찼다는 의미이다.
{

	if (this->FrontPos == this->End)
		this->FrontPos = this->Start;
	if (this->RearPos == this->End)
		this->RearPos = this->Start;

	char* FrontPos = this->FrontPos;
	char* RearPos = this->RearPos;



	if (FrontPos >= RearPos)
	{
		return int(FrontPos - RearPos);
	}
	return this->iBufferSize - int(RearPos - FrontPos);
}


int CRingBuffer::GetFreeSize()			
{
	if (this->FrontPos == this->End)
		this->FrontPos = this->Start;
	if (this->RearPos == this->End)
		this->RearPos = this->Start;

	char* FrontPos = this->FrontPos;
	char* RearPos = this->RearPos;

	if (FrontPos >= RearPos)
	{
		return this->iBufferSize - (FrontPos - RearPos);
	}

	return this->RearPos - this->FrontPos;
}

int CRingBuffer::Enqueue(char* chpData, int iSize)
{
	int freeSize = this->GetFreeSize() - 1;
	int _Size;
	int overSize;

	if (this->FrontPos == this->End)
		this->FrontPos = this->Start;
	if (this->RearPos == this->End)
		this->RearPos = this->Start;

	if (freeSize == 0)
	{
		return 0;
	}
	else if (freeSize >= iSize)
	{
		if (this->FrontPos + iSize >= this->End)
		{
			overSize = this->FrontPos + iSize - this->End;
			_Size = iSize - overSize;

			memcpy(this->FrontPos, chpData, _Size);
			memcpy(this->Start, chpData + _Size, overSize);
			this->FrontPos = this->Start + overSize;
			return iSize;
		}
		else
		{
			memcpy(this->FrontPos, chpData, iSize);
			this->FrontPos += iSize;
			return iSize;
		}
	}
	else if (iSize > freeSize)
	{
		if (this->FrontPos + freeSize >= this->End)
		{
			overSize = this->FrontPos + freeSize - this->End;
			_Size = freeSize - overSize;
			memcpy(this->FrontPos, chpData, _Size);
			memcpy(this->Start, chpData + _Size, overSize);
			this->FrontPos = this->Start + overSize;
			return freeSize;
		}
		else   
		{
			memcpy(this->FrontPos, chpData, freeSize);
			this->FrontPos += freeSize;
			return freeSize;
		}
	}
}

int CRingBuffer::Dequeue(char* chpDest, int iSize)
{
	if (this->FrontPos == this->End)
		this->FrontPos = this->Start;
	if (this->RearPos == this->End)
		this->RearPos = this->Start;

	int useSize = this->GetUseSize();
	int _Size;
	int overSize;

	if (useSize == 0)
	{
		return 0;
	}
	else if (iSize <= useSize)
	{
		if (this->RearPos + iSize >= this->End)
		{
			overSize = this->RearPos + iSize - this->End;
			_Size = iSize - overSize;
			memcpy(chpDest, this->RearPos, _Size);
			memcpy(chpDest + _Size, this->Start, overSize);
			this->RearPos = this->Start + overSize;
			return iSize;
		}
		else
		{
			memcpy(chpDest, this->RearPos, iSize);
			this->RearPos += iSize;
			return iSize;
		}
	}
	else if (iSize > useSize)
	{
		if (this->RearPos + useSize >= this->End)
		{
			overSize = this->RearPos + useSize - this->End;
			_Size = useSize - overSize;
			memcpy(chpDest, this->RearPos, _Size);
			memcpy(chpDest + _Size, this->Start, overSize);
			this->RearPos = this->Start + overSize;
			return useSize;
		}
		else
		{
			memcpy(chpDest, this->RearPos, useSize);
			this->RearPos += useSize;
			return useSize;
		}
	}
}

void CRingBuffer::ClearBuffer(void)
{
	this->FrontPos = this->RearPos;
}
