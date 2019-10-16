import React from 'react';

export class AppForm extends React.Component {
  state:any = {
    inpObj: {"name":''},
    list : [],
  };
  
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
      body: JSON.stringify({ post: inpObj }),
    });
    const body = await postResp.text();

    this.componentDidMount()
    
  };

  handleChange(event, ref) {
    let sthis = ref;
    const { name, value } = event.target;
    sthis.setState({ inpObj[name]: value });
  }
  
	render() {
		return (
			<div className="App">
        <form>
          <p>
              <strong>Post to Server:</strong>
          </p>
          <input type="text" value={this.state.inpObj.name} onChange={e => this.handleChange(e, this)}/>
          <button type="submit" onClick={e => this.handleSubmit(e, this.state.inpObj)}>Submit</button>
        </form>
			</div>
		);
	}
}

// export default AppForm;