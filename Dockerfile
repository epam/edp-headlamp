FROM epamedp/headlamp:0.22.5

COPY --chown=100:101 assets/ /headlamp/frontend
COPY --chown=100:101 dist/main.js /headlamp/plugins/edp/main.js
COPY --chown=100:101 package.json /headlamp/plugins/edp/package.json
