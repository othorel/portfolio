export function validatePassword(password: string): boolean {
  // Minimum 8 caractères, au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
}

export function getPasswordRequirements(): string {
  return "Mot de passe invalide : minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial (!@#$%^&*).";
}
