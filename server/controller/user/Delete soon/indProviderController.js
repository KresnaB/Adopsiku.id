import IndProviders from '../../model/user/indProviderModel.js';
import Users from '../../model/user/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  validateRegisterInput  from './validation/registerValidation.js';

// @route   POST /signup/
// @desc    Register as adopter
// @access  Public
export const register = async(req, res) => {
    const { 
        name, 
        email, 
        password, 
        confirmPassword
    } = req.body;

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check Validation 
    if (!isValid) { return res.status(400).json( errors )};
    
        const existingUser = await Users.findOne({ email });
        if(existingUser) { return res.status(404).json({ email: "User already exists." })};
        
        try{
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await new IndProviders({
                createdAt: new Date().toISOString(),
                name, 
                email, 
                password: hashedPassword, 
                status: 'Available',
                imageUrl: '', 
                phoneNumber: '', 
                birthDate: null,
                address: {
                    province: '',
                    city: '',
                    district: '',
                    village: '',
                    additional: ''
                },
                gender: '',
                identityNumber: '', 
            }).save();
            const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
            // res.send({ result });
            return res.status(200).json({
                id: result._id,
                name: result.name,
                role: result.role,
                imageUrl: result.imageUrl,
                token
            });
        } catch ( err ) {
            console.log(err);
            return res.status(500).json({ message: 'Something went wrong' })
        }
    }

// @route   GET /indProviders/
// @desc    Get all individual providers
// @access  Public
export const getIndProviders = async (req, res) => {
    try {
        const indProviders = await IndProviders.find({});
        res.send({ indProviders })
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   GET /indProviders/:id
// @desc    Get a specific individual provider
// @access  Public
export const getIndProviderById = async (req, res) => {
    try {
        const indProviders = await IndProviders.findById(req.params.id);
        res.send({ indProviders });
    } catch (err) {
        res.status(404).send({ message: 'Individual provider not found!' });
    }
};

// @route   POST /indProvider/
// @desc    Create an individual provider
// @access  Public
export const createIndProvider = async (req, res) => {
    try {
        const newIndProvider = await IndProviders.create({ 
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            phoneNumber: req.body.phoneNumber,
            address: {
                province: req.body.address.province,
                city: req.body.address.city,
                postalCode: req.body.address.postal_code,
                street: req.body.address.street,
            },
            birthDate: new Date(),
            gender: req.body.gender,
            identityNumber: req.body.identityNumber,
        });
        res.send({ newIndProvider });
    } catch(err) {
        res.status(400).send({ error: err });
    }
};
  
// @route   PUT /indProviders/:id
// @desc    Update an individual provider
// @access  Public
export const updateIndProvider = async (req, res) => {
    try {
        const updatedIndProvider = await IndProviders.findByIdAndUpdate(req.params.id, req.body);
        res.send({ updatedIndProvider });
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

