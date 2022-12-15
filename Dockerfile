FROM epamedp/headlamp:0.14.0.4
COPY dist/main.js /headlamp/plugins/edp/main.js
RUN mkdir /.config && \
    chown 65534:65534 -R /headlamp /.config
USER 65534:65534
