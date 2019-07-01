
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, Button} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';

export default class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,  
      winningTiles: []
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame() {
    this.setState({
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
      winningTiles: []
    })
  }

  renderMove(row, col) {
    const place = this.state.board[row][col];
    switch (place) {
      case 1: return <MCIcon name="close" size={70} color="blue" />
      case -1: return <MCIcon name="circle-outline" size={70} color="green"/> ;
      default: return <MCIcon />;
    }
  }

  makeMove(row, col) {
    // playButtonSound();
    //reject improper selection
    if (this.state.board[row][col] !== 0) return;

    //register move to board
    const newBoard = this.state.board.slice();
    newBoard[row][col] = this.state.currentPlayer;
    this.setState({board: newBoard});

    //cycle players
    const nextPlayer = this.state.currentPlayer * -1;
    this.setState({currentPlayer: nextPlayer});


    //check winner
    const winner = this.gameOver();
    if (winner === 1) {
      Alert.alert("Game Over", "Player 1 (X) is the Winner!",
      [
        {text: "OK"},
        {text: "Restart", onPress: () => this.initializeGame() }
      ]
      );
    }
    else if (winner === -1) {
      Alert.alert("Game Over", "Player 2 (O) is the Winner!",
        [
          { text: "OK" },
          { text: "Restart", onPress: () => this.initializeGame() }
        ]
      );
    }

    
  }

  currentPlayerPrompt() {
    switch(this.state.currentPlayer){
      case 1: return <Text style={styles.prompt}>Player X, make your move!</Text>;
      case -1: return <Text style={styles.prompt}>Player O, your turn!</Text>;
      default: return <Text style={styles.prompt}>Game Over!</Text>
    }
  }

  gameOver() {
    const board = this.state.board;
    let sum;

    //rows
    for (let i = 0; i < 3; i++) {
      sum = board[i][0] + board[i][1] + board[i][2];
      if (sum === 3) { 
        switch (i) {
          case 0: {
            this.setState({ winningTiles: [1, 2, 3] });
            break;
          }
          case 1: {
            this.setState({ winningTiles: [4, 5, 6] });
            break;
          }
          case 2: {
            this.setState({ winningTiles: [7, 8, 9] });
            break;
          }
        }
        return 1; 
      }
      else if (sum === -3) { 
        switch (i) {
          case 0: {
            this.setState({ winningTiles: [1, 2, 3] });
            break;
          }
          case 1: {
            this.setState({ winningTiles: [4, 5, 6] });
            break;
          }
          case 2: {
            this.setState({ winningTiles: [7, 8, 9] });
            break;
          }
        }
        return -1; 
      }
    }

    //columns
    for (let i = 0; i < 3; i++) {
      sum = board[0][i] + board[1][i] + board[2][i];
      if (sum === 3) {
        switch (i) {
          case 0: {
            this.setState({ winningTiles: [1, 4, 7] });
            break;
          }
          case 1: {
            this.setState({ winningTiles: [2, 5, 8] });
            break;
          }
          case 2: {
            this.setState({ winningTiles: [3, 6, 9] });
            break;
          }
        }
        return 1;
      }
      else if (sum === -3) {
        switch (i) {
          case 0: {
            this.setState({ winningTiles: [1, 4, 7] });
            break;
          }
          case 1: {
            this.setState({ winningTiles: [2, 5, 8] });
            break;
          }
          case 2: {
            this.setState({ winningTiles: [3, 6, 9] });
            break;
          }
        }
        return -1;
      }
    }

    //diagonals
    sum = board[0][0] + board[1][1] + board[2][2];
    if (sum === 3) { 
      this.setState({ winningTiles: [1, 5, 9] });
      return 1; 
    }
    else if (sum === -3) { 
      this.setState({ winningTiles: [1, 5, 9] });
      return -1; 
    }

    sum = board[0][2] + board[1][1] + board[2][0];
    if (sum === 3) { 
      this.setState({ winningTiles: [3, 5, 7] });
      return 1; 
    }
    else if (sum === -3) { 
      this.setState({ winningTiles: [3, 5, 7] });
      return -1; 
    }

    //no winner
    return 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tic-Tac-Toe</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.makeMove(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }, this.state.winningTiles.includes(1) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF"} ]}>
            {this.renderMove(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.makeMove(0, 1)} style={[styles.tile, { borderTopWidth: 0 }, this.state.winningTiles.includes(2) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF" } ]}>
            {this.renderMove(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.makeMove(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }, this.state.winningTiles.includes(3) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF" } ]}>
            {this.renderMove(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.makeMove(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }, this.state.winningTiles.includes(4) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF" } ]}>
            {this.renderMove(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.makeMove(1, 1)} style={[styles.tile, this.state.winningTiles.includes(5) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF" } ]}>
            {this.renderMove(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.makeMove(1, 2)} style={[styles.tile, { borderRightWidth: 0 }, this.state.winningTiles.includes(6) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF" } ]}>
            {this.renderMove(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.makeMove(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }, this.state.winningTiles.includes(7) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF" } ]}>
            {this.renderMove(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.makeMove(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }, this.state.winningTiles.includes(8) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF" } ]}>
            {this.renderMove(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.makeMove(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }, this.state.winningTiles.includes(9) ? { backgroundColor: "red" } : { backgroundColor: "#F5FCFF" } ]}>
            {this.renderMove(2, 2)}
          </TouchableOpacity>
        </View>
        {this.currentPlayerPrompt()}
        
        <View style={styles.spacer} />

        <Button style={styles.button} title="New Game" onPress={() => this.initializeGame()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 4000,
    color: "black"
  },
  spacer: {
    paddingTop: 50
  },
  prompt: {
    paddingTop: 10
  }
});

// Sound.setCategory("Ambient", true);

// const buttonSound = new Sound(require('../audio/button.mp3'));
// const playButtonSound = () => {
//   buttonSound.play((success) => buttonSound.reset());
// };

