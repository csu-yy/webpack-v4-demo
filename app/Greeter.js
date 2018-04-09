// Greeter.js

/*module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!";
  return greet;
};*/

import React, { Component } from 'react'
import config from './config.json'
import styles from './Greeter.css';//导入

export default class Greeter extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className={styles.root}> {/*使用cssModule添加类名的方法*/}
        {config.greetText}
      </div>
    )
  }
}