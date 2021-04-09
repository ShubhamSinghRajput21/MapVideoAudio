import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-player';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('screen').height;

export default class Video extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <VideoPlayer
          video={{
            uri:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          videoWidth={screenWidth}
          videoHeight={screenHeight / 2.5}
          thumbnail={{
            uri:
              'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F04%2F23%2F22%2F00%2Ftree-736885__340.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&tbnid=kHpcTNTA2NHBJM&vet=12ahUKEwjdlfmHpvDvAhUnELcAHYqADR4QMygCegUIARDXAQ..i&docid=Ba_eiczVaD9-zM&w=546&h=340&q=images&ved=2ahUKEwjdlfmHpvDvAhUnELcAHYqADR4QMygCegUIARDXAQ',
          }}
          endThumbnail={{
            uri:
              'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F04%2F23%2F22%2F00%2Ftree-736885__340.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&tbnid=kHpcTNTA2NHBJM&vet=12ahUKEwjdlfmHpvDvAhUnELcAHYqADR4QMygCegUIARDXAQ..i&docid=Ba_eiczVaD9-zM&w=546&h=340&q=images&ved=2ahUKEwjdlfmHpvDvAhUnELcAHYqADR4QMygCegUIARDXAQ',
          }}
          pauseOnPress={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
