// src/utils/auth.js
export const userHasRole = (user, role) => {
    // Check if the user object has a "roles" property containing the user's roles
    // This is just a basic example, you should adjust this based on your actual user object structure
    
    if (!user || !user.role) {
      return false;
    }
  
    // Check if the user's roles include the specified role
    return user.role.includes(role);
  };
  