FROM ghcr.io/kinvolk/headlamp:v0.14.0
COPY dist/main.js /headlamp/plugins/edp/main.js
RUN mkdir /.config && \
    chown 65534:65534 -R /headlamp /.config
USER 65534:65534
