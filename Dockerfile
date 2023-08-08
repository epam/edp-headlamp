FROM ghcr.io/headlamp-k8s/headlamp:v0.19.0
COPY dist/main.js /headlamp/plugins/edp/main.js
COPY package.json /headlamp/plugins/edp/package.json