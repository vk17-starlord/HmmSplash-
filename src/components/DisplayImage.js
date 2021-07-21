import React ,{useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
function DisplayImage({data}) {

    let URL=data.data;
   let ShortURL=URL.substr(0,20).concat('...')
    

   const [Copied, setCopied] = useState(true)
    

    return (
        <div className='i-card'>
         
        <h1><i class='bx bxs-check-circle'></i></h1>
        <h4>Uploaded Successfully!</h4>

<img src={data.data} alt="uploadedimage"/>        
        <div className="link">
            <div><p>{ShortURL} </p></div>
            <div>
            <CopyToClipboard text={URL} 
             onCopy={() => setCopied(!Copied)}>
             
          <button>{Copied ? 'Copy Link':(<span>
            Copied <i class='bx bx-check'></i>
          </span>)}</button>
        </CopyToClipboard>
             
            </div>

        </div>
        </div>
    )
}

export default DisplayImage
