FROM ubuntu:22.04 as build

RUN apt-get update
RUN apt-get upgrade -y
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get install --no-install-recommends -y locales ca-certificates build-essential curl

RUN locale-gen en_US.UTF-8

ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs


RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY ./package.json ./package.json

RUN npm install 

COPY . .

RUN npm run build

FROM public.ecr.aws/nginx/nginx

ARG IMAGE_TAG

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /opt/app/dist /usr/share/nginx/html

CMD nginx
