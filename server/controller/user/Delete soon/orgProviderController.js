import OrgProviders from '../../model/user/orgProviderModel.js';
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
    } = req.body;

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation 
    if (!isValid) { return res.status(400).json( errors )};
    
        const existingUser = await Users.findOne({ email });
        if(existingUser) { return res.status(404).json({ email: "User already exists." })};
        
        try{
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await new OrgProviders({
                createdAt: new Date().toISOString(),
                name, 
                email, 
                password: hashedPassword, 
                status: 'Available',
                imageUrl: '', 
                phoneNumber: '',
                personInCharge: '',
                address: {
                    province: '',
                    city: '',
                    district: '',
                    village: '',
                    additional: ''
                },
                veterinarian: 
                    {
                        name: '',
                        personInCharge: '',
                        address: ''
                    } 
                
            }).save();
            const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
            return res.status(200).json({
                id: result._id,
                name: result.name,
                role: result.role,
                imageUrl: result.imageUrl,
                token
              });
        } catch ( err ) {
            return res.status(500).json({ message: 'Something went wrong' })
        }
    }

// @route   GET /orgProviders/
// @desc    Get all organizational providers
// @access  Public
export const getOrgProviders = async (req, res) => {
    try {
        const orgProviders = await OrgProviders.find({});
        res.send({ orgProviders })
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

// @route   GET /orgProviders/:id
// @desc    Get a specific organizational provider
// @access  Public
export const getOrgProviderById = async (req, res) => {
    try {
        const orgProviders = await OrgProviders.findById(req.params.id);
        res.send({ orgProviders });
    } catch (err) {
        res.status(404).send({ message: 'Organizational provider not found!' });
    }
};

// @route   POST /orgProvider/
// @desc    Create an organizational provider
// @access  Public
export const createOrgProvider = async (req, res) => {
    try {
        const newOrgProvider = await OrgProviders.create({ 
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
            personInCharge: req.body.personInCharge,
        });
        res.send({ newOrgProvider });
    } catch(err) {
        res.status(400).send({ error: err });
    }
};
  
// @route   PUT /orgProviders/:id
// @desc    Update an organizational provider
// @access  Public
export const updateOrgProvider = async (req, res) => {
    try {
        const updatedOrgProvider = await OrgProviders.findByIdAndUpdate(req.params.id, req.body);
        res.send({ updatedOrgProvider });
    } catch(err) {
        res.status(400).send({ error: err });
    }
};

