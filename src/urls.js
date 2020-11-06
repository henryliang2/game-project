const SERVER_URL = (
  process.env.REACT_APP_ENVIRONMENT === 'development'
    ? 'http://localhost:8080'
    : 'https://game-project-server.herokuapp.com'
)

export { SERVER_URL }