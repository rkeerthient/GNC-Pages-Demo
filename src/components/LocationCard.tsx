import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { RiDirectionFill } from "react-icons/ri";
import HoursText from "./HoursText";

const LocationCard: CardComponent<any> = ({
  result,
}: CardProps<any>): JSX.Element => {
  const location = result.rawData;
 
  // function that takes coordinates and returns a google maps link for directions
  const getGoogleMapsLink = (coordinate: any): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
  };

  const metersToMiles = (meters: number) => {
    const miles = meters / 1609.34;
    return Math.round(miles * 10) / 10;
  };

  return (
    <div className="flex justify-between border-y p-4 ">
      <div className="flex flex-row w-full gap-2  ">
        <div>
          <img
            src="https://stores.gnc.com/permanent-b0b701/assets/images/logo.66366bb8.svg"
            className="w-14 h-5 mt-2 mr-4"
          />
        </div>
        <div className="w-full">
          <div className="flex w-full flex-col">
            <div>
              <a
                target={"_blank"}
                href={location.slug}
                className="font-semibold text-orange"
                rel="noreferrer"
              >
                {location.neighborhood}
              </a>
              <p className="text-2xl font-bold">{location.geomodifier}</p>
              <div className="mt-4">
                <HoursText
                  hours={location.hours}
                  timezone={location.timeZone}
                ></HoursText>
              </div>
              <p className="mt-4">{location.address.line1}</p>
              <p>{`${location.address.city}, ${location.address.region} ${location.address.postalCode}`}</p>
              <div className="mt-4">
                {location.mainPhone &&
                  location.mainPhone
                    .replace("+1", "")
                    .replace(/\D+/g, "")
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </div>
            </div>
            <div className="mt-4 font-bold">
              {location.yextDisplayCoordinate && (
                <div className="flex flex-col gap-2">
                  <div>
                    <a
                      target={"_blank"}
                      href={getGoogleMapsLink(location.yextDisplayCoordinate)}
                      rel="noreferrer"
                    >
                      <p className="hover:bg-red-500 w-3/4 border bg-black text-white p-2 text-center text-sm">
                        Directions
                      </p>
                    </a>
                  </div>
                  <div>
                    <a
                      target={"_blank"}
                      href={getGoogleMapsLink(location.yextDisplayCoordinate)}
                      rel="noreferrer"
                    >
                      <p className="w-3/4 border border-black text-black p-2 text-center text-sm hover:bg-black hover:text-white">
                        View Details
                      </p>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
