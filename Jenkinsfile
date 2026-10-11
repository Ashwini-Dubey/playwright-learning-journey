pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        skipDefaultCheckout(true)
    }

    environment {
        // Homebrew paths for a typical Apple Silicon Mac.
        // Adjust if your Mac uses Intel Homebrew.
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
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
                sh 'node --version'
                sh 'npm --version'
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
                sh 'npx playwright test'
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