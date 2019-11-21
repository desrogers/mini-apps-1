const Btn = (props) => (
  <button className="btn btn-primary" type="submit" onClick={props.handleClick}>{props.name}</button>
);

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      streetLine1: '',
      streetLine2: '',
      city: '',
      state: '',
      streetZip: '',
      phone: '',
      creditCardNumber: '',
      exp: '',
      cvv: '',
      billingZip: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(form) {
    console.log('Submitted!')
    this.props.handleClick();

    if (this.props.step > 1) {

      switch (form) {
        case 'shipping':
          this.props.updateUser({
            shippingAddress: JSON.stringify({
              streetLine1: this.state.streetLine1,
              streetLine2: this.state.streetLine2,
              city: this.state.city,
              state: this.state.state,
              streetZip: this.state.streetZip
            }),
            phone: this.state.phone
          })
          break;
        case 'billing':
          this.props.updateUser({
            creditCard: JSON.stringify({
              creditCardNumber: this.state.creditCardNumber,
              exp: this.state.exp,
              cvv: this.state.cvv,
              billingZip: this.state.billingZip
            })
          })
          break;
      }

    } else {
      this.props.createUser({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }

  }

  render() {
    switch (this.props.step) {
      case 1: // F1
        return (
          <div>
            <p className="lead">Account Info</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.handleSubmit();
            }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" className="form-control" value={this.state.email} name="email" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handleChange} />
              </div>
              <Btn name="Next" />
            </form>
          </div>
        )
        break;
      case 2: // F2
        return (
          <div>
            <p className="lead">Shipping Information</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.handleSubmit('shipping');
            }}>
              <div className="form-group">
                <label>Street Line 1</label>
                <input type="text" name="streetLine1" className="form-control" value={this.state.streetLine1} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label>Street Line 2</label>
                <input type="text" name="streetLine2" className="form-control" value={this.state.streetLine2} onChange={this.handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group col-sm-6">
                  <label>City</label>
                  <input type="text" name="city" className="form-control" value={this.state.city} onChange={this.handleChange} />
                </div>
                <div className="form-group col-sm-4">
                  <label>State</label>
                  <input type="text" name="state" className="form-control" value={this.state.state} onChange={this.handleChange} />
                </div>
                <div className="form-group col-sm-2">
                  <label>Zip Code</label>
                  <input type="text" name="streetZip" className="form-control" value={this.state.streetZip} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Phone No.</label>
                <input type="text" name="phone" className="form-control" value={this.state.phone} onChange={this.handleChange} />
              </div>
              <Btn name="Next" />
            </form>
          </div>
        )
        break;
      case 3: // F3
        break;
      case 4: // Confirmation
        break;
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      userId: null
    };
    this.handleNextClick = this.handleNextClick.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  handleNextClick() {
    this.setState((state, props) => ({ step: state.step += 1 }))
  }

  createUser(userObj) {
    // POST Request
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: "same-origin"
    })
      .then(response => {
        console.log('POST Request Status: ', response.status);
        return response.text();
      }, err => console.error('Operation failed: ', err))
      .then(user => this.setState({userId: user.id}));

  }

  updateUser(userObj) {

    userObj.id = this.state.userId;
    console.log('user: ', userObj);

    // PUT request with obj
    fetch('api/users', {
      method: 'PUT',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: "same-origin"
    }).then(response => {
      console.log('status code: ', response.status);
    }, err => console.error('Operation failed: ', err));
  }

  render() {
    if (this.state.step === 0) {
      return (
        <Btn name="Checkout" handleClick={this.handleNextClick}></Btn>
      );
    } else {
      return (
        <Form
          handleClick={this.handleNextClick}
          step={this.state.step}
          createUser={this.createUser}
          updateUser={this.updateUser}
        />);
    }
  }
};

ReactDOM.render(<App />, document.querySelector('#app'));