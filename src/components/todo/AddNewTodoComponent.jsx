import { useNavigate} from "react-router-dom"
import {  AddTodoApi} from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { Formik, Form, Field, ErrorMessage } from 'formik' 


export default function AddNewTodoComponent(){



    const authContext =useAuth()

    const userid = authContext.userid

    const navigate = useNavigate()



    function onSubmit(values){
        console.log(values)
        const taskData ={
            taskname: values.description
        }

        AddTodoApi(userid,taskData)
        .then(respose =>{
            navigate('/todos')
        })
        .catch(error => console.log(error))
        
    }

    function validate(values){
        console.log(values)
        let errors ={}
        if(values.description.length<5){
            errors.description ='Enter Atleast 5 Characters'
        }
        return errors
    }
    return (
        <div className="container">
            <h1>Enter New Task Details</h1>
            <div>
                <Formik 
                  initialValues={{ description: '' }}
                  enableReinitialize={true}
                  onSubmit={onSubmit}
                  validate={validate}
                  validateOnChange={false}
                  validateOnBlur={false}
                >
                    {
                        (props) =>
                        (
                            <Form>
                                <ErrorMessage

                                 name="description"
                                 component="div"
                                 className="alert alert-warning"
                                
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                        <Field type ="text" className="form-control" name="description"/>
                                </fieldset>

                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>

                            </Form>
                        )
                    }

                </Formik>
            </div>
        </div>
    )
}