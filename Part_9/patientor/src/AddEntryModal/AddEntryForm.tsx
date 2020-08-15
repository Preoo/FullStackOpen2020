import React from 'react';
import { Entry, EntryType, OccupationalHealthcareEntry } from '../types';
import { Formik, Field, Form, FormikErrors } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import {
    TextField, SelectField, NumberField, DiagnosisSelection, EntryTypeOptions
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const entryTypeOptions: EntryTypeOptions[] = [
    {value: EntryType.HealthCheck, label: 'HealthCheck'},
    {value: EntryType.Hospital, label: 'Hospital'},
    {value: EntryType.Occupational, label: 'OccupationalHealthcare'}
];

const validate = (values: EntryFormValues): FormikErrors<EntryFormValues> => {
    const requiredError = 'Field is required';
    const invalidDateError = 'Invalid date';
    const errors: { [field: string]: string } = {};

    if (!Date.parse(values.date)) errors.date = invalidDateError;
    if (!values.description) errors.description = requiredError;
    if (!values.specialist) errors.specialist = requiredError;

    switch(values.type) {
        case "Hospital":
            break;
        case "HealthCheck":
            break;
        case "OccupationalHealthcare":
            if (!(values as OccupationalHealthcareEntry).employerName) {
                errors.employerName = requiredError;
            }
            break;
        default: break;
    }

    return errors;
};

// How is this less elegant that just writing a separate form for each type :/
export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: EntryType.HealthCheck,
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: undefined,
                healthCheckRating: 0,
                employerName: '',
                sickLeave: {
                    startDate: '',
                    endDate: ''
                },
                discharge: {
                    date: '',
                    criteria: ''
                }
            }}
            onSubmit={onSubmit}
            validate={validate}
        >
            {({ values, isValid, setFieldTouched, setFieldValue }) => {
                return (
                    <Form className='form ui'>
                        <SelectField
                            label='Type'
                            name='type'
                            options={entryTypeOptions}
                        />
                        <Field
                            label='Description'
                            placeholder=''
                            name='description'
                            component={TextField}
                        />
                        <Field
                            label='Date'
                            placeholder='YYYY-MM-DD'
                            name='date'
                            component={TextField}
                        />
                        <Field
                            label='MD'
                            placeholder=''
                            name='specialist'
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                        />
                        {values.type === EntryType.HealthCheck && <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />}
                        {values.type === EntryType.Occupational && <Field
                            label='Employer'
                            name='employerName'
                            component={TextField}
                            placeholder='patients employer'
                        />}
                        {values.type === EntryType.Occupational && <Field
                            label='Sick leave start'
                            name='sickLeave.startDate'
                            component={TextField}
                            placeholder='YYYY-MM-DD'
                        />}
                        {values.type === EntryType.Occupational && <Field
                            label='Sick leave end'
                            name='sickLeave.endDate'
                            component={TextField}
                            placeholder='YYYY-MM-DD'
                        />}
                        {values.type === EntryType.Hospital && <Field
                            label='Discharge date'
                            name='discharge.date'
                            component={TextField}
                            placeholder='YYYY-MM-DD'
                        />}
                        {values.type === EntryType.Hospital && <Field
                            label='Discharge criteria'
                            name='discharge.criteria'
                            component={TextField}
                            placeholder=''
                        />}
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                        </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!isValid}
                                >
                                    Add
                        </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;