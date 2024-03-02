#!/bin/bash

Help () {
    echo
    echo "Syntax: imagemanager [option] [path] [user]"
    echo
    echo "options:"
    echo "    pull       Pulls the latest version from repo and starts it"
    echo "    remove     Removes all associated containers, images, volumes"
    echo "    restart    Remove + Pull"
    echo
}

if [[ ! -n $1 ]] || [[ ! -n $2 ]] || [[ ! -n $3 ]];
then
    Help
    exit
fi

case $1 in
    pull)
        cd "$2"
        su $3 -c "git pull -q"
        docker compose -f docker-compose.yml -f docker-compose.override.prod.yml build -q
        docker compose -f docker-compose.yml -f docker-compose.override.prod.yml up -d > /dev/null
        docker image prune -a -f > /dev/null
        exit;;
    remove)
        cd "$2"
        docker compose -f docker-compose.yml -f docker-compose.override.prod.yml down > /dev/null
        docker image rm nginx > /dev/null
        docker image rm nodered > /dev/null
        docker image rm mosquitto > /dev/null
        docker image prune -a -f > /dev/null
        docker volume rm iot_test_nodered_data > /dev/null
        docker volume rm iot_test_mosquitto_log > /dev/null
        docker volume rm iot_test_mosquitto_data > /dev/null
        docker volume rm iot_test_mosquitto_config > /dev/null
        exit;;
    *)
        Help
        exit;;
esac
