import { useEffect, useState} from 'react'
const axios = require('axios')
const instance = axios


function ImageForm() {
  let [previewSource, setPreviewSource] = useState('');
  let [selectedFiles, setSelectedFiles] = useState([]);
  let [encodedFiles, setEncodedFiles] = useState([]);

  const handleFileInputChange= async (e) =>　{
    const fileList = e.target.files;
    const files = Array.from(fileList);
    const array = [];
    previewFiles(files, array);
    setSelectedFiles(files);
    setPreviewSource(array);
  }

  const previewFiles = (files, array) => {
      files.forEach(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(prev => [...prev, reader.result])
        }
      })
  }
  
  const handleSubmitFiles = (e) => {
    e.preventDefault();
    if(!selectedFiles) return;
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEncodedFiles(files => [...files, reader.result]);
      }
    })
  }

  useEffect( () => {
    if(selectedFiles.length === encodedFiles.length 
      && encodedFiles.length !== 0){
      uploadImages();
    }
  }, [encodedFiles])

  const uploadImages = async () => {
    const res = await instance.post('/stores/addstore', 
    { images : encodedFiles }, // encodedFiles is an array of JSON.strigifys
    { headers : {'Content-Type' : 'application/json'} })
    setPreviewSource('');
  }

  return (
    <>
      <form onSubmit={handleSubmitFiles}>
        <input 
          type="file" 
          name="images" 
          multiple
          onChange={e => {handleFileInputChange(e)}} 
        />
        <button type="submit">Submit</button>
      </form>
      { previewSource ? previewSource.map(
        src => {
          return (<img key={src} src={src} 
            alt="chosen" 
            style={{ height : '300px'}}/>
          )
        }
      )
        : null
      }
    </>
  )
}

export default ImageForm;
