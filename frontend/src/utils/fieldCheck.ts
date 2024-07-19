export interface FormFieldCheck {
  valid: boolean;
  error: {
    firstName?: string;
    lastName?: string;
  };
}

export function editFormFieldCheck(firstName: string, lastName: string) {
  const fieldCheck: FormFieldCheck = {
    valid: true,
    error: {},
  };
  console.log(`"${firstName}"`);
  console.log(`"${lastName}"`);
  const regexName = new RegExp("^[A-Za-zÀ-ÿ]{2,}$");
  
  if (firstName === "") {
    console.log("[0]");
    fieldCheck.valid = false;
    fieldCheck.error.firstName = "First name is required";
  } else if (!regexName.test(firstName)) {
    console.log("[1]");
    fieldCheck.valid = false;
    fieldCheck.error.firstName = "Invalid first name";
  }
  if (lastName === "") {
    console.log("[2]");
    fieldCheck.valid = false;
    fieldCheck.error.lastName = "Last name is required";
  } else if (!regexName.test(lastName)) {
    console.log("[3]");
    fieldCheck.valid = false;
    fieldCheck.error.lastName = "Invalid last name";
  }
  console.log("check dans la fonction =>");
  console.log(fieldCheck);
  return fieldCheck;
}
