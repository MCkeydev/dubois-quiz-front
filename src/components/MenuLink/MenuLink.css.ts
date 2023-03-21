const styles = {
    displayLink: {
        transition: 'all 0.15s ease-in-out',
        '&.active': {
            color: 'teal.600',
            bg: 'teal.50',
            fontWeight: 'semibold',
            '&:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                bg: 'teal.300',
            },
        },
    },
    displayLinkHover: {
        bg: 'teal.50',
        color: 'teal.600',
        '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            bg: 'teal.300',
        },
    },
    nestedLink: {
        transition: 'all 0.15s ease-in-out',
        '&.active': {
            color: 'teal.600',
            fontWeight: 'semibold',
        },
    },
    nestedLinkHover: {
        color: 'teal.400',
    },
};

export default styles;
