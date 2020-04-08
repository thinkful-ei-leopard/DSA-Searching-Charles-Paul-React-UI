import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please enter data.',
      result: '',
      dataset: '25 10 7 6 2 14 29',
      searchCount: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLinear = this.handleLinear.bind(this);
    this.handleBinary = this.handleBinary.bind(this);
  }

  handleLinear(event) {
    event.preventDefault();
    const dataArray = this.state.dataset.split(' ');
    for (let i = 0; i < dataArray.length; i++) {
      if (parseInt(dataArray[i]) == parseInt(this.state.value)) {
        this.setState({ result: i + 1 });
        return;
      } else {
        this.setState({ result: -1 });
      }
    }
  }

  handleBinary(event) {
    event.preventDefault();

    let counter = 0;

    let dataArray = this.state.dataset.split(' ');
    let numArray = dataArray.map((el) => parseInt(el));

    numArray = numArray.sort((a, b) => a - b);
    let searchValue = this.state.value;
    let start = 0
    let end = dataArray.length - 1;

     let binarySearch = (numArray, searchValue, start, end) => {
      start = start === undefined ? 0 : start;
      end = end === undefined ? numArray.length : end;

      if (start > end) {
        this.setState({ searchCount: -1})
        return -1;
      }
      
      let index = Math.floor((start + end) / 2);
      const item = numArray[index];

      console.log(item, index)
      counter++;
      if (item == searchValue) {
        this.setState({ searchCount: counter });
        return index;
      } else if (item < searchValue) {
        return binarySearch(numArray, searchValue, index + 1, end);
      } else if (item > searchValue) {
        return binarySearch(numArray, searchValue, start, index - 1);
      }
      
    }
    binarySearch(numArray, searchValue, start, end);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <p>test</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}></input>
          <label htmlFor="linear-button">Linear</label>
          <button
            id="linear-button"
            className="linear-button"
            type="submit"
            onClick={this.handleLinear}></button>
          <label htmlFor="binary-button">Binary</label>
          <button
            id="binary-button"
            className="binary-button"
            type="submit"
            onClick={this.handleBinary}></button>
        </form>
        <h1>Linear count: {this.state.result}</h1>
        <h1>Binary count: {this.state.searchCount}</h1>
      </div>
    );
  }
}

export default App;
