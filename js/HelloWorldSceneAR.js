'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroText,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroImage
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    const images = [
      "bar_sign", 
      "cotton_candy", 
      "jerky_sack", 
      "jerky_sign", 
      "llama", 
      "mantis_sign"
    ];
    
    const ARImageMarkers = images.map(img => 
        <ViroARImageMarker target={`${img}`} key={`${img}`}>
          <ViroImage
            width={1}
            height={1}
            position={[-0.08, 0, -.32]}
            rotation={[-90, 0, 0]}
            scale = {[.05, .05, .05]}
            source={require("./res/profile.png")}
          />
          <ViroText 
            text={this.state.text} 
            scale={[.1, .1, .1]} 
            position={[0, 0, -.30]} 
            rotation={[-90, 0, 0]}
            style={styles.helloWorldTextStyle} />
        </ViroARImageMarker>
      )
      
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {ARImageMarkers}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Clue Found!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#f08633',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroARTrackingTargets.createTargets({
  "cheez" : {
    source : require('./res/cheez.jpg'),
    orientation : "Up",
    physicalWidth : 0.1524 // real world width in meters
  },
  "bar_sign" : {
    source : require('./res/container_park/bar_sign.png'),
    orientation : "Up",
    physicalWidth : 0.6223
  },
  "cotton_candy" : {
    source : require('./res/container_park/cotton_candy.png'),
    orientation : "Up",
    physicalWidth : 0.5715
  },
  "jerky_sack" : {
    source : require('./res/container_park/jerky_sack.png'),
    orientation : "Up",
    physicalWidth : 0.3429
  },
  "jerky_sign" : {
    source : require('./res/container_park/jerky_sign.png'),
    orientation : "Up",
    physicalWidth : 0.5715
  },
  "llama" : {
    source : require('./res/container_park/llama.png'),
    orientation : "Up",
    physicalWidth : 0.5588
  },
  "mantis_sign" : {
    source : require('./res/container_park/mantis_sign.png'),
    orientation : "Up",
    physicalWidth : 0.4953
  }
});

module.exports = HelloWorldSceneAR;
