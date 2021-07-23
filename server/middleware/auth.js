import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if(token && isCustomAuth ){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
            req.role = decodedData?.role;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export const indProviderAuth = async (req, res, next) => {
    try {
        if(req.role == 'IndividualProvider'){
            next();
        }

    } catch (error) {
        console.log(error);
    }
}

export const orgProviderAuth = async (req, res, next) => {
    try {
        if(req.role == 'OrganizationalProvider'){
            next();
        }

    } catch (error) {
        console.log(error);
    }
}

export const adopterAuth = async (req, res, next) => {
    try {
        if(req.role == 'Adopter') {
            console.log(req.role);
            next();
        }
            
    } catch (error) {
        console.log(error);
    }
}
