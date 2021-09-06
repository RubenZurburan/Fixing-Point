import L from 'leaflet';

const iconBear = new L.Icon({
    iconUrl: './bulgaria-bear-3.jpg',
    iconAnchor: new L.Point(16, 16),
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconBear };
