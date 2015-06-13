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
  PanResponder
} = React;

var SixteenPuzzle = React.createClass({
  _panResponder: {},
  moveTo: {row: 0, column: 0},

  componentWillMount: function () {
    var board = [
      [
        {label: 'A'},
        {label: 'B'},
        {label: 'C'},
        {label: 'D'},
      ],
      [
        {label: 'A'},
        {label: 'B'},
        {label: 'C'},
        {label: 'D'},
      ],
      [
        {label: 'A'},
        {label: 'B'},
        {label: 'C'},
        {label: 'D'},
      ],
      [
        {label: 'A'},
        {label: 'B'},
        {label: 'C'},
        {label: 'D'},
      ]
    ];

    board.forEach(function (row, rowIndex) {
      row.forEach(function (column, columnIndex) {
        column._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
          onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
          onPanResponderGrant: this._handlePanResponderGrant,
          onPanResponderMove: this._handlePanResponderMove.bind(this, rowIndex, columnIndex),
          onPanResponderRelease: this._handlePanResponderEnd.bind(this, rowIndex, columnIndex),
          onPanResponderTerminate: this._handlePanResponderEnd.bind(this, rowIndex, columnIndex),
        });
      }.bind(this));
    }.bind(this));

    this.setState({
      board: board
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

  moved: function (event) {
    console.log('event', event);
  },

  responderGranting: function (evt) {
    return true;
  },

  _handleStartShouldSetPanResponder: function () {
    return true;
  },
  _handleMoveShouldSetPanResponder: function () {
    return true;
  },
  _handlePanResponderGrant: function () {},
  _handlePanResponderMove: function (row, column, event, gestureState) {
    // console.log('_handlePanResponderMove', gestureState.dx, gestureState.vx);

  },
  _handlePanResponderEnd: function (row, column, event, gestureState) {
    var x = 0,
        y = 0;
    if (gestureState.dx > 5) {
      x = 1;
    } else if (gestureState.dx < -5) {
      x = -1;
    }

    if (gestureState.dy > 5) {
      y = -1;
    } else if (gestureState.dy < -5) {
      y = 1;
    }

    console.log('swapping', this.state.board[row][column], 'with', this.state.board[row + y][column + x]);


    var tmp = this.state.board[row + y][column + x];
    this.state.board[row + y][column + x] = this.state.board[row][column];
    this.state.board[row][column] = tmp;
    this.setState(this.state);

    console.log('row', row, 'column', column);
    console.log('moveTo', this.moveTo);
  },

  render: function() {
    var swap = this.swap;
    console.log('handlers', this._panResponder);
    var rows = this.state.board.map((columns, row) =>
      <View style={styles.row} key={'row' + row}>
        {columns.map((value, column) =>
          <View style={styles.column}
            key={row + ',' + column}
            {...value._panResponder.panHandlers}>
            <Text>{row}.{value.label}</Text>
          </View>
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
