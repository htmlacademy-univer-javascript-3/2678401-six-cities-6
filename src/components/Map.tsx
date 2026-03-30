import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup, LayerGroup} from 'leaflet';
import {useMap} from '../hooks/useMap.tsx';
import {City, Points, Point} from '../types.tsx';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../const.ts';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
  onMarkerMouseEnter?: (point: Point) => void;
  onMarkerMouseLeave?: () => void;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPoint, onMarkerMouseEnter, onMarkerMouseLeave} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer: LayerGroup = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        const isSelected = selectedPoint !== undefined &&
          point.lat === selectedPoint.lat &&
          point.lng === selectedPoint.lng;

        marker
          .setIcon(
            isSelected
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);

        if (onMarkerMouseEnter) {
          marker.on('mouseover', () => {
            onMarkerMouseEnter(point);
          });
        }

        if (onMarkerMouseLeave) {
          marker.on('mouseout', () => {
            onMarkerMouseLeave();
          });
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, onMarkerMouseEnter, onMarkerMouseLeave]);

  return <div style={{ height: '100%', width: '100%', minHeight: '500px' }} className="cities__map map" ref={mapRef}></div>;
}
