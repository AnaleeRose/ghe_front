import React, { useState, useEffect } from 'react';

export function IsLoggedIn(props) {
    const [isLoggedIn] = useState(false);
    const [setIsLoggedIn] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsLoggedIn(status.isLoggedIn);
        }
    })

    return isLoggedIn;
}