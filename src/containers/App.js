import React, { Component } from 'react';
import { connect } from 'react-redux';
import StartWindow from './StartWindow';
import EndWindow from './EndWindow';
import GameWindow from './GameWindow';

class App extends Component {
  render() {
    let component;

    switch (this.props.gameStage) {
      case 'game':
        component = <GameWindow />;
        break;
      case 'end':
        component = <EndWindow />;
        break;
      default:
        component = <StartWindow />;
    }

    return (
      <div className='app' data-tid='App'>
        { component }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameStage: state.gameInfo.stage,
});

export default connect(mapStateToProps)(App);
