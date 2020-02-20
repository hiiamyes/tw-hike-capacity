import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

import axios from 'axios';
import _ from 'lodash';

import styles from './styles.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

import Chart from 'containers/Chart';
import Calendar from './Calendar';
import Drawer from './Drawer';
import NavBar from './NavBar';
import { Helmet } from 'react-helmet';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDrawer: false,
    };
  }
  componentWillMount() {
    if (!this.props.reducer.get('huts').size) {
      this.props.actions.init();
    }
  }

  // fbbb() {
  //
  //   window.fbAsyncInit = function() {
  //     FB.init({
  //       appId      : '231971637230449',
  //       cookie     : true,  // enable cookies to allow the server to access the session
  //       xfbml      : true,  // parse social plugins on this page
  //       version    : 'v2.8' // use graph api version 2.8
  //     });
  //     FB.getLoginStatus( response => {
  //       if (response.status === 'connected') {
  //         FB.api('/me', response => {
  //           console.log('Successful login for: ' + response.name);
  //         });
  //       } else if (response.status === 'not_authorized') {
  //         // document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
  //       } else {
  //         // document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
  //       }
  //     });
  //   };
  //
  //   // Load the SDK asynchronously
  //   (function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  //
  // }

  componentDidMount() {
    // this.fbbb();
    // console.log(gapi);
    // gapi.load('auth2', function(){
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   gapi.auth2.init({
    //     client_id: '733899143466-1b0p96ko7s7qtdqiv8ukjg2nkvcdlhju.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     // Request scopes in addition to 'profile' and 'email'
    //     //scope: 'additional_scope'
    //   });
    //   // attachSignin(document.getElementById('google-signin'));
    //   gapi.signin2.render('google-signin', {
    //     'scope': 'profile email',
    //     'width': 240,
    //     'height': 50,
    //     'longtitle': true,
    //     'theme': 'dark',
    //     onsuccess: (googleUser) => {
    //       console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    //     },
    //     onfailure: (error) => {
    //       console.log(error);
    //     }
    //   });
    // });
  }

  render() {
    const language = this.props.reducer.get('language');
    const huts = this.props.reducer.get('huts');
    const searchBarText = this.props.reducer.get('searchBarText');

    const admins = language === 'zh'
      ? _.groupBy(
          huts.filter(h => new RegExp(searchBarText, 'i').test(h.get('name'))).toJS(),
          'admin',
        )
      : _.groupBy(
          huts.filter(h => new RegExp(searchBarText, 'i').test(h.get('nameEn'))).toJS(),
          'admin',
        );
    return (
      <div className={cx('root')}>
        <Helmet>
          <title>
            {/zh/.test(navigator.languages[0] || '') ? '台灣山屋餘額查詢網' : 'Mountain Huts Taiwan'}
          </title>
        </Helmet>
        <NavBar
          onClick={() => this.setState({ toggleDrawer: false })}
          onToggleClick={() => this.setState({ toggleDrawer: !this.state.toggleDrawer })}
          tour={this.tour}
        />
        <HorizontalLayout className={cx('content')}>
          {/* <button onClick={() =>{
            FB.login(function(response){
              console.log(response);
              FB.api('/me', a => {
                console.log(a);
                // console.log('Successful login for: ' + a.name);
              });
              // Handle the response object, like in statusChangeCallback() in our demo
              // code.
            });
          }}>fb</button> */}
          {/* <div
              className="fb-login-button"
              data-max-rows="1"
              data-size="large"
              data-show-faces="false"
              data-auto-logout-link="false"
              onlogin={() => console.log('loginiinnnnnnn')}></div> */}
          {/* <div id="google-signin" /> */}
          <Drawer ref={d => this.drawer = d} admins={admins} toggle={this.state.toggleDrawer} />

          <div style={{ flex: '1' }} onClick={() => this.setState({ toggleDrawer: false })}>
            <Calendar huts={huts} />
          </div>

        </HorizontalLayout>
      </div>
    );
  }
}

export default connect(
  ({ AppReducer }) => ({ reducer: AppReducer }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(App);

const HorizontalLayout = props => {
  const style = {
    display: 'flex',
  };
  return (
    <div style={style} className={props.className}>
      {props.children}
    </div>
  );
};

const VerticalLayout = props => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  };
  return (
    <div style={Object.assign(style, props.style)} className={props.className}>
      {props.children}
    </div>
  );
};
