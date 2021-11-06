import React, { FC } from "react";
import { useParams } from "react-router-dom";

const NewHome: FC = () => {
    const params = useParams();
    return (
        <div>
            NewHome { JSON.stringify(params) }
        </div>
    );
};

export default NewHome;