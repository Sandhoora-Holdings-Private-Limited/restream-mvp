import { createContext, useState } from 'react';

interface AppWrapperProps {
    children : React.ReactNode
}

const insitalStore = {
                      streamDetails: []
                    }

export const AppContext = createContext(insitalStore);

export function AppWrapper({ children }: AppWrapperProps) {
  const [streamDetails, setStreamDetails] = useState("My First Stream")

  const store = {
    streamDetails: [streamDetails, setStreamDetails]
  }

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
}






