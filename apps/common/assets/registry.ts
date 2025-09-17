// 自动收集 common 包内的默认素材（图片与图标）
// 注意：此文件位于 assets 目录内，import.meta.glob 的相对模式以 './' 开头，符合 Vite 要求。

// 图标（icons 目录下的 svg/png）
export const defaultIconUrls = Object.values(
  import.meta.glob('./icons/*.{svg,png}', {eager: true, as: 'url'}) as Record<
    string,
    string
  >
)

// 图片（assets 下除 icons 目录之外的 png/jpg/jpeg）
export const defaultImageUrls = Object.entries(
  import.meta.glob('./**/*.{png,jpg,jpeg}', {eager: true, as: 'url'}) as Record<
    string,
    string
  >
)
  .filter(([path]) => !path.startsWith('./icons/'))
  .map(([, url]) => url)
