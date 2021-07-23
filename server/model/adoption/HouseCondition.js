const HouseCondition = {
  houseType: { type: String, required: true },
  houseSize: { type: String, required: true },
  housePhotos: { type: [String], required: true },
  outdoors: { type: [String] },
};

export default HouseCondition;
