node {
  try {
    notifyStarted()

    stage('Checkout') {
      git 'git@github.com:FoxComm/top-drawer.git'
    }

    stage('Build') {
      sh 'make build'
    }

    stage('Test'){
      sh 'make test'
    }

    notifySuccessful()
  } catch (e) {
    currentBuild.result = "FAILED"
    notifyFailure()
    throw e
  }
}

def notifyStarted() {
  slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
}

def notifySuccessful() {
  slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
}

def notifyFailed() {
  slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
}