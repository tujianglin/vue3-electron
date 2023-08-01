import { app } from 'electron';
import { MainInit } from './services/windowManager';

app.whenReady().then(() => {
  new MainInit().initWindow();
});
