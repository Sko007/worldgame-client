import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import LoginContainer from "../LoginFormContainer"

export default class MenuExampleEvenlyDivided extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{opacity:"1", color:"#004f6a"}} fluid widths={1}>
        <Menu.Item
          name='buy'
          active={activeItem === 'buy'}
          onClick={this.handleItemClick}
        >
        <h1>Welcome {this.props.username}</h1>

        </Menu.Item>

      </Menu>
    )
  }
}
