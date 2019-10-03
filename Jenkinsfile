pipeline {
  agent any
  stages {
    stage('S') {
      agent any
      steps {
        sh 'docker-compose build'
        sh 'docker-compose up -d'
      }
    }
  }
}
