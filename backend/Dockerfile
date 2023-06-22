FROM ubuntu:22.04

RUN dpkg --print-architecture

RUN apt-get update
RUN apt-get upgrade -y
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get install --no-install-recommends -y locales ca-certificates build-essential curl 

RUN locale-gen en_US.UTF-8

ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'

RUN apt-get install -y --no-install-recommends python3 python3-pip

RUN python3 -m pip install -U pip

COPY ./requirements.txt requirements.txt


RUN python3 -m pip install -r requirements.txt

RUN mkdir /code

COPY ./src/ /code/

CMD python3 /code/run.py
