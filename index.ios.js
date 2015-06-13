/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('lodash');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var SixteenPuzzle = React.createClass({
  componentWillMount: function () {
    var board = _(16).times(function (index) {
      return {label: index, index: index, empty: index === 15};
    }).shuffle().chunk(4).value();

    this.setState({board: board});
  },

  getEmptyPosition: function () {
    var position = {x: null, y: null};
    for (var y = 0; y < this.state.board.length; y++) {
      for (var x = 0; x < this.state.board[y].length; x++) {
        if (this.state.board[y][x].empty) {
          return {
            column: x,
            row: y
          };
        }
      }
    }
    return null;
  },

  // ensure the selection is only within 1 block above, below, left, or right of the empty square
  // and not diagonal
  withinRange: function (row, column) {
    var emptyPosition = this.getEmptyPosition();
    return Math.abs(row - emptyPosition.row) <= 1 && Math.abs(column - emptyPosition.column) <= 1 &&
    !(Math.abs(row - emptyPosition.row) == 1 && Math.abs(column - emptyPosition.column) == 1);
  },

  swap: function (row, column) {
    var emptyPosition = this.getEmptyPosition();
    if (this.withinRange(row, column)) {
      var tmp = this.state.board[row][column];
      this.state.board[row][column] = this.state.board[emptyPosition.row][emptyPosition.column];
      this.state.board[emptyPosition.row][emptyPosition.column] = tmp;
      this.setState(this.state);
    }
  },
  render: function() {
    var swap = this.swap;
    var won = this.hasWon();
    var getBackgroundColor = function (row, column) {
      if (this.state.board[row][column].empty) {
        return 'red';
      } else if (this.withinRange(row, column)) {
        return '#eee';
      } else {
        return 'transparent';
      }
    }.bind(this);

    if (won) {
      alert('you won');
    }

    var rows = this.state.board.map((columns, row) =>
      <View style={styles.row} key={'row' + row}>
        {columns.map((value, column) =>
          <TouchableHighlight
            underlayColor='transparent'
            key={row + ',' + column}
            onPress={() => swap(row, column)}>
            <View style={[styles.column, {backgroundColor: getBackgroundColor(row, column)}]}>
              <Text style={styles.text}>{value.empty ? 'X' : value.label}</Text>
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
  },

  hasWon: function () {
    var flat = _.flatten(this.state.board);
    for (var i = 0; i < flat.length - 1; i++) {
      if (flat[i].index + 1 !== flat[i + 1].index) {
        return false;
      }
    }
    return true;
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
  },
  text: {
    fontSize: 24
  }
});

AppRegistry.registerComponent('SixteenPuzzle', () => SixteenPuzzle);
