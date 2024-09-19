import { View } from "@/components/Themed";
import { SearchApiResult, SearchResults } from "@/redux/searchApi";
import React, { useCallback, useMemo, useState } from "react";
import AppChip from "./AppChip";

export type ChipNames = keyof SearchResults;
type GroupChip = (args: {
  handleSelectedChanged: (chipName: ChipNames) => void;
  selectedChips: ChipNames[];
}) => React.ReactNode;

type Props = {
  searchQueryResult: SearchResults;
  chipNames: ChipNames[];
  selectedChips: ChipNames[];
  handleChipSelect: (chipName: ChipNames) => void;
};
const ChipSet: React.FC<Props> = ({
  chipNames,
  selectedChips,
  handleChipSelect,
  searchQueryResult,
}) => {
  //--------------------------------------------------------------------------------
  const factoryCreat = useCallback(
    (name: keyof SearchResults) => {
      let count = (searchQueryResult && searchQueryResult[name].length) || 0;

      const chipFac: GroupChip = ({ handleSelectedChanged, selectedChips }) => (
        <AppChip
          handleSelectedChanged={handleSelectedChanged}
          name={name}
          selectedChips={selectedChips}
          count={count}
        />
      );
      return chipFac;
    },
    [searchQueryResult],
  );

  const chipsFactories = useMemo(
    () => chipNames.map((name) => factoryCreat(name)),
    [chipNames, factoryCreat],
  );

  return (
    <>
      <View className="mt-4 flex flex-row flex-wrap">
        {chipsFactories.map((chipFactory, key) => (
          <View key={key} className="mb-0.5 mr-2 pb-2 pt-1">
            {chipFactory({
              selectedChips,
              handleSelectedChanged: handleChipSelect,
            })}
          </View>
        ))}
      </View>
    </>
  );
};

export default ChipSet;
