import React, { Component } from 'react'

export default class Create extends Component {
  render() {
    return (
      <form>
        <input type="text" min="5" max="60" placeholder="Enter your title"/>
        <textarea min="300" max="10000" placeholder="What is your opinion?"></textarea>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
