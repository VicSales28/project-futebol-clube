// Função auxiliar para obter o token sem o prefixo "Bearer"
export default function getAccessToken(tokenWithBearer: string) {
  const splitted = tokenWithBearer.split(' ');
  return splitted[1];
}
