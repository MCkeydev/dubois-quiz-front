import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import axios from 'axios';
import { Evaluation, EvaluationObject, Formation } from '../../model/api';
import LastCopyPreview from '../../components/Student/LastCopyPreview/LastCopyPreview';
import FormationListing from '../../components/Home/FormationListing/FormationListing';
import IncomingEvaluations from '../../components/Home/IncomingEvaluations/IncomingEvaluations';

const Student: React.FC = () => {
    // Use of react hook
    const [lastCopyData, setLastCopyData] =
        React.useState<EvaluationObject | null>(null);
    const [homeData, setHomeData] = React.useState<Array<Formation> | null>(
        null,
    );
    const [incomingEvaluationsData, setincomingEvaluationsData] =
        React.useState<Array<Array<Evaluation>> | null>(null);

    // Use of redux hook
    const user = useAppSelector((state) => state.user);

    // UseEffect on first render
    React.useEffect(() => {
        // Prevents the API call if not authenticated
        if (null === user) return;

        // Fetches last graded copy of the current student
        const fetchLastCopy = async () => {
            const response = await axios.get<EvaluationObject>(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/evaluation/studentCopy/preview/last`,
                {
                    withCredentials: true,
                },
            );

            setLastCopyData(response.data);
        };

        fetchLastCopy();
    }, []);

    React.useEffect(() => {
        if (null === user) return;

        const fetchHomeData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/home`,
                {
                    withCredentials: true,
                },
            );
            setHomeData(response.data);
        };

        fetchHomeData();
    }, []);

    React.useEffect(() => {
        const fetchIncomingQuizzes = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/evaluations/incoming`,
                {
                    withCredentials: true,
                },
            );

            setincomingEvaluationsData(response.data);
        };

        fetchIncomingQuizzes();
    }, []);

    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            direction='column'
            gap='1rem'
        >
            <LastCopyPreview studentPreviewData={lastCopyData} />
            <IncomingEvaluations
                incomingEvaluations={incomingEvaluationsData}
            />
            <FormationListing
                role='student'
                formations={homeData}
            />
        </Flex>
    );
};

export default Student;
