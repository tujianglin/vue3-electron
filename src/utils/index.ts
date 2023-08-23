/**
 * 获取静态资源
 * @param url 图片地址
 * @returns
 */
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};
