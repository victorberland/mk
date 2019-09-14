pipeline {
  agent any
  stages {
    stage('B') {
      agent {
        docker {
          image 'node:10'
        }

      }
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('S') {
      agent any
      steps {
        sh 'ls'
        sh 'ls ../'
        sh 'docker-compose up -d'
      }
    }
  }
}