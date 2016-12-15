node {
    stage('Checkout') {
      git 'git@github.com:FoxComm/top-drawer.git'
    }
    stage('Build') {
	sh 'make build'
    }
    stage('Test'){
	sh 'make test'
    }
}