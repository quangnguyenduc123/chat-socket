import fs from 'fs'
import path from 'path'
import config from '../config/index.js'

const deleteImage = () => {
  try {
    const directory = config.UPLOAD_DIR
    fs.readdir(directory, (err, files) => {
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          // eslint-disable-next-line no-console
          if (err) console.log(err)
        })
      }
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export default {
  deleteImage,
}
