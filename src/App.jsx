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
          <>
            <input
              type="search"
              id="search-bar"
              onChange={(event) => {
                const serachField = event.target.value.toLocaleLowerCase().trim()
                this.setState(() => ({ serachField }))
              }
              } />
            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Search
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                />
              </div>
            </div>
          </>
        }
        {
          filteredArray.map((user) => {
            const { id, name } = user;
            return (
              <>
                <h2 key={id} className="text-3xl font-bold underline">my name is {name}</h2>
              </>
            )
          })
        }
        {this.state.isloading == true && <h1>Loading .....</h1>}
      </div>
    )
  }
}

export default App;