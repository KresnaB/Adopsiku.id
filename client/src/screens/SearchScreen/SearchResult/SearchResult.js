import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  ButtonGroup,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { listPetOffers } from "../../../store/actions/petOfferActions";
import useStyles from "./styles";
import { Skeleton, Alert } from "@material-ui/lab";
import PetOffer from "../../../component/PetOffer/PetOffer";
import petBreeds from "../../../component/PetOfferForm/breeds";
import petColors from "../../../component/PetOfferForm/colors";
import Filter from "../../../component/Filter/Filter";
import BodyFilter from "../../../component/Filter/BodyFilter";
import { getAllCities } from "../../../store/actions/provinceAction";
import { useHistory } from "react-router-dom";

const SearchResult = ({ category }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const petOfferList = useSelector((state) => state.petOfferList);
  const { loading, error, petOffers, pageCount, totalPage, totalOffer } =
    petOfferList;

  console.log(history);
  const [page, setPage] = useState(pageCount || 0);
  const [sort, setSort] = useState("newest");
  const [query, setQuery] = useState(
    `?page=${page}&category=${category}&time=${sort}`
  );
  const [checked, setChecked] = useState({
    breed: [],
    color: [],
    fur: [],
    chirp: [],
    crow: [],
    diameter: [],
    gender: [],
    size: [],
    source: [],
    city: [],
    age: [],
    spayedNeutered: false,
    vaccinated: false,
    trained: false,
  });

  const [breeds, setBreeds] = useState([]);
  const [colors, setColors] = useState([]);
  const cities = useSelector((state) => state.provinces.regencies);

  useEffect(() => {
    dispatch(listPetOffers(query, history));
    switch (category) {
      case "Cat": {
        setBreeds(petBreeds.cat_breeds);
        setColors(petColors.cat_colors);
        break;
      }
      case "Dog": {
        setBreeds(petBreeds.dog_breeds);
        setColors(petColors.dog_colors);
        break;
      }
      case "Rabbit": {
        setBreeds(petBreeds.rabbit_breeds);
        setColors(petColors.rabbit_colors);
        break;
      }
      case "Fury": {
        setBreeds(petBreeds.fury_breeds);
        setColors(petColors.fury_colors);
        break;
      }
      case "Bird": {
        setBreeds(petBreeds.bird_breeds);
        setColors(petColors.bird_colors);
        break;
      }
      case "Turtle": {
        setBreeds(petBreeds.turtle_breeds);
        setColors(petColors.turtle_colors);
        break;
      }
      case "Fish": {
        setBreeds(petBreeds.fish_breeds);
        setColors(petColors.fish_colors);
        break;
      }
      case "Chicken": {
        setBreeds(petBreeds.chicken_breeds);
        setColors(petColors.chicken_colors);
        break;
      }
      default:
        break;
    }
  }, [dispatch, query, category]);

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(getAllCities());
    }
  }, [dispatch, cities]);

  const applyFilter = () => {
    let newQuery;
    if (sort === "oldest" || sort === "newest") {
      newQuery = `?page=${page}&category=${category}&time=${sort}`;
    } else {
      newQuery = `?page=${page}&category=${category}&price=${sort}`;
    }

    let breed;
    checked.breed.map((check) => {
      breed = `&breeds[]=${check}`;
      newQuery = newQuery + breed;
    });
    let color;
    checked.color.map((check) => {
      color = `&colors[]=${check}`;
      newQuery = newQuery + color;
    });
    let fur;
    checked.fur.map((check) => {
      fur = `&furLength[]=${check}`;
      newQuery = newQuery + fur;
    });
    let gender;
    checked.gender.map((check) => {
      gender = `&gender[]=${check}`;
      newQuery = newQuery + gender;
    });
    let size;
    checked.size.map((check) => {
      size = `&size[]=${check}`;
      newQuery = newQuery + size;
    });
    let source;
    checked.source.map((check) => {
      source = `&source[]=${check}`;
      newQuery = newQuery + source;
    });
    let city;
    checked.city.map((check) => {
      city = `&cities[]=${check}`;
      newQuery = newQuery + city;
    });
    if (checked.spayedNeutered) {
      newQuery = newQuery + `&spayedNeutered=${checked.spayedNeutered}`;
    }
    if (checked.vaccinated) {
      newQuery = newQuery + `&vaccinated=${checked.vaccinated}`;
    }
    if (checked.trained) {
      newQuery = newQuery + `&trained=${checked.trained}`;
    }
    setQuery(newQuery);
  };

  useEffect(() => {
    applyFilter();
  }, [sort]);

  const handleChange = (change) => {
    setPage(page + change);
    applyFilter();
  };

  const handleSort = (event) => {
    setSort(event.target.value);
    applyFilter();
  };

  const handleChecked = (type, value, check) => () => {
    const currentIndex = check.indexOf(value);
    const newChecked = [...check];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    switch (type) {
      case "source": {
        setChecked({ ...checked, source: newChecked });
        break;
      }
      case "city": {
        setChecked({ ...checked, city: newChecked });
        break;
      }
      case "size": {
        setChecked({ ...checked, size: newChecked });
        break;
      }
      case "fur": {
        setChecked({ ...checked, fur: newChecked });
        break;
      }
      case "age": {
        setChecked({ ...checked, age: newChecked });
        break;
      }
      case "gender": {
        setChecked({ ...checked, gender: newChecked });
        break;
      }
      case "chirp": {
        setChecked({ ...checked, chirp: newChecked });
        break;
      }
      case "color": {
        setChecked({ ...checked, color: newChecked });
        break;
      }
      case "breed": {
        setChecked({ ...checked, breed: newChecked });
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      {loading ? (
        <div className={classes.content}>
          <Grid className={classes.container} container>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
              <Skeleton variant="rect" className={classes.mediaSkeleton} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Grid>
          </Grid>
        </div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div className={classes.content}>
          <Grid container>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Filter
                title="Keturunan"
                applyFilter={applyFilter}
                body={
                  <List className={classes.root} dense>
                    {breeds.map((breed) => (
                      <BodyFilter
                        item={breed}
                        handleChange={handleChecked(
                          "breed",
                          breed,
                          checked.breed
                        )}
                        checked={checked.breed.indexOf(breed) !== -1}
                      />
                    ))}
                  </List>
                }
              />
              {["Cat", "Dog", "Rabbit"].find((pet) => pet === category) ? (
                <>
                  <Filter
                    title="Kesehatan"
                    applyFilter={applyFilter}
                    body={
                      <List className={classes.root} dense>
                        <BodyFilter
                          item={"Sterilisasi"}
                          handleChange={(e) => {
                            setChecked({
                              ...checked,
                              spayedNeutered: e.target.checked,
                            });
                          }}
                          checked={checked.spayedNeutered}
                        />
                        <BodyFilter
                          item={"Vaksinasi"}
                          handleChange={(e) => {
                            setChecked({
                              ...checked,
                              vaccinated: e.target.checked,
                            });
                          }}
                          checked={checked.vaccinated}
                        />
                      </List>
                    }
                  />
                </>
              ) : null}
              <Filter
                title="Warna"
                applyFilter={applyFilter}
                body={
                  <List className={classes.root} dense>
                    {colors.map((color) => (
                      <BodyFilter
                        item={color}
                        handleChange={handleChecked(
                          "color",
                          color,
                          checked.color
                        )}
                        checked={checked.color.indexOf(color) !== -1}
                      />
                    ))}
                  </List>
                }
              />
              {["Cat", "Dog"].find((pet) => pet === category) ? (
                <>
                  <Filter
                    title="Panjang bulu"
                    applyFilter={applyFilter}
                    body={
                      <List className={classes.root} dense>
                        {["Pendek", "Sedang", "Panjang"].map((fur) => (
                          <BodyFilter
                            item={fur}
                            handleChange={handleChecked(
                              "fur",
                              fur,
                              checked.fur
                            )}
                            checked={checked.fur.indexOf(fur) !== -1}
                          />
                        ))}
                      </List>
                    }
                  />
                </>
              ) : null}
              {category === "Bird" ? (
                <Filter
                  title="Kicauan"
                  applyFilter={applyFilter}
                  body={
                    <List className={classes.root} dense>
                      {["Lemah", "Sedang", "Keras"].map((chirp) => (
                        <BodyFilter
                          item={chirp}
                          handleChange={handleChecked(
                            "chirp",
                            chirp,
                            checked.chirp
                          )}
                          checked={checked.chirp.indexOf(chirp) !== -1}
                        />
                      ))}
                    </List>
                  }
                />
              ) : null}
              {category === "Chicken" ? (
                <Filter
                  title="Kokokan"
                  applyFilter={applyFilter}
                  body={
                    <List className={classes.root} dense>
                      {["Lemah", "Sedang", "Keras"].map((crow) => (
                        <BodyFilter
                          item={crow}
                          handleChange={handleChecked(
                            "crow",
                            crow,
                            checked.crow
                          )}
                          checked={checked.crow.indexOf(crow) !== -1}
                        />
                      ))}
                    </List>
                  }
                />
              ) : null}
              <Filter
                title="Jenis Kelamin"
                applyFilter={applyFilter}
                body={
                  <List className={classes.root} dense>
                    {["Jantan", "Betina"].map((gender) => (
                      <BodyFilter
                        item={gender}
                        handleChange={handleChecked(
                          "gender",
                          gender,
                          checked.gender
                        )}
                        checked={checked.gender.indexOf(gender) !== -1}
                      />
                    ))}
                  </List>
                }
              />
              <Filter
                title="Umur"
                applyFilter={applyFilter}
                body={
                  <List className={classes.root} dense>
                    {["Baby", "Young", "Adult", "Senior"].map((age) => (
                      <BodyFilter
                        item={age}
                        handleChange={handleChecked("age", age, checked.age)}
                        checked={checked.age.indexOf(age) !== -1}
                      />
                    ))}
                  </List>
                }
              />
              {[
                "Cat",
                "Dog",
                "Rabbit",
                "Bird",
                "Chicken",
                "Fish",
                "Turtle",
              ].find((pet) => pet === category) ? (
                <>
                  <Filter
                    title="Ukuran"
                    applyFilter={applyFilter}
                    body={
                      <List className={classes.root} dense>
                        {["Kecil", "Sedang", "Besar"].map((size) => (
                          <BodyFilter
                            item={size}
                            handleChange={handleChecked(
                              "size",
                              size,
                              checked.size
                            )}
                            checked={checked.size.indexOf(size) !== -1}
                          />
                        ))}
                      </List>
                    }
                  />
                </>
              ) : null}
              {["Cat", "Dog", "Bird", "Fury"].find(
                (pet) => pet === category
              ) ? (
                <>
                  <Filter
                    title="Terlatih"
                    applyFilter={applyFilter}
                    body={
                      <List className={classes.root} dense>
                        <BodyFilter
                          item={"Terlatih"}
                          handleChange={(e) => {
                            setChecked({
                              ...checked,
                              trained: e.target.checked,
                            });
                          }}
                          checked={checked.trained}
                        />
                      </List>
                    }
                  />
                </>
              ) : null}
              {["Cat", "Dog", "Rabbit", "Bird", "Chicken"].find(
                (pet) => pet === category
              ) ? (
                <>
                  <Filter
                    title="Sumber"
                    applyFilter={applyFilter}
                    body={
                      <List className={classes.root} dense>
                        {["Rescue", "Peliharaan"].map((source) => (
                          <BodyFilter
                            item={source}
                            handleChange={handleChecked(
                              "source",
                              source,
                              checked.source
                            )}
                            checked={checked.source.indexOf(source) !== -1}
                          />
                        ))}
                      </List>
                    }
                  />
                </>
              ) : null}
              <Filter
                title="Lokasi"
                applyFilter={applyFilter}
                body={
                  <List className={classes.root} dense>
                    {cities.map((city) => (
                      <BodyFilter
                        item={city.name}
                        handleChange={handleChecked(
                          "city",
                          city.name,
                          checked.city
                        )}
                        checked={checked.city.indexOf(city.name) !== -1}
                      />
                    ))}
                  </List>
                }
              />
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={9}>
              <Grid container>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <Typography className={classes.title} variant="h6">
                    {totalOffer} hewan ditemukan
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} paddingRight="10px">
                  <FormControl
                    className={classes.field}
                    fullWidth
                    variant="outlined"
                    size="small"
                    required
                  >
                    <InputLabel>Urutkan </InputLabel>
                    <Select
                      label="Urutkan"
                      name="sort"
                      id="sort"
                      value={sort}
                      onChange={handleSort}
                    >
                      <MenuItem value="newest">Terbaru</MenuItem>
                      <MenuItem value="oldest">Terlama</MenuItem>
                      <MenuItem value="highest">Harga Tertinggi</MenuItem>
                      <MenuItem value="lowest">Harga Terendah</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {totalOffer !== 0 || totalOffer ? (
                <>
                  <Grid className={classes.container} container spacing={1}>
                    {petOffers.map((petOffer) =>
                      petOffer && petOffer.provider ? (
                        <Grid
                          key={petOffer._id}
                          item
                          xs={6}
                          sm={4}
                          md={3}
                          lg={3}
                          xl={3}
                        >
                          <PetOffer petOffer={petOffer} />
                        </Grid>
                      ) : null
                    )}
                  </Grid>
                  <ButtonGroup
                    className={classes.buttonGroup}
                    color="primary"
                    aria-label="outlined secondary button group"
                  >
                    {page !== 0 && (
                      <Button
                        className={classes.pageButton}
                        onClick={() => handleChange(-1)}
                      >
                        Previous
                      </Button>
                    )}
                    {page + 1 <= totalPage && (
                      <Button
                        className={classes.pageButton}
                        onClick={() => handleChange(0)}
                      >
                        {page + 1}
                      </Button>
                    )}
                    {page + 2 <= totalPage && (
                      <Button
                        className={classes.pageButton}
                        onClick={() => handleChange(1)}
                      >
                        {page + 2}
                      </Button>
                    )}
                    {page + 3 <= totalPage && (
                      <Button
                        className={classes.pageButton}
                        onClick={() => handleChange(2)}
                      >
                        {page + 3}
                      </Button>
                    )}
                    {page + 4 <= totalPage && (
                      <Button
                        className={classes.pageButton}
                        onClick={() => handleChange(3)}
                      >
                        {page + 4}
                      </Button>
                    )}
                    {page !== totalPage - 1 && (
                      <Button
                        className={classes.pageButton}
                        onClick={() => handleChange(1)}
                      >
                        Next
                      </Button>
                    )}
                  </ButtonGroup>
                </>
              ) : null}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default SearchResult;
