export const validUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'password',
}

export const validUserCredentials = {
  email: 'admin@admin.com',
  password: 'password'
}

export const invalidEmailCredentials = {
  email: '@user.com',
  password: 'password'
}

export const invalidPasswordCredentials = {
  email: 'admin@admin.com',
  password: '12345'
}

export const noEmailCrendentials = {
  password: 'password'
}

export const noPasswordCrendentials = {
  email: 'admin@admin.com'
}

export const unregisteredEmailCredentials = {
  email: 'unregistered@project.com',
  password: 'password'
}

export const unregisteredPasswordCredentials = {
  email: 'admin@admin.com',
  password: 'unregistered'
}

export const adminUserData = { 
  role: 'admin', 
  id: 1, 
  username: 'Admin' 
}
