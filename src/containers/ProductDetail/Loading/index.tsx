import { ActivityIndicator, View, StyleSheet } from "react-native";
import React from 'react';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#FFD700" />
    </View>
  )
}
export default LoadingComponent
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  }
});