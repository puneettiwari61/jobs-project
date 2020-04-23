import React, { Component } from "react";
import "./login.scss";

class Login extends Component {
  render() {
    return <>
    <div class="login-box">
	<h2>Login</h2>
	<form action="">
		<div class="user-box">
			<input type="text" name="" required=""/>
			<label>Username</label>
		</div>
		<div class="user-box">
			<input type="password"/>
			<label for="">Password</label>
		</div>
		<a href="">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			Login
		</a>
	</form>
</div>
</>;
  }
}

export default Login;
