import { useRef } from "react";
import { CSVLink } from "react-csv";
import Button from '@mui/material/Button';

export default function Export({ data, headers }) {
    const csvLink = useRef()
    return (
        <>
            <CSVLink
                data={data}
                headers={headers}
                filename="data.csv"
                className="hidden"
                target="_blank"
                ref={csvLink}
            />
            <Button variant="outlined" size="large" onClick={() => csvLink.current.link.click()}>Export</Button>
        </>
    )
}