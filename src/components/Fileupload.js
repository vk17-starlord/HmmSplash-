import React  ,{useState} from 'react'
import Illustraionimage from './image.svg'
import {useDropzone} from 'react-dropzone';
import axios from 'axios';  
import Loader from './Loader';
import DisplayImage from './DisplayImage';
function Fileupload() {
 
    const [show, setshow] = useState('step1')
    const [Data, setData] = useState('')
    
    // Handles file upload event and updates state
    function handleUpload(event) {
  
 
      ConvertFile(event.target.files[0])
    }
  

    const { getRootProps, getInputProps} = useDropzone({    
        maxFiles:1,
        noClick: true,
        onDrop:(acceptedFiles)=>{
            console.log(acceptedFiles)
            ConvertFile(acceptedFiles[0])
        }
      });


  
  
      const ConvertFile=(image)=>{

        setshow('step2')

        const reader  = new FileReader();
        reader.readAsDataURL(image)
        reader.onloadend =()=>{
         UploadToServer(reader.result)
        }


       }


       const UploadToServer=(base64)=>{
     
        console.log(base64)
        try {
           
    axios.post(`https://hmmsplash.herokuapp.com/upload`, { data:base64 })
      .then(res => {
        console.log(res.data);
        const response = res.data;
        setData(response)
   
        
        setshow('step3')

      })

        } catch (error) {
            console.log(error)
        }
       }


       const Option = ()=>{

        if(show==="step1"){
            return  <div className="hide-on-load" >
            <h4>Upload Your Image</h4>
                  <p>File should be Jpeg, Png,...</p>
                  <div {...getRootProps({className: 'dropzone image-card'})} >
                      <img src={ Illustraionimage} alt="illustration"/>
                      <input {...getInputProps()} />
                      <p>Drag and Drop your image here</p>
                  </div>
                  <p>or</p>
                  
            
            <input onChange={handleUpload} type="file" id="upload" hidden/>
            <label  htmlFor="upload">Choose file</label>
            </div>
        }else if(show==='step2'){
         return <Loader/>   
        }else if(show==="step3"){
            return <DisplayImage data={Data} />
        }

       }

    return (
        
        <div className="Drop-card">


<Option />




        </div>
    )
}

export default Fileupload
