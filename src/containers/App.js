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
      <div className='app'>
        { component }
      </div>
    );
  }
}

const mapStateToProps = state =>
  ({
    prop: state.AppState,
    gameStage: state.AppState.gameStage,
  });

export default connect(mapStateToProps)(App);
