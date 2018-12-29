import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group'

class App extends Component {
  render() {
    return (
      <Router>
        <Route render={({location}) => (
          <div style={styles.fill}>
            <Route exact={true} path='/' render={() => (
              <Redirect to='/hsl/10/90/50' />
            )} />

            <ul style={styles.nav}>
              <NavLink to='/hsl/10/90/50'>Red</NavLink>
              <NavLink to='/hsl/120/100/40'>Green</NavLink>
              <NavLink to='/rgb/33/150/243'>Blue</NavLink>
              <NavLink to='/rgb/240/98/146'>Pink</NavLink>
            </ul>

            <div style={styles.content}>
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames='fade'
                >
                  <Switch location={location}>
                    <Route 
                      exact={true}
                      path='/hsl/:h/:s/:l'
                      component={HSL}
                    />
                    <Route 
                      exact={true}
                      path='/rgb/:r/:g/:b'
                      component={RGB}
                    />
                    <Route render={() => <div>Not Found</div>} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
        )} />
      </Router>
    )
  }
}

const NavLink = (props) => (
  <li style={styles.navItem}>
    <Link {...props} style={{color: 'inherit'}} />
  </li>
)

const HSL = ({match}) => {
 const {params} = match

 return (
  <div style={{
    ...styles.hsl,
    background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
  }}>
    hsl({params.h}, {params.s}%, {params.l}%)
  </div>
 )
}

const RGB = ({match}) => {
  const {params} = match

  return (
    <div style={{
      ...styles.rgb,
      background: `rgb(${params.r}, ${params.g}, ${params.b})`
    }}>
      rgb({params.r}, {params.g}, {params.b})
    </div>
  )
}

const styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center'
}

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absoulte',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex'
}

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px'
}

styles.hsl = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

styles.rgb = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

export default App;
