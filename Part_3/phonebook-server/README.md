# Notes

MongoDB is implemented in this course as Docker-container.
Run command after starting docker as user M:

    docker run -p 27017:27017 --name fullstack_mongo --env-file .env mongo

to kickstart local mongoDB server. With docker there's annoying auth issues,
so for purposes of this coursework just run defaults with command:

    docker run -p 27017:27017 --name fullstack_mongo mongo

Afterwards run command to restart mongo server:

    docker start fullstack_mongo

the end.
