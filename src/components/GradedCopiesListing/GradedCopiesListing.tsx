import React from 'react';
import { Divider, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { BsChevronRight } from 'react-icons/all';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { StudentCopy } from '../../model/api';

dayjs.extend(isBetween);

interface IStudentCopiesListingProps {
    studentCopies: Array<StudentCopy> | null;
    title: string;
    fallbackMessage: string;
}

const GradedCopiesListing: React.FC<IStudentCopiesListingProps> = (props) => {
    // Use of react-router hook
    const navigate = useNavigate();

    return (
        <Flex
            direction='column'
            borderRadius='1rem'
            w='100%'
            paddingX='2rem'
            paddingY='3rem'
            gap='1rem'
            bg='white'
            boxShadow='md'
        >
            <Text
                fontWeight='medium'
                fontSize='xl'
            >
                {props.title}
            </Text>
            {null === props.studentCopies ? (
                <Spinner
                    alignSelf='center'
                    size='xl'
                    justifySelf='center'
                />
            ) : props.studentCopies.length === 0 ? (
                <Text>{props.fallbackMessage}</Text>
            ) : (
                <Flex
                    direction='column'
                    rowGap='1rem'
                    maxHeight='500px'
                    overflowY='scroll'
                >
                    {props.studentCopies.map((studentCopy, index) => {
                        const formattedDate = dayjs(
                            studentCopy.createdAt,
                        ).format('DD MMM YYYY');

                        return (
                            <HStack
                                key={index}
                                border='1px solid'
                                borderColor='gray.200'
                                paddingX='3'
                                paddingY='4'
                                borderRadius='lg'
                                cursor='pointer'
                                transition='all .15s ease_in_out'
                                columnGap='2rem'
                                _hover={{
                                    backgroundColor: 'gray.50',
                                }}
                                onClick={() =>
                                    navigate(`/copies/${studentCopy.id}`)
                                }
                            >
                                <VStack
                                    whiteSpace='nowrap'
                                    color='gray.400'
                                    lineHeight='1'
                                >
                                    <Text>{formattedDate}</Text>
                                </VStack>
                                <Text fontWeight='bold'>
                                    {studentCopy.evaluation.quiz.title}
                                </Text>
                                <Text
                                    fontWeight='bold'
                                    fontSize='xl'
                                >
                                    Note: {studentCopy.score} /
                                    {studentCopy.evaluation.quiz.maxScore}
                                </Text>
                                <Divider
                                    orientation='vertical'
                                    h='30px'
                                />
                                <Text
                                    fontWeight='medium'
                                    color='gray.600'
                                >
                                    Commentaire
                                </Text>
                                <VStack>
                                    <Text noOfLines={1}>
                                        {studentCopy.commentary}
                                    </Text>
                                </VStack>
                                <BsChevronRight />
                            </HStack>
                        );
                    })}
                </Flex>
            )}
        </Flex>
    );
};

export default GradedCopiesListing;
