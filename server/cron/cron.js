    import  cron  from "node-cron";
    import AdoptionRequest from "../model/adoption/AdoptionRequestModel.js"
    import moment from "moment";

    export const cancelAdoption = cron.schedule('*/15 * * * * *', () => {
        findExpiredAdoption().then(console.log('checking'));
    });

    async function findExpiredAdoption() {
        AdoptionRequest.find({status: 0}).then(adoptions => {
            adoptions.forEach(async function(adoption) {
                const duration = moment(adoption.createdAt).add(2, 'd') - moment(new Date());
                console.log(duration)
                if(duration <= 0){
                    await AdoptionRequest.findByIdAndUpdate(adoption._id, {status: 4})
                }
            });
        });
    }