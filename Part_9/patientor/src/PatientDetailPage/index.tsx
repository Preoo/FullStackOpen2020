import React from "react";
import axios from "axios";
import { Container, Table, Item, Button } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

import { useStateValue, updatePatient } from "../state";
import { useParams, useHistory } from "react-router-dom";
import PatientEntryDetail from "../PatientEntryDetail";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from '../AddEntryModal';



const PatientDetailPage: React.FC = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    
    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };


    const patient = patients[id];

    const handleEntrySubmit = async (values: EntryFormValues) => {
        console.info('handleSumbit');
        console.info(values);
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(updatePatient(updatedPatient));
            setError(undefined);
        } catch (e) {
            console.error(e.response);
            setError(e.response.data.error);
        }
    };

    React.useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const { data: fullPatient } = await axios
                    .get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(updatePatient(fullPatient));
            } catch (e) {
                console.error(e);
            }
        };
        if (patient && !patient.entries) {
            fetchPatientDetails();
        }
    });

    // If patient is missing or undefined, bail out
    if (!patient) {
        history.push('/');
        return null;
    }

    return (
        <div className="App">
            <Container textAlign="center">
                <h3>Patient Page</h3>
            </Container>
            <h5>Basic information</h5>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>SSN</Table.HeaderCell>
                        <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>Occupation</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{patient.name}</Table.Cell>
                        <Table.Cell>{patient?.ssn}</Table.Cell>
                        <Table.Cell>{patient?.dateOfBirth}</Table.Cell>
                        <Table.Cell>{patient.gender}</Table.Cell>
                        <Table.Cell>{patient.occupation}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={handleEntrySubmit}
                error={error}
                onClose={closeModal}
            />
            <h5>Entries <Button onClick={() => openModal()}>Add New Entry</Button></h5>
            <Item.Group divided>
                {patient.entries && patient.entries.map(entry => (
                    <PatientEntryDetail
                        key={entry.id}
                        entry={entry}
                        diagnoses={entry.diagnosisCodes?.map(code => diagnoses[code])}
                    />
                ))}
            </Item.Group>
        </div>
    );
};

export default PatientDetailPage;