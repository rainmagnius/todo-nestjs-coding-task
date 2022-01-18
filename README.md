## Dependencies 
```bash
$ docker-compose up -d
$ docker exec -it mongodb /bin/bash
#run inside docker container:
$ mongo
# register the replica set
rs.initiate({
      _id: "rs0",
      version: 1,
      members: [
         { _id: 0, host : "localhost:27017" }
      ]
   }
)
```
## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Примечания

Для добавления таска группе реализован PUT эндпоинт
```
/tasks/:task_id/group/:group_id
```