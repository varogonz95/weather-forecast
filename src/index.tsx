import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import ThemeProvider from './features/theme-provider/ThemeProvider';
import './index.css';
import { IApiSettings } from './models/ApiModels';
import reportWebVitals from './reportWebVitals';
import { IWeatherApiConfig, WeatherServiceApi } from './services/WeatherServiceApi';

const container = document.getElementById('root')!;
const root = createRoot(container);

const apiSettings: IApiSettings = {
    protocol: 'https',
    base: 'api.openweathermap.org'
};
const serviceConfig: IWeatherApiConfig = {
    appid: 'bfbea3aa97728534b5af53cff193e1c9',
    namespace: 'data',
    version: '2.5',
    units: 'imperial'
};
const weatherApi = new WeatherServiceApi(apiSettings, serviceConfig);

const props = {
    weatherApi
};

root.render(
    <React.StrictMode>
        <App {...props} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
