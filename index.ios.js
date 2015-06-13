/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var SixteenPuzzle = React.createClass({


  componentWillMount: function () {
    this.setState({
      board: [
        ['A', 'B', 'C', 'D'],
        ['A', 'B', 'C', 'D'],
        ['A', 'B', 'C', 'D'],
        ['A', 'B', 'C', 'D'],
      ]
    });
  },

  swap: function (row, column) {
    if (column < this.state.board[row].length -1) {
      var tmp = this.state.board[row][column + 1];
      this.state.board[row][column+1] = this.state.board[row][column];
      this.state.board[row][column] = tmp;
    }
    this.setState(this.state);
    console.log('swapping', row, column);
  },

  render: function() {
    var swap = this.swap;

    var rows = this.state.board.map((columns, row) =>
      <View style={styles.row} key={'row' + row}>
        {columns.map((value, column) =>
          <TouchableHighlight underlayColor='transparent' key={row + ',' + column} onPress={() => this.swap(row, column)}>
            <View  style={styles.column}>
              <Text>{row}.{value}</Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {rows}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  board: {
    padding: 5,
    backgroundColor: 'transparent',
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    rotation: 180
  },
  column: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 2,
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('SixteenPuzzle', () => SixteenPuzzle);
