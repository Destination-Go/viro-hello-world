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
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroARImageMarker target={"cheez"}>
          <ViroImage
            width={1}
            height={1}
            position={[-0.08, 0, -.16]}
            rotation={[-90, 0, 0]}
            scale = {[.05, .05, .05]}
            source={require("./res/profile.png")}
          />
          <ViroText 
            text={this.state.text} 
            scale={[.1, .1, .1]} 
            position={[0, 0, -.15]} 
            rotation={[-90, 0, 0]}
            style={styles.helloWorldTextStyle} />
        </ViroARImageMarker>
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
  }
});

module.exports = HelloWorldSceneAR;
