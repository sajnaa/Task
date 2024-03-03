import { useRef, useState, useEffect } from "react";
import {EditorState} from 'draft-js'
import {Editor}  from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
function TaskTwo(){
    const[editorState,setEditorState]=useState(EditorState.createEmpty())
        const onEditorStateChange=(editorState)=>{
        setEditorState(editorState)
    }
return(
<>
<Editor>
editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={onEditorStateChange}
</Editor>

</>
)
}
 export default TaskTwo
