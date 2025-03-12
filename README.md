# Meteorites Landing Map

This web application visualizes NASA's meteorite landing data on an [OpenStreetMap](https://www.openstreetmap.org/) map using [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/), allowing you to explore where meteorites have landed around the globe. 

## Getting Started

To start the project, run the command:

```bash
yarn install && yarn dev
```

## Rendering Strategy

To improve the performance by reducing the number of items to be rendered, the app only display the landings that should be visible in the current viewport.

## Navigation
- Native map interaction: zoom / pan / drag
- Quick navigation: click on a landing in the list will move the map's viewport to its location.
