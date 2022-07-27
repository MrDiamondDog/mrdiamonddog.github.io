import Uppy from '../node_modules/@uppy/core/types/index.js'
import FileInput from '../node_modules/@uppy/file-input/types/index.js'
import XHRUpload from '../node_modules/@uppy/xhr-upload/types/index.js'
import ProgressBar from '../node_modules/@uppy/progress-bar/types/index.js'

document.querySelector('.Uppy').innerHTML = ''

const uppy = new Uppy({ debug: true, autoProceed: true })
uppy.use(FileInput, {
  target: '.Uppy',
})
uppy.use(ProgressBar, {
  target: '.UppyProgressBar',
  hideAfterFinish: false,
})
uppy.use(XHRUpload, {
  endpoint: 'https://xhr-server.herokuapp.com/upload',
  formData: true,
  fieldName: 'files[]',
})

// And display uploaded files
uppy.on('upload-success', (file, response) => {
  const url = response.uploadURL
  const fileName = file.name

  const li = document.createElement('li')
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.appendChild(document.createTextNode(fileName))
  li.appendChild(a)

  document.querySelector('.uploaded-files ol').appendChild(li)
})