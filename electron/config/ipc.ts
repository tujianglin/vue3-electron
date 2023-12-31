import { IpcMainInvokeEvent, MessageBoxOptions, MessageBoxReturnValue, OpenDialogOptions, OpenDialogReturnValue } from 'electron';

export const enum IpcChannel {
  /* 打开系统弹窗信息 */
  OpenMessagebox = 'open-messagebox',
  /* 读取本地文件 */
  ReadLocalfile = 'read-localfile',
}

type IpcMainEventListener<Send = void, Receive = void> = {
  ipcMainHandle: (event: IpcMainInvokeEvent, args: Send) => Receive | Promise<Receive>;
  ipcRendererInvoke: (args: Send) => Promise<Receive>;
};
type IpcMainEvent = {
  [IpcChannel.OpenMessagebox]: IpcMainEventListener<MessageBoxOptions, MessageBoxReturnValue>;
  [IpcChannel.ReadLocalfile]: IpcMainEventListener<OpenDialogOptions, OpenDialogReturnValue>;
};

type IpcRenderderEvent = {};

export type IpcMainHandle = {
  [Key in keyof IpcMainEvent]: IpcMainEvent[Key]['ipcMainHandle'];
};

export type IpcRendererInvoke = {
  [Key in keyof IpcMainEvent]: IpcMainEvent[Key]['ipcRendererInvoke'];
};

export type IpcRendererOn = {
  [Key in keyof IpcRenderderEvent]: IpcRenderderEvent[Key]['ipcRendererOn'];
};

export type WebContentSend = {
  [Key in keyof IpcRenderderEvent]: IpcRenderderEvent[Key]['webContentSend'];
};
