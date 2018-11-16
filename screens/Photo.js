import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class Photo extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  }

  onPictureSaved = async photo => {
      Alert.alert(
        'Alert Title',
        `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }} type={this.state.type} ref={ref => {
            this.camera = ref;
          }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Ionicons name="ios-reverse-camera" size={80} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.takePicture}
                  style={{
                    flex: 0.5,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
              >
                <Ionicons name="ios-radio-button-on" size={70} color="white" />
              </TouchableOpacity>

            </View>
          </Camera>
        </View>
      );
    }
  }
}
