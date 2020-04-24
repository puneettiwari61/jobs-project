import React, { Component } from 'react';
import './signup.scss';

class SignUp extends Component {
	render() {
		return (
			<>
				<div class="login-box sign_up">
					<form>
						<h2>SignUp Employer</h2>
						<div class="user-box">
							<input type="email" name="email" required="" />
							<label>Email</label>
						</div>
						<div class="user-box">
							<input type="password" name="password" required="" />
							<label>Password</label>
						</div>
						<div class="user-box">
							<input type="text" name="firstname" required="" />
							<label>First Name</label>
						</div>
						<div class="user-box">
							<input type="text" name="lastname" required="" />
							<label>Last Name</label>
						</div>
						<div class="user-box">
							<input type="tel" name="contactnumber" required="" />
							<label>Contact</label>
						</div>
						<div class="user-box">
							<input type="date" name="dob" required="" />
							<label>DOB</label>
						</div>
						<div class="user-box">
							<input type="url" name="profile_image" required="" />
							<label>Profile Image URL</label>
						</div>

						<div class="form-radio">
							<div class="radio">
								<label>
									<input type="radio" name="gender"  value="male"/>
									<i class="helper"></i>Male
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="gender" value="female" />
									<i class="helper"></i>Female
								</label>
							</div>
							<div class="radio">
								<label>
									<input type="radio" name="gender" value="others"/>
									<i class="helper"></i>Others
								</label>
							</div>
						</div>
						<div class="checkbox">
							<label>
								<input type="checkbox" />
								<i class="helper"></i> I agree to Terms & Conditions
							</label>
						</div>
						<a href="">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							Submit
						</a>
					</form>
				</div>
			</>
		);
	}
}

export default SignUp;
