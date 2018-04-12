import React from 'react'
import { Button, Form, Input } from 'element-react'
import { connect } from 'react-redux'
import 'element-theme-default'
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: 'Please input the User name', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please input the User name'));
            } else {
              // if (this.state.form.checkPass !== '') {
              //   this.refs.form.validateField('checkPass');
              // }
              callback();
            }
          } }
        ],
        password: [
          { required: true, message: 'Please input the Password', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Please input the Password'));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  }
  componentWillMount () {
    document.title = "Login"
  }
  
  handleSubmit(e) {
    e.preventDefault();
  
    this.refs.form.validate((valid) => {
      if (valid) {
        let token = this.state.form.userName
        this.props.login(token);
        this.props.history.push("/home")
      } else {
        console.log('error submit!!')
        return false;
      }
    });
  }
  
  handleReset(e) {
    e.preventDefault();
    this.refs.form.resetFields()
  }
  
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }
  
  render() {
    return (
      <div>
        <div className="container marginTop">
          <div className="columns is-mobile">
            <div className="column has-text-centered"><img style={{width: '100px', height: '100px'}} src={require('../logo.png')} alt="Logo" /></div>
          </div>
          <div className="columns is-mobile">
          <div className="column is-3"></div>
            <div className="column has-text-centered home-screen is-6">
              <Form ref="form" label-position="top" model={this.state.form} rules={this.state.rules}>
                <Form.Item prop="userName">
                  <Input type="text" placeholder="User name" value={this.state.form.userName} onChange={this.onChange.bind(this, 'userName')} autoComplete="off" />
                </Form.Item>
                <Form.Item prop="password">
                  <Input type="password" placeholder="Password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete="off" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" className="customButton" onClick={this.handleSubmit.bind(this)}>Login{this.props.isLoggedIn}</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  login: (token) => dispatch({ type: 'Store', token }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login) 
