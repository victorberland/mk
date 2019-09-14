pipeline {
  agent {
    node {
      label 'docker'
    }
  }
  tools {
    nodejs 'nodejs'
  }
  stages {
    stage ('S'){
      steps {
        parallel (
          node: { sh "npm -v" },
          docker: { sh "docker -v" }
        )
      }
    }
    stage('B') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
}
