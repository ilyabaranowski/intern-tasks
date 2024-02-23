import { createContext, useContext, useReducer } from 'react';
import defaultSetting from '../dataSettings/defaultSettings.js';

const SettingsContext = createContext(null);

const SettingsDispatchContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function SettingsProvider({ children }) {
  const [settings, dispatch] = useReducer(
    settingsReducer,
    defaultSetting
  );

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettingsDispatch() {
  return useContext(SettingsDispatchContext);
}

function settingsReducer(settings, action) {
  switch (action.type) {
    case 'setErrors': {
      return { ...settings, errorsCount: action.value };
    }
    case 'setSeed': {
      return { ...settings, seed: action.value };
    }
    case 'setRegion': {
      return { ...settings, region: action.value };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


