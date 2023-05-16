import {createEl} from './create-el'

export function downloadFile(blob: Blob, download: `${string}.${string}`) {
  const href = URL.createObjectURL(blob)
  createEl('a', {download, href}).click()
  URL.revokeObjectURL(href)
}
