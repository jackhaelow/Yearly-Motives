import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps{
    name:string,
    label:string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    errors?:FieldError,
    [x: string]:any,
}

const TextInputField = ({name,label,register,registerOptions,error,...props}:TextInputFieldProps) => {

    return ( 
       <Form.Group className="mb-3" controlId={name + "-input"}>
           <Form.Label>{label}</Form.Label>
           <Form.Control
          {...props}
          {...register(name,registerOptions)}
          isInvalid={!!error}
           />
           <Form.Control.Feedback type="invalid">
                 {error?.title?.message}
                </Form.Control.Feedback>
       </Form.Group>
     );
}
 
export default TextInputField;