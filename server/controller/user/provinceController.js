import Province from '../../model/user/indonesiaProvince.js';

export const getProvince = async (req, res) => {
    try {
      const provinces = await Province.find({});
      res.send({ provinces })
    } catch(err) {
      res.status(400).send({ error: err });
    }
  };
