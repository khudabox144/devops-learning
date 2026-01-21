pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/khudabox144/devops-learning.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                cd backend/user-service && npm install
                cd ../post-service && npm install
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t user-service backend/user-service
                docker build -t post-service backend/post-service
                '''
            }
        }

        stage('Run Docker Compose') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker compose down || true'
        }
    }
}
