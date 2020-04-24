import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  constructor() {
    super();
    this.state = { active: true };
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.logoutFunction();
  };

  render() {
    return (
      <>
        <div class="container">
          <div class="row">
            <nav class={this.state.active ? "col-sm-12" : "col-sm-12 open"}>
              <div
                onClick={() => this.setState({ active: !this.state.active })}
                class={this.state.active ? "navToggle" : "navToggle open"}
              >
                <div class="icon-left"></div>
                <div class="icon-right"></div>
              </div>
              <img
                onClick={() => this.setState({ active: !this.state.active })}
                class="logo"
                src="https://lh3.googleusercontent.com/Ge8Zhgw7aCP64OBxt_CqhQXc52mRhRMzIG5kvEJ_scvXn9m0ieoPRV__wQwBNEPy5Lf7LX6ruAoYhztVbBIglgt3EphR1WUr7iskVQyDbjJ2XJx7HR70HjdnWTemqoB59DR-dTjvO7yVmdEsbe-u_eBnY9FuJjXRkyKrj75Da_hrVkPHuN9D_ZOvtM8lKu-JywRPND0kNA_rj3wickgxKKLz5Gg0c9JehgzNiOhiz0SWO8VbtA_EvgEG3bb6Mazy5ik_Uts5B6mCWWmQ4PiXkXu6lW4h6HvcTyPIG6DnV8nWNYcI_r-5V9W-oD3WP9fVdeVYjLHSevX3SFO56AiosF28FMaIM353e5tMMNyqqp8KsxaoYwQ7z0fyMohpRcmnLsMWhq2hNfxeT7q5ghVkEhEgELMjYME29-ohdYiubEXvYOsoj4V5QjhY-wPs0mWDWWQFTf0KHYrnTYLevvalXONkRf3NotRSD6b3n_qVwFaWui0NNGTY94TnWHVxPqBoWixYkIdJDA8Tos8WEPKiWqdol1LdlsDVW0RFWrQQijM1FVwUioacYAmR0plGkVwP4HN2LmA0Bve08Yt0Rj8OC2_LZj-beFc6OL_v6hmA_D_Avikd5gcC4Fw8yZyO69zX8c0UpxTZzLYnqMvd-FeLX_lwwTJ3KmjRV7a8-R2jQsM4ngx9vAJ0_QwjwY94jMaPqMeEPT4Dk4y6RSsxnKyDYzc3ADOykKQnKk-0f7bFJCy3fFbfZLKwmw=w452-h300-no"
              />

              <h2>
                <span style={{ fontSize: "1rem" }}>
                  {this.props.user && this.props.user.email}
                </span>
                {this.props.user ? (
                  <span
                    style={{ fontSize: "1.4rem" }}
                    onClick={this.handleLogout}
                  >
                    <button class="pure-material-button-contained top_btns">
                      Logout
                    </button>
                  </span>
                ) : (
                  <Link to="/candidates/login">
                    <button class="pure-material-button-contained top_btns">
                      Login
                    </button>
                  </Link>
                )}
                <Link to="/employers/login">
                  <button class="pure-material-button-contained top_btns">
                    For Employers
                  </button>
                </Link>
              </h2>
              <ul>
                <li>
                  <div class="form__group">
                    <input
                      type="text"
                      id="email"
                      class="form__field"
                      placeholder="Job Title"
                    />
                    <label for="email" class="form__label">
                      Job Title
                    </label>
                  </div>
                  <div class="form__group">
                    <input
                      type="text"
                      id="email"
                      class="form__field"
                      placeholder="Location"
                    />
                    <label for="email" class="form__label">
                      Location or Remote
                    </label>
                  </div>
                  <button class="pure-material-button-contained">
                    Find Jobs
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
