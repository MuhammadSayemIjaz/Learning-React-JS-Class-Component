import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    console.log('constructor')
    this.state = {
      isloading: true,
      user: [],
      serachField: ''
    }
  }

  componentDidMount() {
    console.log('Mount component');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState(() => ({ user: data, isloading: false }));
      });
  }



  render() {
    console.log('render')
    const filteredArray = this.state.user.filter((user) => (
      user.name.includes(this.state.serachField)
    ))
    return (
      <div className='App'>
        <h1>this is class component</h1>
        {this.state.isloading == false
          &&
          <input
            type="search"
            id="search-bar"
            onChange={(event) => {
              const serachField = event.target.value.toLocaleLowerCase().trim()
              this.setState(() => ({serachField}))
            }
            } />
        }
        {
          filteredArray.map((user) => {
            const { id, name } = user;
            return (
              <h2 key={id}>my name is {name}</h2>
            )
          })
        }
        {this.state.isloading == true && <h1>Loading .....</h1>}
      </div>
    )
  }
}

export default App;