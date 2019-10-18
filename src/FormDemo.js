import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Table } from 'reactstrap';
import _lodash from 'lodash';

export class AppForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inpObj: {id:'', name:'', mobile:'', email:''},
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
    _lodash.each(body, (item)=>{
      let itemIndex = _lodash.findIndex(body, item);
      item.id = itemIndex+1
    })
    return body;
  };
  
  handleAddEdit = async (e, inpObj) => {
    e.preventDefault();
    let refBody = inpObj;
    if(inpObj.id){
      refBody = this.state.list;
      refBody[inpObj.id-1] = inpObj;
    }
    const postResp = await fetch('http://localhost:3030/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({refBody }),
    });
    // const respBody = await postResp.json();
    //   if(respBody)
    //     this.setState({ list: respBody , inpObj: {id:'', name:'', mobile:'', email:''}})

    this.setState({inpObj: {id:'', name:'', mobile:'', email:''}});
    this.componentDidMount();

  };

  handleChange(event) {
    const {name, value} = event.target;
    let inpObj = this.state.inpObj; // this is a reference, not a copy...
    inpObj[name] = value; // so this mutates state ?
    return this.setState({inpObj});
  };

  editDetail(e, item){
    this.setState({ inpObj: item})    
  }
  
	render() {
		return (
			<div className="App pt-3">
        <Container>
          <Row>
            <Col sm="12" md="5">
              <h2 className="text-center">Data collection section:</h2>
              <Form onSubmit={e => this.handleAddEdit(e, this.state.inpObj)}>
                <FormGroup>
                  <Label className="ml-2" for="examplename">Name</Label>
                  <Input type="text" id="examplename" name="name" value={this.state.inpObj.name} onChange={this.handleChange} placeholder="Name"/>
                </FormGroup>
                <FormGroup>
                  <Label className="ml-2" for="exampleMob">Mobile</Label>
                  <Input type="number" id="exampleMob" name="mobile" value={this.state.inpObj.mobile} onChange={this.handleChange} placeholder="Mobile"/>
                </FormGroup>              
                <FormGroup>
                  <Label className="ml-2" for="exampleEmail">Mobile</Label>
                  <Input type="email" id="exampleEmail" name="email" value={this.state.inpObj.email} onChange={this.handleChange} placeholder="Email-id" />
                </FormGroup>
                <div className="col text-center">
                  <Button type="submit" color="primary">Submit</Button>
                </div>

              </Form>
            </Col>
            <Col sm="12" md="7" >
              <h2 className="text-center mb-4">Data in tabular view</h2>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.list.map((item, index)=>(
                    <tr key={index+1}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                      <td>
                        <span className="fa fa-edit IconStyle mr-2" onClick={e => this.editDetail(e, item)}></span>
                        <span className="fa fa-trash IconStyle2" color="danger"></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        
			</div>
		);
	}
}

// export default AppForm;