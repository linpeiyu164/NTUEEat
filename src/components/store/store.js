import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import { IconButton } from '@material-ui/core';

import BasicInfo from './BasicInfo';
import Review from './Review';

const useStyles = makeStyles(theme => ({
    list: {

    },

    listItem: {

    },

    gridList: {

    }
}));





function Store(props) {
    return(
        <>
            <BasicInfo />
            <Review />
        </>
    )
}

export default Store;