node {
  try {
    notifyBuild()

    stage('Checkout') {
      git 'git@github.com:FoxComm/top-drawer.git'
    }

    stage('Build') {
      sh 'make build'
    }

    stage('Test'){
      sh 'make test'
    }

    System.out.println(currentBuild.toString())
  } catch (e) {
    currentBuild.result = "FAILED"
    throw e
  } finally {
    notifyBuild(currentBuild.result)
  }
}

def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

  if (buildStatus == 'STARTED') {
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    colorCode = '#00FF00'
  } else {
    colorCode = '#FF0000'
  }

  slackSend (color: colorCode, message: summary)
}