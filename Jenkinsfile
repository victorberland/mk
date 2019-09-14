pipeline {
  agent {
    docker {
      image 'node:10'
    }

  }
  stages {
    stage('B') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
}