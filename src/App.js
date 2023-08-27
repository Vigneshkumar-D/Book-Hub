import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {}

  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/shelf" component={BookShelves} />
        <ProtectedRoute exact path="/books/:id" component={BookDetails} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
