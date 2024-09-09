import { Text, View } from "@/components/Themed";
import { currencyFormatter } from "@/utils";
import React, { useCallback, useState } from "react";
import { Pressable, Touchable } from "react-native";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import { Circle, Rect, Svg, Text as TextSVG } from "react-native-svg";

type onDataPointClickType = (data: {
  index: number;
  value: number;
  dataset: Dataset;
  x: number;
  y: number;
  getColor: (opacity: number) => string;
}) => void;

type decoratorType = (options: {
  getXValue: (index: number) => string;
}) => React.ReactNode;
type Props = {
  children: (data: {
    onDataPointClick: onDataPointClickType;
    decorator: decoratorType;
  }) => React.ReactNode;
};

const Tooltip: React.FC<Props> = ({ children }) => {
  const [clickData, setClickData] = useState({
    clicked: false,
    x: 80,
    y: 110,
    width: 100,
    height: 27,
    value: -1,
    index: -1,
    color: "purple",
    dataset: {} as Dataset,
  });
  const onDataPointClick: onDataPointClickType = useCallback(
    ({ dataset, getColor, ...data }) => {
      setClickData((prevState) => ({
        ...prevState,
        clicked: true,
        color: getColor(0.75),
        getColor,
        dataset,
        ...data,
      }));
    },
    [setClickData]
  );
  const decorator: decoratorType = useCallback(
    ({ getXValue }) => {
      return (
        <>
          {clickData.clicked && (
            <Pressable onPress={(e) => console.log("press", e)}>
              <View className="bg-transparent">
                <Svg>
                  <Rect
                    x={clickData.x}
                    y={clickData.y}
                    width={clickData.width}
                    height={clickData.height}
                    fill={"transparent"}
                  />
                  <TextSVG
                    x={clickData.x + clickData.width / 2}
                    y={clickData.y + clickData.height / 2}
                    fill="grey"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                    dy={5}
                    onPress={() =>
                      setClickData(({ clicked, ...rest }) => ({
                        clicked: !clicked,
                        ...rest,
                      }))
                    }
                  >
                    {/* {getXValue(clickData.index)} */}
                    {`${getXValue(
                      clickData.index
                    )}, $${currencyFormatter.format(clickData.value)}`}
                  </TextSVG>
                  <Circle
                    r={3}
                    fill={clickData.color}
                    x={clickData.x}
                    y={clickData.y}
                  ></Circle>
                </Svg>
              </View>
            </Pressable>
          )}
        </>
      );
    },
    [
      clickData.x,
      clickData.y,
      clickData.width,
      clickData.height,
      clickData.color,
      clickData.clicked,
      setClickData,
    ]
  );
  return <>{children({ onDataPointClick, decorator })}</>;
};

export default Tooltip;
