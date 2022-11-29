#include <stdio.h>
#include <mysql.h>

int main(int argc, char** argv)
{
  MYSQL_RES *result;
  MYSQL_ROW row;
  MYSQL *connection, mysql;
  int state;

  /* Connect Locol host Database */
  mysql_init(&mysql);
  connection = mysql_real_connect(&mysql, "localhost", "root",
			"DKUcap23!","AKBScapstone", 0, 0, 0);
  if(connection == NULL)
  {
    printf(mysql_error(&mysql));
    return 1;
  }

  state = mysql_query(connection, "SELECT * FROM Target");
  if(state != 0)
  {
    printf(mysql_error(connection));
    return 1;
  }

  result = mysql_store_result(connection);

  printf("ROWS : %ld\n", mysql_num_rows(result));
  while( (row = mysql_fetch_row(result)) != NULL)
  {
    /*
    printf("id : %s, val = %s\n", (row[0] ? row[0] : "NULL")
			, (row[1] ? row[1] : "NULL"));
    */
    printf("%s\n", row[2]);
  }

  state = mysql_query(connection, "SELECT * FROM User");
  if(state != 0)
  {
    printf(mysql_error(connection));
    return 1;
  }

  result = mysql_store_result(connection);

  printf("ROWS : %ld\n", mysql_num_rows(result));
  while( (row = mysql_fetch_row(result)) != NULL)
  {
    /*
    printf("id : %s, val = %s\n", (row[0] ? row[0] : "NULL")
                        , (row[1] ? row[1] : "NULL"));
    */
    printf("%s\n", row[3]);
  }


  mysql_free_result(result);
  mysql_close(connection);
  printf("Done.\n");




  return 0;
}
