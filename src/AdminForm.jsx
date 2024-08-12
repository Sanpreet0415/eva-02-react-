import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  averageBudget: Yup.number().required('Required').positive().integer(),
  highDemandOptions: Yup.string().when('highDemand', {
    is: true,
    then: Yup.string().required('This field is required'),
    otherwise: Yup.string()
  })
});

function AdminForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        averageBudget: '',
        highDemand: false,
        highDemandOptions: ''
      }}
      validationSchema={validationSchema}
      
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Field name="name" placeholder="Destination Name" />
          <ErrorMessage name="name" component="div" />
          
          <Field name="description" placeholder="Description" />
          <ErrorMessage name="description" component="div" />
          
          <Field type="number" name="averageBudget" placeholder="Average Budget" />
          <ErrorMessage name="averageBudget" component="div" />

          <Field type="checkbox" name="highDemand" />
          <label htmlFor="highDemand">High Demand</label>
          
          {values.highDemand && (
            <Field name="highDemandOptions" placeholder="High Demand Options" />
          )}
          <ErrorMessage name="highDemandOptions" component="div" />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default AdminForm;
