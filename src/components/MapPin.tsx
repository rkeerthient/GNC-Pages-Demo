import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { PinComponent } from "@yext/search-ui-react";
import { Popup, LngLatLike, Map } from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { Result } from "@yext/search-headless-react";

const transformToMapboxCoord = (coordinate: any): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: any) => {
  const address = location.address;
  const html = (
    <div>
      <p className="font-bold">{location.neighborhood || "unknown location"}</p>
      <p>{location.address.line1}</p>
      <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
  return ReactDOM.renderToString(html);
};

const MapPin: PinComponent<any> = ({
  index,
  mapbox,
  result,
}: {
  index: number;
  mapbox: Map;
  result: Result<any>;
}) => {
  const location = result.rawData;
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  useEffect(() => {
    if (active && location.yextDisplayCoordinate) {
      const mapboxCoordinate = transformToMapboxCoord(
        location.yextDisplayCoordinate
      );
      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setHTML(getLocationHTML(location))
          .addTo(mapbox);
      }
    }
  }, [active, mapbox, location]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    <button onClick={handleClick}>
      <MdLocationOn className="fill-red-700" size={30} />
    </button>
  );
};

export default MapPin;
