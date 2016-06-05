/**
 * 
 * Created by chenxiaohu on 16/6/5.
 */

import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
} from 'react-native';


let DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ListDemo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this._data = [];
    for (let i = 0; i < 100; i ++) {
      this._data.push({id:i, text:`Row #${i}`});
    }
  }
  
  renderRow(row) {
    return (
      <View style={{
          overflow:'hidden',
          height:50,
          alignItems:'center',
          justifyContent:'center',
          backgroundColor:row.id % 2 === 0 ? '#eee':'#fff',
          }}>
        <Text style={{fontSize:20}}>{row.text}</Text>
      </View>
    );
  }

  renderHeader() {
    return <View style={{height:40,alignItems:'center',justifyContent:'center', backgroundColor:'grey'}}>
      <Text style={{fontSize:16}}>Scroll to show the list :(</Text>
    </View>
  }
  
  render() {
    let dataSource = DS.cloneWithRows(this._data);
    return <ListView
      initialListSize={40}
      removeClippedSubviews={true}
      dataSource={dataSource}
      renderRow={this.renderRow.bind(this)}
      renderHeader={this.renderHeader.bind(this)}
      style={{marginTop:20}}
    />;
  }
  
}