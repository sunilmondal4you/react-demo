import React from 'react';

export class AppForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inpObj: {name:'', mobile:''},
      list : [],
    };

    this.handleChange = this.handleChange.bind(this)
  }
  
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ list: res }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const getResp = await fetch('http://localhost:3030/');
    const body = await getResp.json();
    if (getResp.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async (e, inpObj) => {
    e.preventDefault();
    const postResp = await fetch('http://localhost:3030/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({inpObj }),
    });
    const respBody = await postResp.json();
      if(respBody)
        this.setState({ list: respBody , inpObj: {name:'', mobile:''}})
  };

  handleChange(event) {
    const {name, value} = event.target;
    let inpObj = this.state.inpObj; // this is a reference, not a copy...
    inpObj[name] = value; // so this mutates state ?
    return this.setState({inpObj});
  };
  
	render() {
		return (
			<div className="App">
        <form onSubmit={e => this.handleSubmit(e, this.state.inpObj)}>
          <p><strong>Post to Server:</strong></p>
          <label>Name</label><br/>
          <input type="text" name="name" value={this.state.inpObj.name} onChange={this.handleChange}/><br/>

          <label>Mobile</label><br/>
          <input type="number" name="mobile" value={this.state.inpObj.mobile} onChange={this.handleChange}/><br/>
          <button type="submit">Submit</button>
        </form>
			</div>
		);
	}
}

// export default AppForm;