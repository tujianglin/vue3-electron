export function signleton<T extends object>(className): new () => T {
  let ins;
  return new Proxy(className, {
    construct(target, args) {
      if (!ins) {
        ins = new className(target, ...args);
      }
      return ins;
    },
  });
}
