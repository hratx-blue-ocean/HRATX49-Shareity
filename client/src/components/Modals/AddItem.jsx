import React, { useState } from 'react';

const AddItem = () => {

    const [modalView, setModalView] = useState({display: block});

    return (

        <div className={styles.modalWrapper} style={modalView}>
            Hello all
        </div>
    )
}

export default AddItem;