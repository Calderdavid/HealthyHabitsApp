
import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'

export const HealthyHabitsApp = () =>{

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </  BrowserRouter>
    </Provider>
  )
}
