import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const iconsDir = path.resolve(__dirname, '../apps/common/assets/icons')
const outputFile = path.resolve(__dirname, '../apps/common/components/MyIcon/iconPath.ts')

function getSvgFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      getSvgFiles(fullPath, fileList)
    } else if (file.endsWith('.svg')) {
      // 生成相对icons文件夹的路径，并删除后缀名(作为iconPath的key)
      const relativeName = path
        .relative(iconsDir, fullPath)
        .replace(/\\/g, '/')
        .replace(/\.svg$/, '')
      fileList.push(relativeName)
    }
  })
  return fileList
}

const svgFiles = getSvgFiles(iconsDir)

const tsContent = `// 自动生成，请勿手动修改
export const iconPath = {
  ${svgFiles.map(p => `'${p}': ()=>import('../../assets/icons/${p}.svg')`).join(',\n  ')}
};
export type iconNamesType = keyof typeof iconPath;
`

fs.writeFileSync(outputFile, tsContent, 'utf-8')
console.log('iconPath.ts 已生成，SVG 数量:', svgFiles.length)
