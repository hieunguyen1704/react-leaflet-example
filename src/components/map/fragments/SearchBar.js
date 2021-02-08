import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { searchOnMap } from "../../../utils/mapSearch";
import useDebounce from "../../../utils/useDebounce";
import styles from "./SearchBar.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "0.5px solid #ccc",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function SearchBar(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue) {
      onSearch();
    } else {
      setSearchResult([]);
    }
  }, [debouncedSearchValue]);
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    onSearch();
  };
  const onSearch = async () => {
    try {
      const result = await searchOnMap(searchValue);
      if (result) {
        setSearchResult(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.searchContainer}>
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Tìm kiếm trên bản đồ"
          inputProps={{ "aria-label": "search google maps" }}
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {searchResult && searchResult.length > 0 && (
        <div className={styles.searchResult}>
          <div className={styles.searchItemContainer}>
            {searchResult.map((item) => (
              <div
                className={styles.searchItem}
                key={item.id}
                onClick={() => {
                  // console.log(item.position);
                  props.handleSearchResult(item);
                  setSearchResult([]);
                }}
              >
                {item.address.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default SearchBar;
