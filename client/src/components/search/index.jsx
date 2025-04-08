import { SearchBoxContainer, SearchField } from "../../styles/search";
import { useUIContext } from "../context/ui";
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function SearchBox() {
    const {showSearchBox, setShowSearchBox} = useUIContext();

    return (
        <Slide direction="down" in={showSearchBox} timeout={500}>
            <SearchBoxContainer>
                <SearchField 
                color="secondary"
                variant="standard"
                fullWidth
                placeholder="Search Products" />
                <IconButton>
                    <SearchIcon
                        sx={{
                            fontSize: { xs: '2rem', md: '3rem' },
                        }}
                        color="secondary"/>
                </IconButton>
                <IconButton
                    onClick={() => setShowSearchBox(false)}
                    sx= {{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    <CloseIcon sx={{fontSize: '4rem'}} color="secondary" />
                </IconButton>
            </SearchBoxContainer>
        </Slide>
    )
}