import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation createTrainee ($name: String!, $email: String!, $password: String! ) {
    createTrainee(payload: { name: $name, email: $email, password: $password })
}
`;

const UPDATE_TRAINEE = gql`
mutation updateTrainee ($name: String!, $email: String!, $id: ID!) {
    createTrainee(payload: { name: $name, email: $email, password: $password, id: $id })
}
`;

const DELETE_TRAINEE = gql`
mutation deleteTrainee ($id: ID!) {
    deleteTrainee(id: $id)
}
`;
export { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE};