'use strict';

import React, { Component, } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0 | this.props.activeIndex}
  }

  buttonColor(index) {
    return index == this.state.activeIndex ? 'blue' : 'black';
  }

  handleWillFocus(route) {
    this.setState({activeIndex: route.index});
  }

  render() {
    return (
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton}
                          onPress={() => {this.props.gotoRoute(0)}} >
          <Text style={[styles.buttonText, {color:this.buttonColor(0)}]}>#0</Text>
        </TouchableOpacity>
        <View style={{borderRightWidth:1, height:44}}/>
        <TouchableOpacity style={styles.tabButton}
                          onPress={() => {this.props.gotoRoute(1)}} >
          <Text style={[styles.buttonText, {color:this.buttonColor(1)}]}>#1</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height:44,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderTopColor:'grey',
    borderTopWidth:1,
  },

  tabButton: {
    height:44,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

  buttonText:{
    fontSize:20,
    fontWeight:'bold',
  }
});
