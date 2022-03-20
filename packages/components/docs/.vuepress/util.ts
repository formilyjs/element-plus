import fs from 'fs'

export default {
  getFiles(dir: string): Array<string> {
    return fs.readdirSync(dir)
  },
}
