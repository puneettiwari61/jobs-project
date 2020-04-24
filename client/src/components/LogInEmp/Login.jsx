import React, { Component } from "react";
import "./login.scss";

class Login extends Component {
  render() {
    return <>
    <div class="login-box">
	<h2>Employer Login</h2>
	<form action="">
		<div class="user-box">
			<input type="email" name="email" required=""/>
			<label>Email</label>
		</div>
		<div class="user-box">
			<input type="password"  name="password"/>
			<label for="">Password</label>
		</div>
		<a href="">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			Login
		</a><br/>
    <a href="">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			New to Steve's Jobs?
		</a>
	</form>
</div>
</>;
  }
}

export default Login;
