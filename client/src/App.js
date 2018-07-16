import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    fetch('/api/items')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render () {
    
    const { error, isLoaded, items } = this.state;
    
    if (error) {
      return <div> Error: {error.message}</div>
    } else if (!isLoaded) {
      return (
        <button className='button' onClick={this.handleClick}>
          Click Me
        </button>
      )
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item._id}>
              {item.name}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App