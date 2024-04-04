import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api"
import TextInputField from "./form/TextInputField";


interface AddEditNoteDialogProps{
    noteToEdit?:Note,
    onDismiss: () => void,
    onNoteSaved:(note: Note)=>void,
}

const  AddEditNoteDialog = ({onDismiss,noteToEdit,onNoteSaved}: AddEditNoteDialogProps) => {

const { register,handleSubmit,formState : {errors,isSubmitting}}= useForm<NoteInput>({
    defaultValues:{
        title: noteToEdit?.title || "",
        text: noteToEdit?.text || "",
    }
});

async function onSubmit(input:NoteInput) {
    try {
      let noteResponse: Note;
      if(noteToEdit){
        noteResponse = await NotesApi.updateNote(noteToEdit._id,input);
      }else{
        noteResponse = await NotesApi.createNote(input);
      }
       onNoteSaved(noteResponse);
    } catch (error) {
        console.error(error);
        alert(error);
    }
    
}
    
    return ( 
        <Modal show onHide={onDismiss}>
        <ModalHeader closeButton>
                    <ModalTitle>
                       {noteToEdit ? "Edit Motivation": "Add Motivation"}
                    </ModalTitle>
        </ModalHeader>
               <ModalBody>
               <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                name="title"
                label="Title"
                type="text"
                placeholder = "Add title here.."
                register={register}
                registerOptions={{ required: "Required"}}
                error={errors.title}
                />
                <TextInputField
                name="text"
                label="Text"
                as="textarea"
                row={5}
                placeholder= "Add text here.."
                register={register}
                />

             
             
               </Form>

                  
               </ModalBody>
               <ModalFooter>
                <Button
                type="submit"
                form ="addEditNoteForm"
                disabled={isSubmitting}
                >
                 save

                </Button>
               </ModalFooter>
        </Modal>
     );
}
 
export default AddEditNoteDialog;