import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import axios from 'axios';
import { Evaluation, EvaluationObject, Formation } from '../../model/api';
import LastCopyPreview from '../../components/Student/LastCopyPreview/LastCopyPreview';
import FormationListing from '../../components/Home/FormationListing/FormationListing';
import EvaluationsListing from '../../components/Home/EvaluationsListing/EvaluationsListing';

interface IHomeData {
    formations: Array<Formation>;
    onGoing: Array<Evaluation>;
    incoming: Array<Evaluation>;
}

const Student: React.FC = () => {
    // Use of react hook
    const [lastCopyData, setLastCopyData] =
        React.useState<EvaluationObject | null>(null);
    const [homeData, setHomeData] = React.useState<IHomeData | null>(null);

    // Use of redux hook
    const user = useAppSelector((state) => state.user);

    // UseEffect on first render
    React.useEffect(() => {
        // Prevents the API call if not authenticated
        if (null === user) return;

        // Fetches last graded copy of the current student
        const fetchLastCopy = async () => {
            try {
                const response = await axios.get<EvaluationObject>(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/evaluation/studentCopy/preview/last`,
                    {
                        withCredentials: true,
                    },
                );

                setLastCopyData(response.data);
            } catch (exception) {
                setLastCopyData(null);
            }
        };

        fetchLastCopy();
    }, []);

    React.useEffect(() => {
        if (null === user) return;

        const fetchHomeData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/home`,
                    {
                        withCredentials: true,
                    },
                );
                setHomeData(response.data);
            } catch (exception) {
                setHomeData(null);
            }
        };

        fetchHomeData();
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
            <EvaluationsListing
                evaluations={homeData?.onGoing ?? null}
                title='Vos évaluations en cours'
                fallbackMessage={"Vous n'avez pas d'évaluation en cours"}
            />
            <EvaluationsListing
                evaluations={homeData?.incoming ?? null}
                title='Vos évaluations à venir'
                fallbackMessage={"Vous n'avez aucune évaluation de prévu"}
            />
            <FormationListing
                role='student'
                formations={homeData?.formations ?? null}
            />
        </Flex>
    );
};

export default Student;
