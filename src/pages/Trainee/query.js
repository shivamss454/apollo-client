import { gql } from 'apollo-boost';

const GET_TRAINEE = gql `
query getTrainee($skip: Int, $limit: Int) {
    getTrainee(data: {skip: $skip, limit: $limit}){
        records{
            _id
            name
            email
            role
            originalId
            createdAt
        },
        count
    }
}
`;
export default GET_TRAINEE;