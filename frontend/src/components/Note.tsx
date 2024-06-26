/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "../styles/Note.module.css"
import stylesUtils from "../styles/utils.module.css"
import { Card, CardFooter } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import {MdDelete} from "react-icons/md";

interface NoteProps{
    note: NoteModel,
    onNoteClicked:(note: NoteModel) => void,
    onDeleteNote:(note: NoteModel) => void,
    className?:string,
   
}

const Note = ({note,onNoteClicked,onDeleteNote,className}:NoteProps)=>{
        const {
        title,
        text,
        createdAt,
        updatedAt,
        }= note;


    let createdUpdatedText: string;
    if(updatedAt > createdAt){
      createdUpdatedText = "Updated:" + formatDate(updatedAt);
    }else{
      createdUpdatedText = "Created At:" + formatDate(createdAt);
    }


  return(
    <Card className= {`${styles.noteCard} ${className}`}
    onClick={()=> onNoteClicked(note)}
    >
        <Card.Body className={styles.cardBody}>
            <Card.Title className={stylesUtils.flexCenter}>
                {title}
            <MdDelete
            className="text-muted ms-auto"
            onClick={(e)=>{
            onDeleteNote(note);
            e.stopPropagation();
            }}
            />
            </Card.Title>
            <Card.Text className= {styles.cardText}>
                {text}
                
            </Card.Text>
        </Card.Body>
        <CardFooter className="text-muted">
          {createdUpdatedText}
        </CardFooter>
    </Card>
  )
}

export default Note;