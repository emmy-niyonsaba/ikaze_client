// utils/navigation.js
export const getRoleBasePath = (role) => {
  const basePaths = {
    'SUPER_ADMIN': '/super-admin',
    'COLLEGE_ADMIN': '/college-admin',
    'DEPARTMENT_MANAGER': '/department-manager',
    'SECURITY_MANAGER': '/security-manager',
    'SECURITY': '/security',
    'USER': '/'
  };
  return basePaths[role] || '/';
};

export const getDashboardPath = (role) => {
  return `${getRoleBasePath(role)}/dashboard`;
};