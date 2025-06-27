import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar,ImageBackground } from 'react-native';
import ComicViewer from './components/ComicViewer';
import deadpool from './assets/images/deadpool.png';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={deadpool} style={styles.backgroundImage} >
      <View style={styles.container}>
        <ComicViewer />
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    // backgroundColor: '#1a1a1a',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 