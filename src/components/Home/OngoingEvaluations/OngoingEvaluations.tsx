import React from 'react';
import {
    Badge,
    Divider,
    Flex,
    HStack,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Evaluation } from '../../../model/api';
import { BsChevronRight } from 'react-icons/all';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

dayjs.extend(isBetween);

interface IIncomingQuizzesProps {
    onGoingEvaluations: Array<Evaluation> | null;
}

const OngoingEvaluations: React.FC<IIncomingQuizzesProps> = (props) => {
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
                Vos évaluations en cours
            </Text>
            {null === props.onGoingEvaluations ? (
                <Spinner
                    alignSelf='center'
                    size='xl'
                    justifySelf='center'
                />
            ) : props.onGoingEvaluations.length === 0 ? (
                <Text>
                    Vous n&apos;avez pas d&apos;évaluations en cours ou a venir
                </Text>
            ) : (
                <Flex
                    direction='column'
                    rowGap='1rem'
                    maxHeight='500px'
                    overflowY='scroll'
                >
                    {props.onGoingEvaluations
                        .sort((a, b) => (a.startsAt < b.startsAt ? 1 : 0))
                        .map((evaluation, index) => {
                            const isEvaluationPending = dayjs().isBetween(
                                evaluation.startsAt,
                                evaluation.endsAt,
                            );

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
                                        navigate(
                                            `/evaluation/${evaluation.id}/participate`,
                                        )
                                    }
                                >
                                    <Badge
                                        colorScheme={
                                            isEvaluationPending
                                                ? 'red'
                                                : 'green'
                                        }
                                    >
                                        {isEvaluationPending
                                            ? 'En cours'
                                            : 'À venir'}
                                    </Badge>
                                    <VStack
                                        whiteSpace='nowrap'
                                        color='gray.400'
                                        lineHeight='1'
                                    >
                                        <Text>
                                            {`Du ${dayjs(
                                                evaluation.startsAt,
                                            ).format('DD MMM YYYY')}`}
                                        </Text>
                                        <Text>
                                            {`au ${dayjs(
                                                evaluation.endsAt,
                                            ).format('DD MMM YYYY')}`}
                                        </Text>
                                    </VStack>
                                    <Text noOfLines={1}>
                                        {evaluation.quiz.title}
                                    </Text>
                                    <Divider
                                        orientation='vertical'
                                        h='30px'
                                    />
                                    <Text
                                        fontWeight='medium'
                                        color='gray.600'
                                    >
                                        Formation
                                    </Text>
                                    <VStack>
                                        <Text noOfLines={1}>
                                            {evaluation?.formation?.name ?? ''}
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

export default OngoingEvaluations;
