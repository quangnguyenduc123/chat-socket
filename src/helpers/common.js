import bcrypt from 'bcrypt'
import FormData from 'form-data'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import { isBuffer } from 'util'
import { USER_ROLES, COLLECTION_TYPE } from '../common/constant/index.js'
import config from '../config/index.js'

const hashPassword = async password => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const checkUserAndRole = (login_id, role, id) => {
  if (role === USER_ROLES.USER && login_id !== id) {
    return false
  }
  return true
}

const uploadMedia = async (file_name, collection_type) => {
  try {
    const form = new FormData()
    let collection_id = config.CONVERSATION_COLLECTION_ID
    if (collection_type === COLLECTION_TYPE.PROFILE)
      collection_id = config.PROFILE_COLLECTION_ID
    // eslint-disable-next-line no-underscore-dangle
    const __dirname = path.resolve(path.dirname(''))
    const file_path = path.join(__dirname, file_name)
    form.append('images', fs.createReadStream(file_path))
    form.append('app_id', config.APP_ID)
    form.append('collection_id', collection_id)
    form.append('category_id', config.CATEGORY_ID)
    const res = await axios({
      method: 'post',
      url: `${config.API_BASE_G_MEDIA_BE}/api/v1/photo`,
      headers: {
        // eslint-disable-next-line no-underscore-dangle
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        'x-auth-token': config.TOKEN_MEDIA,
      },
      data: form,
    })
    if (res.data.code === 200) {
      return res.data.data.photo_list
    }
    return null
  } catch (error) {
    return null
  }
}

export default {
  hashPassword,
  checkUserAndRole,
  uploadMedia,
}
