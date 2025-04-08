import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { AppbarContainer, AppbarHeader, HomeBarText, MyList } from "../../styles/appbar";
import SearchIcon from "@mui/icons-material/Search"
import Actions from "./actions";
import { useUIContext } from "../context/ui";
import { Colors } from "../../styles/theme";

export default function AppbarDesktop({ matches }) {

    const { setShowSearchBox, setContactUs } = useUIContext();

    return (
        <AppbarContainer>
            <AppbarHeader>My  Bags</AppbarHeader>
            <MyList type="row">
                <HomeBarText variant="h6">Home</HomeBarText>
                <HomeBarText variant="h6">Categories</HomeBarText>
                <HomeBarText variant="h6">Products</HomeBarText>
                <HomeBarText variant="h6" onClick={() => setContactUs(true)}>Contact Us</HomeBarText>
                <ListItemButton onClick={() => setShowSearchBox(true)}>
                    <ListItemIcon >
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>
            <Actions matches={matches} />
        </AppbarContainer>
    )
}