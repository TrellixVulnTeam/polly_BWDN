import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import auth from './Services/auth.js'
import SignUpComponent from './SignUp/SignUpComponent.js'
import LoginComponent from './Login/LoginComponent.js'
import PollsView from './PollsView/PollsView.js'
import MainFrameComponent from './MainFrame/MainFrameComponent.js'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './index.css';
import { 
  Router,
  Route,
  Link, 
  browserHistory, 
  IndexRoute 
} from 'react-router';
import {
  green500, 
  green50,
  green700,
  cyanA700,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: grey400,
    accent1Color: cyanA700,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'/',
            state: {nextPathname: '/questions/'}
        })
    } 
}


const MuiApp = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SignUpComponent}></IndexRoute>
        <Route path="/login" component={LoginComponent}></Route>
      </Route>
      <Route path="/questions" component={MainFrameComponent} onEnter={requireAuth}>
        <IndexRoute component={PollsView} />
      </Route>
    </Router>
  </MuiThemeProvider>
);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <MuiApp />,
  document.getElementById('root')
);
