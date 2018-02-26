import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardBoard from '../components/CardBoard';
import StartWindow from '../components/StartWindow';

class App extends Component {
  render() {
    let x;

    switch (this.props.gameStage) {
      case 'start':
        x = <StartWindow />;
        break;
      case 'game':
        x = <CardBoard />;
        break;
      default:
        x = <div>123</div>;
    }

    return (
      <div className='app'>
        { x }
      </div>
    );
  }
}

const mapStateToProps = state =>
  ({
    gameStage: state.gameStage,
  });

export default connect(mapStateToProps)(App);
