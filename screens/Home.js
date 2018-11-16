import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Photo from './Photo';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('photo')} title="Take a photo"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
