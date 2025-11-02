export const validateFolderName = (name) => {
  if (!name.trim()) {
    return "لطفا نام پوشه را وارد کنید";
  }
  if (name.trim().length < 2) {
    return "نام پوشه باید حداقل ۲ کاراکتر باشد";
  }
  if (name.trim().length > 30) {
    return "نام پوشه نباید بیشتر از ۳۰ کاراکتر باشد";
  }
  return "";
};

export const validateTaskName = (name) => {
  if (!name.trim()) {
    return "لطفا نام تسک را وارد کنید";
  }
  if (name.trim().length < 2) {
    return "نام تسک باید حداقل ۲ کاراکتر باشد";
  }
  if (name.trim().length > 100) {
    return "نام تسک نباید بیشتر از ۱۰۰ کاراکتر باشد";
  }
  return "";
};

export const validateDescription = (description) => {
  if (description.trim() && description.trim().length > 500) {
    return "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد";
  }
  return "";
};
