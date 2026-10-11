pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        skipDefaultCheckout(true)
    }

    environment {
    PATH = "/Users/ashwinidubey/.nvm/versions/node/v22.8.0/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    CI = "true"
}

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
    steps {
        sh '''
            export PATH="/Users/ashwinidubey/.nvm/versions/node/v22.8.0/bin:$PATH"

            echo "Checking Node.js..."
            node --version

            echo "Checking npm..."
            npm --version

            echo "Node executable:"
            which node

            echo "npm executable:"
            which npm
        '''
    }
}

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'rs-login',
                usernameVariable: 'RS_USERNAME',
                passwordVariable: 'RS_PASSWORD'
            )
        ]) {
            sh 'npx playwright test'
        }
    }
}
    }

    post {
        always {
            junit(
                testResults: 'test-results/junit.xml',
                allowEmptyResults: true
            )

            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Playwright pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console log and test reports.'
        }
    }
}