export const identityChecking = (profile) => {

  let complete = false;

  if(
    profile.name !== ""
    && profile.email !== ""
    && profile.phoneNumber !== ""
    && profile.birthDate !== ""
    && profile.identityNumber !== ""
    && profile.gender !== ""
    && profile.address.province !== ""
    && profile.address.city !== ""
    && profile.address.district !== ""
    && profile.address.village !== ""
  ){
    complete = true;
  }

  return complete;
}

export const applying = (adopter, id) => {
  console.log(adopter)
  let applied = false;
  const adopterChecking = adopter.find((applied) => applied.adopter._id === id && applied.status === 0)
  if(adopterChecking){applied = true }
  return applied;
}
