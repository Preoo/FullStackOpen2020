import { assertNever } from '../constants';
import React from 'react';
import {
    Entry, Diagnosis, OccupationalHealthcareEntry,
    HealthCheckEntry, HospitalEntry
} from '../types';
import { Item, Icon } from 'semantic-ui-react';

interface EntryDetailProps { entry: Entry; diagnoses?: Diagnosis[] }
interface HospitalProps { entry: HospitalEntry; diagnoses?: Diagnosis[] }
const HospitalEntryItem: React.FC<HospitalProps> = ({ entry, diagnoses }) => (
    <Item>
        <Item.Content>
            <Item.Header>
                <Icon name='hospital symbol'/> {entry.date}
            </Item.Header>
            <Item.Meta>
                <p>Specialist: {entry.specialist}</p>
                <p>Discharge: {entry.discharge?.date}  {entry.discharge?.criteria}</p> 
            </Item.Meta>
            <Item.Description>
                {entry.description}
            </Item.Description>
            <Item.Extra>
                {diagnoses?.map(diagnosis => 
                    <span>
                        [ {diagnosis.code} ] - {diagnosis.name}
                    </span>
                )}
            </Item.Extra>
        </Item.Content>
    </Item>
);

interface OccupationalProps { entry: OccupationalHealthcareEntry; diagnoses?: Diagnosis[] }
const OccupationalEntryItem: React.FC<OccupationalProps> = ({ entry, diagnoses }) => (
    <Item>
        <Item.Content>
            <Item.Header>
                <Icon name='doctor'/> {entry.date}
            </Item.Header>
            <Item.Meta>
                <p>Specialist: {entry.specialist}</p>
                <p>Employer: {entry.employerName}</p>
                <p>Sick leave: {
                    entry.sickLeave
                    ? `${entry.sickLeave.startDate} -> ${entry.sickLeave.endDate}`
                    : 'fit for duty'
                    }
                </p>
            </Item.Meta>
            <Item.Description>
                {entry.description}
            </Item.Description>
            <Item.Extra>
                {diagnoses?.map(diagnosis => 
                    <p>
                        [ {diagnosis.code} ] - {diagnosis.name}
                    </p>
                )}
            </Item.Extra>
        </Item.Content>
    </Item>
);

interface HealthCheckProps { entry: HealthCheckEntry; diagnoses?: Diagnosis[] }
const HealthCheckEntryItem: React.FC<HealthCheckProps> = ({ entry, diagnoses }) => (
    <Item>
        <Item.Content>
            <Item.Header>
                <Icon name='stethoscope'/> {entry.date}
            </Item.Header>
            <Item.Meta>
                <p>Specialist: {entry.specialist}</p>
                <span>
                    <Icon name='heart' color='green' disabled={entry.healthCheckRating >= 3}/>
                    <Icon name='heart' color='green' disabled={entry.healthCheckRating >= 2}/>
                    <Icon name='heart' color='green' disabled={entry.healthCheckRating >= 1}/>
                    <Icon name='heart' color='green' disabled={entry.healthCheckRating >= 0}/>
                </span>
            </Item.Meta>
            <Item.Description>
                {entry.description}
            </Item.Description>
            <Item.Extra>
                {diagnoses?.map(diagnosis => 
                    <p>
                        [ {diagnosis.code} ] - {diagnosis.name}
                    </p>
                )}
            </Item.Extra>
        </Item.Content>
    </Item>
);

const PatientEntryDetail: React.FC<EntryDetailProps> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryItem entry={entry} diagnoses={diagnoses} />;
        case 'OccupationalHealthcare':
            return <OccupationalEntryItem entry={entry} diagnoses={diagnoses} />;
        case 'HealthCheck':
            return <HealthCheckEntryItem entry={entry} diagnoses={diagnoses} />;
        default: return assertNever(entry);
    }
};

export default PatientEntryDetail;