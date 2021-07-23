const validation = (values) => {

    let errors={};

    const regex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
    if (!values.name){
        errors.name = "Nama harus diisi";
    } else if(!values.name.match(regex)){
        errors.name = "Hanya boleh berisi karakter alpabet"
    }
    if (!values.gender){
        errors.gender =  "Opsi harus dipilih"
    }
    if (values.breeds.length === 0){
        errors.breeds =  "Opsi harus dipilih";
    }
    if (values.colors.length === 0){
        errors.colors =  "Opsi harus dipilih";
    }
    if (values.age <= 0){
        errors.age =  "Umur harus diisi";
    }
    if (!values.specialNeeds){
        errors.specialNeeds =  "Kebutuhan khusus harus diisi"
    }
    if (!values.description){
        errors.description =  "Deskripsi harus diisi"
    }
    if (values.colors.media === 0){
        errors.media =  "Harus mengungah foto hewan peliharaan"
    }
    if (!values.source){
        errors.source =  "Opsi harus dipilih"
    }
    if (values.adoptFee < 0){
        errors.adoptFee =  "Nilai tidak boleh kurang dari nol";
    }
    if (values.size <= 0){
        errors.size =  "Nilai tidak boleh nol";
    }
    if (!values.furLength){
        errors.furLength =  "Opsi harus dipilih"
    }
    return errors;
}

export default validation;