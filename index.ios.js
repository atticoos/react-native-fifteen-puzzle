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
  TouchableHighlight,
} = React;

var SixteenPuzzle = React.createClass({

  componentWillMount: function () {
    var board = [
      [
        {label: '1A'},
        {label: '1B'},
        {label: '1C'},
        {label: '1D'},
      ],
      [
        {label: '2A'},
        {label: '2B'},
        {label: '2C'},
        {label: '2D'},
      ],
      [
        {label: '3A'},
        {label: '3B'},
        {label: '3C'},
        {label: '3D'},
      ],
      [
        {label: '4A'},
        {label: '4B'},
        {label: '4C'},
        {label: '4D'},
      ]
    ];

    var count = 0;
    board = board.map(function (row, rowIndex) {
      return row.map(function (column, columnIndex) {
        column.label += count;
        column.index = count;
        count++;
        return column;
      });
    });

    this.setState({
      board: board,
      selected: null
    });
  },

  swap: function (row, column) {
    console.log('incoming row', row, 'column', column);
    console.log('existing selection', this.state.selected);
    if (this.state.selected === null) {
      this.state.selected = {
        row: row,
        column: column
      };
    } else if (this.state.selected.row == row && this.state.selected.column == column) {
      console.log('unsetting selection');
      this.state.selected = null;
    } else {
      console.log('swapping');
      var tmp = this.state.board[row][column];
      this.state.board[row][column] = this.state.board[this.state.selected.row][this.state.selected.column];
      this.state.board[this.state.selected.row][this.state.selected.column] = tmp;
      this.state.selected = null;
    }
    console.log('selected', this.state.selected);
    this.setState(this.state);
    return;

    if (column < this.state.board[row].length -1) {
      var tmp = this.state.board[row][column + 1];
      this.state.board[row][column+1] = this.state.board[row][column];
      this.state.board[row][column] = tmp;
    }
    this.setState(this.state);
    console.log('swapping', row, column);
  },

  moved: function (event) {
    console.log('event', event);
  },

  render: function() {
    var swap = this.swap;
    console.log('handlers', this._panResponder);
    var rows = this.state.board.map((columns, row) =>
      <View style={styles.row} key={'row' + row}>
        {columns.map((value, column) =>
          <TouchableHighlight
            underlayColor='transparent'
            key={row + ',' + column}
            onPress={() => swap(row, column)}>
            <View style={styles.column}>
              <Text>{value.label}</Text>
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
