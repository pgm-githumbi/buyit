import React, { useEffect, useState } from "react";
import { FadeLoading } from "react-native-fade-loading";
import { Text } from "./Themed";
import { StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
  isFetching: boolean;
  isLoading: boolean;
};
const Loader: React.FC<Props> = ({ children, isFetching, isLoading }) => {
  const [waitFirst, setWaitFirst] = useState<boolean>(isFetching || isLoading);

  useEffect(() => {
    setWaitFirst((wf) => true);
    const timeout = setTimeout(() => setWaitFirst((wf) => false), 5000);
    return () => clearTimeout(timeout);
  }, [setWaitFirst]);

  return (
    <>
      {waitFirst && (
        <>
          <FadeLoading
            visible={false}
            style={styles.box}
            primaryColor="grey"
            secondaryColor="lightgray"
            duration={5000}
            animated
            children={""}
          />
          <FadeLoading
            visible={waitFirst}
            style={styles.box}
            primaryColor="grey"
            secondaryColor="lightgray"
            duration={5000}
            animated
            children={""}
          />
          <FadeLoading
            visible={waitFirst}
            style={styles.box}
            primaryColor="grey"
            secondaryColor="lightgray"
            duration={5000}
            animated
            children={""}
          />
          <FadeLoading
            visible={waitFirst}
            style={styles.box}
            primaryColor="grey"
            secondaryColor="lightgray"
            duration={5000}
            animated
            children={""}
          />
          <FadeLoading
            visible={waitFirst}
            style={styles.box}
            primaryColor="black"
            secondaryColor="lightgray"
            duration={5000}
            animated
            children={""}
          />
        </>
      )}
      {!waitFirst && children}
    </>
  );
};

const styles = StyleSheet.create({
  box: { width: "90%", height: 20, marginVertical: 5 },
});
export default Loader;
