const playerData = {
  Flags: {
    testFlag: false,
    testString: 'grunk',
    testCounter: 10
  },
  Inventory: {
    horn: {
      text: 'A funny horn',
      amount: 0
    }
  },
  Stats: {
    testStat: {
      _value: 0,
      getter (Player) {
        if (Player.Flags.testFlag) {
          return this._value * 2
        }
        return this._value
      },
      setter (Player, Value) {
        console.log(this._value, Value, Player)
        if (Player.Flags.testFlag) {
          this._value = 10 + Value
        } else {
          this._value = Value
        }
      }
    }
  }
}

module.exports = playerData
