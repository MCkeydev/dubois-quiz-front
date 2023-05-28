import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { StudentCopy } from '../../model/api';
import GradedCopiesListing from '../../components/GradedCopiesListing/GradedCopiesListing'; // Assuming the API response type for student copies is defined as StudentCopy

const StudentCopies: React.FC = () => {
    const [studentCopies, setStudentCopies] =
        useState<Array<StudentCopy> | null>(null);

    useEffect(() => {
        const fetchStudentCopies = async () => {
            try {
                const response = await axios.get<Array<StudentCopy>>(
                    `${import.meta.env.VITE_API_BASE_URL}/studentCopies/graded`,
                    {
                        withCredentials: true,
                    },
                );
                setStudentCopies(response.data);
            } catch (error) {
                console.log('Error fetching student copies:', error);
                setStudentCopies(null);
            }
        };

        fetchStudentCopies();
    }, []);

    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            direction='column'
            gap='1rem'
        >
            <GradedCopiesListing
                studentCopies={studentCopies}
                title='Vos copies corrigées'
                fallbackMessage="Vous n'avez pas de copies corrigées"
            />
        </Flex>
    );
};

export default StudentCopies;
