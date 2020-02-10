import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import LoginContainer from "../LoginFormContainer"
import "../Css/Gameroom.css"

export default class MenuExampleEvenlyDivided extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{opacity:"0.8",color:"black", backgroundColor:"#004f6a", marginBottom:"0px"}} fluid widths={1}>
        <Menu.Item
          name='buy'
          active={activeItem === 'buy'}
          onClick={this.handleItemClick}
          className="in-gameroom"
        >
            {this.props.users.map(players => {

              if(this.props.userId === players.id){

                return (
                  <div  key={players.id}>
                    <h4>
                <span className="margin">{players.username} (you)</span></h4>
                  <p>{players.score} Points</p>
                </div>
              )
                }else{
                  return (
                    <div  key={players.id}>
              <h4> <span className="margin">{players.username} </span></h4>
                    <p>{players.score} Points</p>
                  </div>
                )

                }
            })}

        </Menu.Item>

      </Menu>
    )
  }
}
