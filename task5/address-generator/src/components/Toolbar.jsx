import Stack from "@mui/material/Stack";
import Errors from "./Errors";
import RegionSelect from "./Region";
import Seed from "./Seed";

export default function Toolbar({ children, availableLocales }) {
    return (
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <RegionSelect locales={availableLocales} />
            <Errors />
            <Seed />
            {children}
        </Stack>
    );
}
