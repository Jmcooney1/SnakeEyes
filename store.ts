const store: { [key: string]: any } = {};

export const setItem = (key: string, value: any) => {
  if(key=='isLoggedIn' && typeof value != "boolean")
    throw new Error("isLoggedIn must be a boolean value");
  if(key=='username' && typeof value != "string")
    throw new Error("username must be a string value");
  store[key] = value;
};

export const getItem = (key: string) => {
  return store[key] ?? null;
};

export const deleteItem = (key: string) => {
  delete store[key];
};

