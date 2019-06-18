
import React from 'react';
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { Loading } from "./components/LoadingComponent";

//import components
import Main from "./components/MainComponent";

const { store, persistor } = ConfigureStore();

export default class App extends React.Component
{
  render()
  {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
        >
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
