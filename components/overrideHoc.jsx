import { StyleSheet, Text, View } from "react-native";
import React from "react";

const overrideHoc = (WrappedComponent, { overrides }) => {
  return ({ innerProps }) => (
    <WrappedComponent {...innerProps} {...overrides} />
  );
};

export default overrideHoc;

const styles = StyleSheet.create({});
