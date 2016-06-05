/**
 * 
 * Created by chenxiaohu on 16/6/5.
 */

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';

import TabBar from './TabBar';
import ListDemo from './ListDemo';

const ROUTE_STACK = [ {index: 0}, {index: 1} ];

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {isFocused: false, version:0};
  }

  componentWillMount() {
    this._dl = this.props.nav.navigationContext.addListener('didfocus', this._onDidFocus.bind(this));
    this._wl = this.props.nav.navigationContext.addListener('willfocus', this._onWillFocus.bind(this));
  }
  componentWillunnount() {
    this._wl.remove();
    this._dl.remove();
  }

  _onWillFocus(route) {
    let index = route.data.route.index;
    console.log('onWillFocus #'+ index + ' to Page #' + this.props.index);
    this.setState({isFocused: false});
    if (index == this.props.index) {
      this.setState({
        version: this.state.version + 1
      });
    }
  }

  _onDidFocus(route) {
    let index = route.data.route.index;
    console.log('onDidFocus #'+ route.data.route.index + ' to Page #' + this.props.index);
    if (index === this.props.index) {
      this.setState({isFocused: true});
    }
  }

  render() {
    return (
      <Content {...this.props} version={this.state.version}/>
    );
  }

}

class Root extends Component {
  render() {
    return (
      <Navigator
        ref={(nav) => {
          if (!nav) return;
          this._nav = nav;
        }}
        initialRoute={ROUTE_STACK[0]}
        initialRouteStack={ROUTE_STACK}
        renderScene={this._renderScene.bind(this)}
        configureScene={() => ({
         ...Navigator.SceneConfigs.FadeAndroid
        })}
        navigationBar={<TabBar gotoRoute={this._gotoRoute.bind(this)}/>}
      />
    );
  }

  _renderScene(route, navigator) {
    return <Page nav={navigator} index={route.index}/>
  }

  _gotoRoute(index) {
    this._nav.jumpTo(ROUTE_STACK[index]);
  }
}


class Content extends Component {
  render() {
    if (this.props.index == 0)
      return (
        <View style={[styles.container, {backgroundColor: this.props.index == '1' ? '#fff' : '#aaffff'}]}>
          <Text style={{fontSize:20}}>#{this.props.index} page show!</Text>
        </View>
      );
    else
      return (
        <ListDemo version={this.props.version}/>
    );
  }
}

export default class App extends Component {
  
  render() {
    return (
      <Root/>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop:20,
  },
});