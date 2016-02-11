
import React from 'react';
import Cat from './cat';

class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      cats: []
    };
  }

  addCat() {
    this.setState({
      cats: [...this.state.cats, 'Murka']
    });
  }

  render() {

    return (
      <div>
        <Cat>Hilka</Cat>
        {this.state.cats.map(cat => <Cat>{cat}</Cat>)}
        <button onClick={::this.addCat}>Add Cat!</button>
      </div>
    );
  }
}

export default App;
