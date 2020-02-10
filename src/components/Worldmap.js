import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }

};


const wrapperStyles = {
  width: "100%",
  height: "100%",
  backgroundColor: "#009687"
}
// const colorScale = scaleLinear()
//   .domain([0, 100000000, 1338612970]) // Max is based on China
//   .range(["#FFF176", "#FFC107", "#E65100"])
 

const MapChart = ({ setTooltipContent }, props) => {
  console.log("check if props arrive", props)

  return (
    <div style={wrapperStyles}>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup zoom={1.0}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                

                  onClick={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(`${NAME}!`);
                  }}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent("");
                  }}
                  
                  style={{
                    default: {
                      fill: "#004f6a",
                      outline: "#000000",
                    },
                    hover: {
                      fill: "#d4d1d1",
                      outline: "#000000"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "#000000"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      </div>
  );
};

export default memo(MapChart);
