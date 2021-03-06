import { Tab, Tabs } from 'material-ui/Tabs';
import React from 'react';
import { browserHistory, Link } from 'react-router';

const Nav = React.createClass({
  handleTouchTapAvatar() {
    if (!this.props.loggedIn) {
      this.props.handleSlideIndex(null);

      return browserHistory.push('/login');
    }

    this.props.handleSlideIndex(null);

    return browserHistory.push('/logout');
  },

  handleTouchTapLogin(event) {
    const menu = document.getElementsByClassName('menu')[0];
    const sideMenu = document.getElementsByClassName('sideMenu')[0];
    const sideMenuWrap = document.getElementsByClassName('sideMenuWrapper')[0];

    menu.className = 'menu hideLg';
    sideMenu.style.left = '500px';
    sideMenuWrap.style.zIndex = '0';
    sideMenuWrap.style.borderLeft = '';

    if (event.target.id === 'login') {
      return browserHistory.push('/login');
    }

    browserHistory.push('/logout');
  },

  handleTouchTapLogo() {
    browserHistory.push(`/`);
  },

  handleTouchTapMenu() {
    const authBtnLogout = document.getElementsByClassName('authBtnLogout')[0];
    const authBtnMeetup = document.getElementsByClassName('authBtnMeetup')[0];
    const menu = document.getElementsByClassName('menu')[0];
    const sideMenu = document.getElementsByClassName('sideMenu')[0];
    const sideMenuWrap = document.getElementsByClassName('sideMenuWrapper')[0];

    if (menu.className === 'menu hideLg open') {
      if (authBtnMeetup) {
        authBtnMeetup.style.zIndex = '1100';
      }

      if (authBtnLogout) {
        authBtnLogout.style.sIndex = '1100';
      }

      menu.className = 'menu hideLg';
      sideMenu.style.left = '500px';
      sideMenuWrap.style.zIndex = '0';
      sideMenuWrap.style.borderLeft = '';
    }

    else {
      if (authBtnMeetup) {
        authBtnMeetup.style.zIndex = '0';
      }

      if (authBtnLogout) {
        authBtnLogout.style.zIndex = '0';
      }

      menu.className += ' open';
      sideMenu.style.left = '0';
      sideMenuWrap.style.zIndex = '999';
      sideMenuWrap.style.borderLeft = '100vw solid rgba(34, 34, 34, 0.75)';
    }

  },

  handleTouchTapSideNav(event) {
    const pages = this.props.pages;
    const index = parseInt(event.target.id);
    const menu = document.getElementsByClassName('menu')[0];
    const sideMenu = document.getElementsByClassName('sideMenu')[0];
    const sideMenuWrap = document.getElementsByClassName('sideMenuWrapper')[0];

    for (const page in pages) {
      if (index === 0) {
        browserHistory.push(`/`);
      }
      else if (index === pages[page]) {
        browserHistory.push(`/${page}`);
      }
    }

    menu.className = 'menu hideLg';
    sideMenu.style.left = '500px';
    sideMenuWrap.style.borderLeft = '';
  },

  handleTouchTapTabs(value) {
    const pages = this.props.pages;

    for (const page in pages) {
      if (value === 0) {
        browserHistory.push(`/`);
      }
      else if (value === pages[page]) {
        browserHistory.push(`/${page}`);
      }
    }
  },

  render() {
    let loginOrLogout = <div>
      <img
        className="avatarImgSide"
        src={this.props.avatarUrl}
      />
      <a
        className="sideNav colorNav"
        id="logout"
        onTouchTap={this.handleTouchTapLogin}
      >
        LOGOUT
      </a>
    </div>;

    if (!this.props.loggedIn) {
      loginOrLogout = <a
        className="sideNav colorNav login"
        id="login"
        onTouchTap={this.handleTouchTapLogin}
      >
        SIGNUP / LOGIN
      </a>;
    }

    let avatar = <div
      className="avatar hideSm"
      onTouchTap={this.handleTouchTapAvatar}
    >
      <img className="avatarLogo" src="images/avatar.png" />
    </div>;

    if (this.props.avatarUrl) {
      avatar = <img
        className="avatarImg hideSm"
        onTouchTap={this.handleTouchTapAvatar}
        src={this.props.avatarUrl}
      />;
    }



    const styles = {
      tab: {
        backgroundColor: '#FFFFFF',
        color: '#444444'
      }
    };

    return <nav className="nav">
      <img
        className="navLogo"
        onTouchTap={this.handleTouchTapLogo}
        src="/images/nav-logo.png"
      />

      <Tabs
        inkBarStyle={{ marginLeft: '6%', width: '5%' }}
        className="tabs hideSm"
        onChange={this.handleTouchTapTabs}
        tabItemContainerStyle={{ backgroundColor: 'none' }}
        value={this.props.slideIndex}
      >
        <Tab
          label="HOME"
          style={styles.tab}
          value={0}
        />
        <Tab
          label="HTML"
          style={styles.tab}
          value={1}
        />
        <Tab
          label="CSS"
          style={styles.tab}
          value={2}
        />
        <Tab
          label="JAVASCRIPT"
          style={styles.tab}
          value={3}
        />
        <Tab
          label="GIT"
          style={styles.tab}
          value={4}
        />
        <Tab
          label="ABOUT"
          style={styles.tab}
          value={5}
        />
      </Tabs>

      {avatar}

      <div
        className="menu hideLg"
        id="menu"
        onTouchTap={this.handleTouchTapMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="sideMenuWrapper" onTouchTap={this.handleBorderClick}>
        <aside className="sideMenu">
          {loginOrLogout}

          <a
            className="sideNav"
            onTouchTap={this.handleTouchTapSideNav}
            id="0"
          >
            HOME
          </a>

          <a
            className="sideNav"
            id="1"
            onTouchTap={this.handleTouchTapSideNav}
          >
            HTML
          </a>

          <a
            className="sideNav"
            id="2"
            onTouchTap={this.handleTouchTapSideNav}
          >
            CSS
          </a>

          <a
            className="sideNav"
            id="3"
            onTouchTap={this.handleTouchTapSideNav}
          >
            JAVASCRIPT
          </a>

          <a
            className="sideNav"
            id="4"
            onTouchTap={this.handleTouchTapSideNav}
          >
            GIT
          </a>

          <a
            className="sideNav"
            id="5"
            onTouchTap={this.handleTouchTapSideNav}
          >
            ABOUT
          </a>
        </aside>
      </div>
    </nav>;
  }
});

export default Nav;
