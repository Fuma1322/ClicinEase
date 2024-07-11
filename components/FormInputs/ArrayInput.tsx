import React from 'react';
import { Formik, Field, FieldArray, Form } from 'formik';

function ArrayItemsInput() {
  return (
    <Formik
      initialValues={{ items: [''] }}
      onSubmit={values => console.log(values)}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="items">
            {({ insert, remove, push }) => (
              <div>
                {values.items.length > 0 &&
                  values.items.map((item, index) => (
                    <div key={index}>
                      <Field name={`items.${index}`} as="textarea" />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => push('')}
                >
                  Add Item
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default ArrayItemsInput;
